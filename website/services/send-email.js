var nodemailer = require('nodemailer');

// application platform email
const FROM_EMAIL = 'from-email@yahoo.ca';
var transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: FROM_EMAIL,
    pass: '' // password from yahoo myWebApp
  }
});


///////////////////////////////////////////////////////////////

const TO_EMAIL = 'destination-email@gmail.com';


////////////////////////////////////////////////////////////////
function sendEmailService() {

  this.buildBody = function(body) {
    // sanitize body
    // create html body
    return JSON.stringify(body);
  }

  this.send = function(body) {

    var mailOptions = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Sending Email using Node.js'
    };

    mailOptions.text = this.buildBody(body);

    return new Promise(function(resolve , reject ) {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    })
  }
}

module.exports = new sendEmailService();