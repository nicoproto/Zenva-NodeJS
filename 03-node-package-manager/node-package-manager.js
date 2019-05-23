var http = require('http');
// Require a set of tools installed called 'moment'
var moment = require('moment');

function serverCallback(req, res) {
  var opens = moment("10:00", "HH:mm");
  var closes = moment("12:00", "HH:mm");

  // FIRST PART OF THE MESSAGE
  var message = 'Hello ' + process.argv[2] + '!\n';
  message += 'Welcome to our page.\n';
  message += 'Now, it is ' + moment().format('HH:mm') + '.\n';
  message += 'Our business hours is from ' + opens.format('HH:mm') + ' to ' + closes.format('HH:mm') + '.\n';

  var opens_diff = opens.diff(moment(), 'minutes');
  var closes_diff = moment().diff(closes, 'minutes');


  if(opens_diff > 0 ) {
    message += 'Please come back in ' + opens_diff + ' minutes.';
  };

  if(closes_diff > 0 ) {
    message += 'Please come back tomorrow.';
  };

  res.writeHead(200, {'Content-Type': 'text/plain'});
  // moment().format() gives the time
  res.end(message);
};

http.createServer(serverCallback).listen(8080);
