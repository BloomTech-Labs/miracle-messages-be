const express = require("express");
const router = express.Router();
// const uploadToS3 = require("../middleware/uploadToS3.js");
// const MW = require("../middleware/partnersMW");
const volunteersDb = require("../models/volunteer-model");
const chaptersVolunteersDb = require("../models/chapters-volunteers-model");
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
/*                 Get all volunteers of one specific chapter                 */
/****************************************************************************/
router.get("/:id", authenticated, async (req, res) => {
  const chapterId = req.params.id;
  try {
    const volunteers = await volunteersDb.findById(chapterId);
    res.status(200).json(volunteers);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding volunteers data" });
  }
});

//**********************************************************************
//********* SIGNING UP AS A VOLUNTEER TO A CHAPTER   *************/
//**********************************************************************

router.post("/:id/volunteers", authenticated, async (req, res) => {
  try {
    console.log("in the router");
    console.log(req.user_id);
    console.log(req.params.id);

    const id = await chaptersVolunteersDb.assignChapterVolunteer(
      req.user_id,
      req.params.id
    );

    res.status(200).json(id);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error assigning zee dang partner to the chapter" });
  }
});

/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Admin
/****************************************************************************/
router.delete(
  "/:id/volunteers/:volunteerid",
  authenticated,
  async (req, res) => {
    try {
      const count = await chaptersVolunteersDb.removeSpecificChapterVolunteer(
        req.params.volunteerid,
        req.params.id //chapterId
      );

      res.status(200).json(count);
    } catch (error) {
      res
        .status(500)
        .json({ error: "error unassigning zee dang partner from the chapter" });
    }
  }
);

/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Volunteer
/****************************************************************************/
router.delete("/:id/volunteers/", authenticated, async (req, res) => {
  try {
    const count = await chaptersVolunteersDb.removeSpecificChapterVolunteer(
      req.user_id,
      req.params.id //chapterId
    );

    res.status(200).json(count);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error unassigning zee dang volunteer from the chapter" });
  }
});

module.exports = router;
