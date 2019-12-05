const express = require("express");
const router = express.Router();
// const uploadToS3 = require("../middleware/uploadToS3.js");
// const MW = require("../middleware/partnersMW");
const volunteersDb = require("../models/volunteer-model");
const chaptersVolunteersDb = require("../models/chapters-volunteers-model");

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
/*                 Get all volunteers of one specific chapter                 */
/****************************************************************************/
router.get("/:id", async (req, res) => {
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

/****************************************************************************/
/*      Delete a volunteer from a specific chapter
/****************************************************************************/
router.delete("/:id/volunteers/:volunteerid", async (req, res) => {
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
});

module.exports = router;
