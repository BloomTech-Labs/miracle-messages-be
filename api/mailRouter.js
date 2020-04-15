const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const axios = require("axios");

router.get("/", (req, res) => {
const msg = {
 to: "viola4lfe@gmail.com",
    from: "dan@miraclemessages.org",
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
 });

module.exports = router;
 