// When we require in 'allData' it will pick the functions inside the export object

exports.createHtmlStringFromJson = function(html_content, retrievedData) {
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
  html_string += '</table>';
  return string_until_body + html_string + string_from_body;
};


exports.createHtmlStringFromCsv = function(html_content, retrievedData) {
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
