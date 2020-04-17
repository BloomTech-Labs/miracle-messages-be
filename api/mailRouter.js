const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const volunteersDb = require("../models/volunteer-model.js");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/:id", (req, res) => {
  console.log("hello", req.body);
  const { id } = req.params;
  const { email } = req.body;

  volunteersDb.findEmail(id);
  console.log("id", id);
  // .then(ids => {
  // console.log("volunteer", ids);

  sgMail
    .sendMultiple({
      to: [email],
      from: "william@miraclemessages.org",
      templateId: "d-df074a88557646bcbb042df464b7ca6c",
      subject: "Thank you for your interest in Miracle Messages",
      // substitutions: {
      //   comment: req.body.post,
      // },
      // text: "Hello",
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    })
    .then((email) => res.status(200).json(email))
    .catch((err) =>
      res.status(500).json({ message: "Could not send.", error: err })
    );
  // })
  // .catch(({ message, stack, code }) =>
  //   res
  //     .status(500)
  //     .json({ message: "Could not send email.", error: message, stack, code })
  // );
});

// const msg = {
//   to: "viola4lfe@gmail.com",
//   //TODO need to verify the from account
//   //TODO double check our api_key
//   from: "william@miraclemessages.org",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// //ES6
// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );

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
