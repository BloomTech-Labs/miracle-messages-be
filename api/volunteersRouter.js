const express = require("express");
const router = express.Router();
const volunteersDb = require("../models/volunteer-model");
const authenticated = require("../auth/restricted-middleware");

/****************************************************************************/
/*                 Get all volunteers 
/****************************************************************************/
router.get("/", authenticated, async (req, res) => {
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

/****************************************************************************/
/*                 Delete Volunteer - Deprioritized LABS18
/****************************************************************************/
router.delete('/:id', authenticated, (req, res) => {

})
/****************************************************************************/
/*                 Update Volunteer - Deprioritized LABS18
/****************************************************************************/
router.put('/', authenticated, (req, res) => {
  const volunteedId = req.user_id;
  const updatedVolunteer = req.body;
  try {
    const volunteer = await volunteersDb.updateVolunteer(volunteedId, updatedVolunteer);
    if(volunteer){
      res.status(200).json(volunteer);
    } else {
      res.status(404).json({ message: "The volunteer could not be found" });
    }
  } catch(err){
    res.status(500).json({messgae: 'Error updating the volunteer'})
  }
});

module.exports = router;
