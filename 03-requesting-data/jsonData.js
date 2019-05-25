var http = require('http');
var request = require('request');

var request_body = undefined;
var html_content = undefined;

// Reading the file with fs
var fs = require('fs');
fs.readFile('index.html', 'utf8', function(err, contents) {
  if (err) {
    throw err;
  }
  html_content = contents;
});


function createHtmlStringFromJson(retrievedData) {
  var body_begin_index = html_content.indexOf('<body>');
  var body_end_index = html_content.indexOf('</body>');

  var string_until_body = html_content.slice(0, body_begin_index + 6);
  var string_from_body = html_content.slice(body_end_index);

  var html_string = '<table>\n';

  html_string += '<tr>\n';
  // Iterates through each attribute
  for (var attribute in retrievedData[0]) {
    // Checks if the attribute it's not another json object
    if (typeof retrievedData[0][attribute] !== 'object') {
      html_string += '<td>' + attribute + '</td>\n';
    };
  };

  html_string += '</tr>\n';

  // Add the values from each values
  retrievedData.forEach(function(object) {
    html_string += '<tr>\n';
    for (var attribute in object) {
      // Checks if the attribute it's not another json object
      if (typeof object[attribute] !== 'object') {
        html_string += '<td>' + object[attribute] + '</td>\n';
      };
    };
    html_string += '</tr>\n';
  });

  return string_until_body + html_string + string_from_body;
};

request('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, request_res, body) {
  request_body = body;
});

http.createServer(function (req, res) {
  if (request_body && html_content) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(createHtmlStringFromJson(JSON.parse(request_body)));
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Nothing retrieved yet');
  }
}).listen(8080);
