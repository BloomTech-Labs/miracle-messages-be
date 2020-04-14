const express = require("express");
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
/*         Insert Volunteer is in authRouter.js (Registering Volunteer)
/****************************************************************************/

router.post("/", (req, res) => {
  const volunteer = req.body;
   volunteersDb
    .add(volunteer)
    .then((res) => {
      res.status(201).json(volunteer);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: "Could not add volunteer" });
    });
});

/****************************************************************************/
/*                 Delete Volunteer - Deprioritized LABS18
/****************************************************************************/
router.delete("/:id", (req, res) => {});
/****************************************************************************/
/*                 Update Volunteer - Deprioritized LABS18
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
