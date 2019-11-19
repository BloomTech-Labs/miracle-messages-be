const express = require("express");
const router = express.Router();

const formDB = require("../models/form-model.js");
const volunteerDB = require("../models/volunteer-model.js");

//path: api/form
//**************************************************
//NOTE: THESE ARE THE ENDPOINTS FOR THE VOLUNTEER SIGN UP FORM
//IT IS AN  INCOMPLETE PART OF THE PROJECT THAT WAS DEPRIORITIZED
// FUNCTIONALITY NEEDS TO BE VERIFIED
//**************************************************
////////Fetching all volunteers//////"co"
// router.get("/", (req, res) => {
//   volunteerDB
//     .find()
//     .then(volunteers => {
//       res.status(200).json(volunteers);
//     })
//     .catch(error => {
//       // console.log(error);
//       res.status(500).json({ error: "Error retrieving the volunteers data" });
//     });
// });

router.get("/", async (req, res) => {
  try {
    const volunteers = await volunteerDB.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the volunteers" });
  }
});

///////////Fetching a volunteer by custom search/////////////
router.get("/findby/", (req, res) => {
  const searchParam = req.query;

  formDB
    .findBy(searchParam)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the volunteer data" });
    });
});

////////// addding a new volunteer  /////////////

router.post("/", validateBody, validateEmail, validatePhone, (req, res) => {
  const { newVolunteer, newInterests } = req.body;

  formDB
    .addVolunteer(newVolunteer)
    .then(volunteerId => {
      return volunteerId[0];
    })
    .then(id => {
      newInterests.volunteersid = id;

      formDB.addInterests(newInterests);
      res.sendStatus(201);
    })
    .catch(error => {
      res.status(500).json({ error: " Error adding the volunteer" });
    });
});

// middleware to validate form inputs
async function validateBody(req, res, next) {
  const { newVolunteer } = await req.body;
  if (
    newVolunteer.fname &&
    newVolunteer.lname &&
    newVolunteer.email &&
    newVolunteer.city &&
    newVolunteer.state &&
    newVolunteer.country
  ) {
    next();
  } else {
    res.status(400).json({
      message: "Incomplete form. Please provide inputs for all required fields"
    });
  }
}

async function validatePhone(req, res, next) {
  const { newVolunteer } = await req.body;
  if (newVolunteer.phone && Number.isInteger(newVolunteer.phone)) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please provide phone number in the right format" });
  }
}

async function validateEmail(req, res, next) {
  const { email } = await req.body.newVolunteer;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    next();
  } else {
    res.status(400).json({ message: "invalid email format" });
  }
}

///////// deleting volunteer by id ///////////////

router.delete("/:id", async (req, res) => {
  try {
    const count = await formDB.deleteInterests(req.params.id);
    const count2 = await formDB.deleteVolunteer(req.params.id);

    if (count2 > 0 && count > 0) {
      res.status(200).json({ message: "The volunteer has been removed" });
    } else {
      res.status(404).json({ message: "The volunteer could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing the hub"
    });
  }
});

///////// updating a volunteer //////////////////

router.put("/:id", async (req, res) => {
  try {
    const interests = await formDB.updateInterest(
      req.params.id,
      req.body.interests
    );

    const volunteer = await formDB.updateVolunteer(
      req.params.id,
      req.body.volunteer
    );
    if (volunteer && interests) {
      res.status(200).json(volunteer);
    } else {
      res.status(404).json({ message: "The volunteer could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the volunteer"
    });
  }
});

module.exports = router;
