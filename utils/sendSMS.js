var http = require('http');


async function sendSMS(phone, OTPString) {

    var options = {
        'method': 'POST',
        'hostname': process.env.SMS_HOSTNAME,
        'path': `${process.env.SMS_PATH}&numbers=${phone}&message=Your haritham one time password is : ${OTPString}`,
        'headers': {
        },
        'maxRedirects': 20
      };

    var req = http.request(options, function (res) {});
    
    req.end();
}

module.exports = {sendSMS};