const express = require("express");
const router = express.Router();
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo");
const adminCheck = require("../middleware/Admin");

// Returns: all volunteers related to a specific chapter
router.get("/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  try {
    const volunteers = await chaptersVolunteersDB.findChapterVolunteers(
      chapterId
    );
    const leaders = await chaptersVolunteersDB.findLeaders(chapterId);
    // if (volunteers.length < 1 && leaders.length < 1) { res.status(200).json({ "Message": "There is no volunteers in this chapter" });}
    // else {
    res.status(200).json({ volunteers, leaders });
    // }
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding volunteers data" });
  }
});

// Return: specific volunteer with matching okta id
router.get("/:chapterid/specific", async (req, res) => {
  let chapterId = req.params.chapterid;
  let oktaId = req.body.oktaid;
  try {
    const isVolunteerInChapter = await chaptersVolunteersDB
      .getSpecificChapterVolunteer(oktaId, chapterId)
      .catch((err) => console.log(err));
    res.status(200).json(isVolunteerInChapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter",
    });
  }
});

// Delete: volunteer submitted from chapter
//issue with admin check?
router.delete(
  "/:chapterid",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.body.oktaid;
    console.log(oktaId, chapterId);
    try {
      const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
        oktaId,
        chapterId
      );

      res
        .status(200)
        .json({ Message: `${count} volunteer successfully deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "error removing volunteer", error });
    }
  }
);

// Delete: lets user leave chapter they're a part of
router.delete(
  "/:chapterid/leave",
  authenticationRequired,
  userInfo,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.userInfo.sub;
    try {
      const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
        oktaId,
        chapterId
      );
      if (isVolunteerInChapter) {
        const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
          oktaId,
          chapterId
        );
        res
          .status(200)
          .json({ Message: "You have successfully left this chapter" });
      } else {
        res.status(500).json({ Error: "User wasn't found in chapter" });
      }
    } catch (error) {
      res.status(500).json({ Error: "error removing volunteer", error });
    }
  }
);

module.exports = router;
