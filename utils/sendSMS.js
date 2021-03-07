const { default: axios } = require('axios');
var http = require('axios');


async function sendSMS(phone, OTPString) {

  var config = {
    method: 'post',
    url: `${process.env.SMS_HOSTNAME}${process.env.SMS_PATH}&numbers=${phone}&message=${OTPString}`,
    headers: {}
  };

  await axios(config)

}

module.exports = { sendSMS };