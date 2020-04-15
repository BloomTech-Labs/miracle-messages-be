const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {

 const msg = {
   to: "viola4lfe@gmail.com",
   from: "dan@miraclemessages.org",
   subject: "Sending with Twilio SendGrid is Fun",
   text: "and easy to do anywhere, even with Node.js",
   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
 };
 sgMail.send(msg);

 res.status(201).json({message: "mail sent"})
})
