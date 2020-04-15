const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const axios = require("axios");

router.get("/", async (req, res) => {
 const msg = {
  to: "viola4lfe@gmail.com",
  from: "dan@miraclemessages.org",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
 };

 axios.get("https://api.sendgrid.com/v3/resource", {headers: {"Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`, "Content-Type": "application/json"}})
 .then(response => {
  res.status(201).json({message: response})
 })
 .catch(error => {
  res.status(500).json(error)
 });

 // try {
 //  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 //    await sgMail.send(msg);
 //    res.status(201).json({ message: "mail sent" });
 //  } catch ({message, stack, code, }) {
 //    res.status(500).json(message, stack, code);
 //  }
});

module.exports = router;
