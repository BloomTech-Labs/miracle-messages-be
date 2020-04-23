const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();
const volunteersDb = require("../models/volunteer-model.js");

// const authenticated = require("../auth/restricted-middleware");

/****************************************************************************/
/*                 Get all volunteers 
/****************************************************************************/
router.get("/", async (req, res) => {
  try {
    const volunteers = await volunteersDb.find();
    res.status(200).json(volunteers);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding partners data" });
  }
});

/****************************************************************************/
/*         Add Volunteer and send Email
/****************************************************************************/

router.post("/", (req, res) => {
  const volunteer = req.body;
  const { email } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  volunteersDb
    .add(volunteer)
    .then((savedVolunteer) => {
      sgMail
        .sendMultiple({
          to: [email],
          //TODO remove my email
          from: "william@miraclemessages.org",
          //TODO Miracle Messages basic template test mock-up
          // templateId: "d-b41d19e43b5c471db65c9b8282d90b36",
          //TODO review for sending dynamic templates
          // substitutions: {
          //   comment: req.body.post,
          // },

          // html: `<strong> ${req.body.post}</strong>`,
        })
        .then((email) => res.status(200).json(email))
        .catch((err) =>
          res.status(500).json({ message: "Could not send.", error: err })
        );
    })
    .catch(({ message, stack, code }) =>
      res
        .status(500)
        .json({ message: "Could not send email.", error: message, stack, code })
    );
});

/****************************************************************************/
/*                 Delete Volunteer - Verified endpoint
/****************************************************************************/
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  volunteersDb
    .deleteVolunteer(id)
    .then((volunteer) => {
      res.status(200).json(volunteer);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: "Could not delete volunteer" });
    });
});
/****************************************************************************/
/*                 Update Volunteer - De-prioritized LABS18
/****************************************************************************/
router.put("/", async (req, res) => {
  const volunteerId = req.body.user_id;
  const updatedVolunteer = req.body;
  try {
    const volunteer = await volunteersDb.updateVolunteer(
      volunteerId,
      updatedVolunteer
    );
    if (volunteer) {
      res.status(200).json(volunteer);
    } else {
      res.status(404).json({ message: "The volunteer could not be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating the volunteer" });
  }
});

module.exports = router;
