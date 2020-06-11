const express = require("express");
const router = express.Router();
const chapterDB = require("../models/chapters-model.js");
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const reunionDB = require("../models/reunion-model.js");
const usersDB = require("../models/users-model");
const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo");
const adminCheck = require("../middleware/Admin");

//see pending chapters
router.get(
  "/chapters",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    try {
      let chapters = await chapterDB.findPendingChapters();
      if (chapters.length) {
        let newChapters = await chapters.map(async (e) => {
          e.requestedBy = await usersDB.findById(e.requestedBy);
          return e;
        });

        Promise.all(newChapters).then((values) => res.status(201).json(values));
      } else {
        res
          .status(201)
          .json({ Message: "There are no pending chapters at this time" });
      }
    } catch (error) {
      res.status(500).json({
        error: "there was a problem getting chapter",
        error,
      });
    }
  }
);

router.get(
  "/:chapterid/Volunteers",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    try {
      const volunteers = await chaptersVolunteersDB.findPendingChapterVolunteers(
        chapterId
      );
      if (volunteers.length < 1) {
        res.status(404).json({
          message: "There are no pending volunteers for this chapter",
        });
      } else {
        res.status(200).json(volunteers);
      }
    } catch {
      res
        .status(500)
        .json({ errorMessage: "There is a problem finding volunteers data" });
    }
  }
);

router.get(
  "/Leaders",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    try {
      const leaders = await chaptersVolunteersDB.findPendingChapterLeaders();
      if (leaders.length < 1) {
        res.status(404).json({
          message: "There are no pending chapter leaders at this time",
        });
      } else {
        res.status(200).json(leaders);
      }
    } catch {
      res
        .status(500)
        .json({ errorMessage: "There is a problem finding volunteer data" });
    }
  }
);

router.get(
  "/:chapterid/Reunions",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    try {
      const pending = await reunionDB.findPendingReunions(chapterId);
      if (pending.length < 1) {
        res.status(404).json({
          message: "There are no pending chapter leaders for this chapter",
        });
      } else {
        res.status(200).json(pending);
      }
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Error retrieving pending reunions", error });
    }
  }
);

//approve pending chapter
router.put(
  "/:chapterid/approveChapter",
  authenticationRequired,
  userInfo,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const groups = req.jwt.claims.groups;

    if (groups.includes("CEO")) {
      const chapter = await chapterDB.findBy(chapterId);
      if (chapter.approved === false) {
        chapterDB
          .approveChapter(chapterId)
          .then((chapter) => {
            res.status(201).json({ Message: "Chapter Successfully approved" });
          })
          .catch((err) => {
            res.status(500).json({
              err,
              Message:
                "Something went wrong and chapter could not be approved right now",
            });
          });
      } else {
        res.status(201).json({ Message: "Chapter was already Approved!" });
      }
    } else {
      res.status(401).json({ Error: "Only CEO can approve chapters" });
    }
  }
);

router.put(
  "/:chapterid/approveVolunteer",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.body.oktaId;

    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    if (volunteer.approved === false) {
      chaptersVolunteersDB
        .approveVolunteer(oktaId, chapterId)
        .then((volunteer) => {
          res.status(201).json({ Message: "Volunteer Successfully approved" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not be approved right now",
          });
        });
    } else {
      res.status(201).json({ Message: "Volunteer was already Approved!" });
    }
  }
);

router.delete(
  "/:chapterid/declineVolunteer",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.body.oktaId;

    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    if (volunteer.isApproved === false) {
      chaptersVolunteersDB
        .removeSpecificChapterVolunteer(oktaId, chapterId)
        .then((volunteer) => {
          res.status(201).json({ Message: "Volunteer was declined ;-;" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not be declined right now",
          });
        });
    } else {
      res.status(201).json({
        Message:
          "Volunteer is either currently a chapter member, or never applied",
      });
    }
  }
);

router.put(
  "/:chapterid/approveLeader",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.body.oktaId;

    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    if (volunteer.isAdmin === false && volunteer.requestedAdmin === true) {
      chaptersVolunteersDB
        .approveLeader(oktaId, chapterId)
        .then((volunteer) => {
          res
            .status(201)
            .json({ Message: "Volunteer is now a chapter leader" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not be approved right now",
          });
        });
    } else {
      res.status(201).json({ Message: "Volunteer is already a leader!" });
    }
  }
);

router.put(
  "/:chapterid/declineLeader",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    const chapterId = req.params.chapterid;
    const oktaId = req.body.oktaId;

    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    if (volunteer.isAdmin === false && volunteer.requestedAdmin === true) {
      chaptersVolunteersDB
        .declineLeader(oktaId, chapterId)
        .then((volunteer) => {
          res.status(201).json({ Message: "Volunteer was declined ;-;" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not be declined right now",
          });
        });
    } else {
      res.status(201).json({
        Message:
          "Volunteer is either currently a chapter leader, or didn't request to become a leader",
      });
    }
  }
);

module.exports = router;
