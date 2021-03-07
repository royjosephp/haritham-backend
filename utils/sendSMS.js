var http = require('http');
var axios = require('axios');


async function sendSMS(phone, OTPString) {

  var options = {
    'method': 'POST',
    'hostname': process.env.SMS_HOSTNAME,
    'path': `${process.env.SMS_PATH}&numbers=${phone}&message=Your%20haritham%20one%20time%20password%20is%20%3A%20${OTPString}`,
    'headers': {
    },
    'maxRedirects': 20
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });

  });

  req.end();
}

module.exports = { sendSMS };