const express = require("express");
const router = express.Router();

const Volunteer = require("../models/volunteer-model.js");

// To find the req.body of id and email to make sure that the email exists in the database
router.get("/getvolunteer", (req, res) => {
  const email = req.body;

  Volunteer.findEmail(email)
    .then(mail => {
      res.status(200).json(mail);
    })
    .catch(error => {
      console.log("Catch", error);
      res.status(500).json({ error: "You are getting back the catch" });
    });
});

// To replace volunteers old password with new one
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  Volunteer.updateVolunteer(id, body)
    .then(mail => {
      res.status(200).json(mail);
    })
    .catch(error => {
      res.status(500).json({ message: "Internal Server Error", error });
    });
});

module.exports = router;
