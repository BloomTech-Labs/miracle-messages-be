const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");


router.post("/", async (req, res) => {
 const msg = {
  to: "viola4lfe@gmail.com",
  from: "dan@miraclemessages.org",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
 };
 try {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(msg);
    res.status(201).json({ message: "mail sent" });
  } catch ({message, stack, code, }) {
    res.status(500).json(message, stack, code);
  }
});

module.exports = router;
