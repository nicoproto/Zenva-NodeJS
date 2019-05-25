var http = require('http');
var request = require('request');
var csv = require('csv');
var fs = require('fs');

var request_body = undefined;
var html_content = undefined;

// Reading the file with fs

fs.readFile('index.html', 'utf8', function(err, contents) {
  if (err) {
    throw err;
  }
  html_content = contents;
});


function createHtmlStringFromCsv(retrievedData) {
  var body_begin_index = html_content.indexOf('<body>');
  var body_end_index = html_content.indexOf('</body>');

  var string_until_body = html_content.slice(0, body_begin_index + 6);
  var string_from_body = html_content.slice(body_end_index);

  var html_string = '<table>\n';
  html_string += '<tr>\n';
  // Iterates through each attribute
  retrievedData[0].forEach(function (attribute) {
    html_string += '<td>' + attribute + '</td>\n';
  });
  html_string += '</tr>\n';

  data = retrievedData.slice(1);

  // Add the values from each values
  data.forEach(function(row) {
    html_string += '<tr>\n';
    row.forEach(function (cell) {
      html_string += '<td>' + cell + '</td>\n';
    });
    html_string += '</tr>\n';
  });

  html_string += '</table>\n';
  return string_until_body + html_string + string_from_body;
};

request('https://www.data.brisbane.qld.gov.au/data/dataset/1e11bcdd-fab1-4ec5-b671-396fd1e6dd70/resource/3c972b8e-9340-4b6d-8c7b-2ed988aa3343/download/Brisbane-public-art-collection-Jul-2016-Rev-1.2.csv', function(err, request_res, body) {
  csv.parse(body, function(err, data) {
    request_body = data;
  });
});


http.createServer(function (req, res) {
  if (request_body && html_content) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(createHtmlStringFromCsv(request_body));
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Nothing retrieved yet');
  }
}).listen(8080);
