/**
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./public'));

app.post('/contactus', function(Request, Response) {

  const sendEmail = require('./services/send-email');

  //Response.status(200).json(sendEmail.buildBody(Request.body));

  /***/
  sendEmail.send(Request.body)
    .then(function(info) {
      Response.status(200).json({
        status: "success",
        message: JSON.stringify(info)
      })
    })
    .catch(function(error) {
      Response.status(400).json({
        status: "error",
        message: JSON.stringify(error)
      })
    });

});


/**
 */
const config = { port: 8080, hostname: 'localhost' };
app.listen(config.port, config.hostname, function() {
  console.log(`agency server running in ${config.hostname}:${config.port}`);
})