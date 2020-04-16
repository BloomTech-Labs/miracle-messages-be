const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const volunteersDb = require("../models/volunteer-model.js");

sgMail.setApiKey(
  "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"
  // "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"
);
const axios = require("axios");

router.post("/", (req, res) => {
  const msg = {
    to: "viola4lfe@gmail.com",
    //TODO need to verify the from account
    //TODO double check our api_key
    from: "william@miraclemessages.org",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  //ES6
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
});

module.exports = router;

// router.post("/", (req, res) => {
//   console.log("hello", req.body);

//   Users.findByIdEmail(req.body.id)
//     .then((item) => {
//       console.log("this", item);
//       sgMail
//         .sendMultiple({
//           to: [item.email],
//           from: "alpacavideojournal@gmail.com",
//           templateId: "f7245d4e-10d2-447c-b134-3913228ecf4a",
//           subject: "Someone commented on your video",
//           substitutions: {
//             comment: req.body.post,
//           },

//           // html: `<strong> ${req.body.post}</strong>`,
//         })
//         .then((email) => res.status(200).json("hi"))
//         .catch((err) =>
//           res.status(500).json({ message: "Could not send.", error: err })
//         );
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "Could not send.", error: err })
//     );
// });
