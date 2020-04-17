const express = require("express");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);


 router.post("/", (req, res) => {
  console.log("hello", req.body);

  Users.findByIdEmail(req.body.id)
    .then((item) => {
      console.log("this", item);
      sgMail
        .sendMultiple({
          to: [item.email],
          from: "alpacavideojournal@gmail.com",
          templateId: "f7245d4e-10d2-447c-b134-3913228ecf4a",
          subject: "Someone commented on your video",
          substitutions: {
            comment: req.body.post,
          },

          // html: `<strong> ${req.body.post}</strong>`,
        })
        .then((email) => res.status(200).json("hi"))
        .catch((err) =>
          res.status(500).json({ message: "Could not send.", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Could not send.", error: err })
    );
});