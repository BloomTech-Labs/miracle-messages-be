const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const chapterDB = require("../models/chapters-model.js");
const reunionDB = require("../models/reunion-model");
const userDB = require("../models/users-model");
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";
const axios = require("axios");

const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo");
const adminCheck = require("../middleware/Admin");

const sendEmail = require("../utils/sendEmail");

// Return: all chapters
router.get("/", async (req, res) => {
  try {
    let chapters = await chapterDB.findChapters(req.query);
    let newChapters = chapters.map(async (e) => {
      e.volunteers = await chaptersVolunteersDB.findChapterVolunteers(e.id);
      e.leaders = await chaptersVolunteersDB.findLeaders(e.id);
      memberCount = await chaptersVolunteersDB.memberCount(e.id);
      reunionCount = await reunionDB.reunionCount(e.id);
      e.memberCount = parseInt(memberCount.count);
      e.reunionCount = parseInt(reunionCount.count);

      return e;
    });

    Promise.all(newChapters).then((values) => res.status(200).json(values));
  } catch {
    res.status(500).json({
      error: "there was a problem getting chapter",
    });
  }
});

//Return: a specific chapter by id
router.get("/:chapterid", async (req, res) => {
  const chapterId = req.params.chapterid;
  try {
    const chapter = await chapterDB.findBy(chapterId);
    chapter.volunteers = await chaptersVolunteersDB.findChapterVolunteers(
      chapter.id
    );
    chapter.leaders = await chaptersVolunteersDB.findLeaders(chapter.id);
    memberCount = await chaptersVolunteersDB.memberCount(chapter.id);
    reunionCount = await reunionDB.reunionCount(chapter.id);
    chapter.memberCount = parseInt(memberCount.count);
    chapter.reunionCount = parseInt(reunionCount.count);

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Error getting the chapter" });
  }
});

//Post: create new chapter
router.post("/", authenticationRequired, userInfo, async (req, res) => {
  const newChapter = req.body;
  newChapter.requestedBy = req.userInfo.sub;
  // let locationData;

  // Gets the coordinates based of of city and state
  const chapterCoordinates = await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${newChapter.city},${newChapter.state}.json?access_token=${process.env.MAPBOX_API}`
    )
    .then((res) => {
      return res.data.features[0].geometry.coordinates;
    })
    .catch((err) => {
      console.log("could not get lat & lng from mapbox", err);
    });

  newChapter.latitude = chapterCoordinates[1];
  newChapter.longitude = chapterCoordinates[0];

  try {
    if (req.files && req.files.chapter_img) {
      const { chapter_img } = await req.files;

      try {
        uploadToS3(chapter_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }

      // storing the reunion image url in the newChapter object:
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      newChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }

    // Adds Chapter to the Database
    chapterDB
      .addChapter(newChapter)
      .then(async (chapter) => {
        const info = {};
        info.requester = await userDB.findById(req.userInfo.sub);

        info.chapter = newChapter;
        console.log(info.chapter);
        sendEmail("NEW_CHAPTER", "r.campbell.mcintyre@gmail.com", info);
        res.status(201).json(chapter);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "failed to add new chapter", err });
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong, Please try again", error });
  }
});

//Post: register a user to a chapter to await approval
router.post(
  "/:chapterId/register",
  authenticationRequired,
  userInfo,
  async (req, res) => {
    let chapterId = req.params.chapterId;
    let oktaId = req.userInfo.sub;
    try {
      const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
        oktaId,
        chapterId
      );
      //Checks if this volunteer is already in the chapter
      if (!isVolunteerInChapter) {
        const signedUp = await chaptersVolunteersDB.assignChapterVolunteer(
          oktaId,
          chapterId
        );
        const user = await userDB.findById(oktaId);
        const chapter = await chapterDB.findBy(chapterId);
        const leaders = await chaptersVolunteersDB.findLeaders(chapterId);
        const info = {};
        info.user = user;
        info.chapter = chapter;

        leaders.map((e) => {
          info.leader = e;
          sendEmail("NEW_MEMBER", e.email, info);
        });

        res.status(201).json({
          message: `You have successfully signed up for this chapter.`,
          id: signedUp,
        });
      } else {
        res
          .status(400)
          .json({ message: "This volunteer is already in this chapter" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorMessage: "error assigning volunteer to the chapter",
        error,
      });
    }
  }
);

//Put: Request to become leader of chapter
router.put(
  "/:id/requestLeader",
  authenticationRequired,
  userInfo,
  async (req, res) => {
    const chapterId = req.params.id;
    const oktaId = req.userInfo.sub;

    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    const leaders = await chaptersVolunteersDB.findLeaders(chapterId);
    console.log(volunteer);
    if (leaders.length === 0 && !volunteer) {
      chaptersVolunteersDB
        .assignChapterVolunteer(oktaId, chapterId)
        .then((vol) => {
          console.log("hello ");
          chaptersVolunteersDB
            .requestLeader(oktaId, chapterId)
            .then(async (volunteer) => {
              const user = await userDB.findById(oktaId);
              const chapter = await chapterDB.findBy(chapterId);
              const leaders = { name: "Ronald McIntyre" };
              const info = {};
              info.user = user;
              info.chapter = chapter;
              info.leader = leaders;
              sendEmail("NEW_LEADER", "r.campbell.mcintyre@gmail.com", info);
              res.status(201).json({
                Message: "Volunteer Successfully Requested to become leader",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                err,
                Message:
                  "Something went wrong and volunteer could not make the request right now",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not make the request right now",
          });
        });
    } else if (volunteer.isAdmin === false && volunteer.approved === true) {
      chaptersVolunteersDB
        .requestLeader(oktaId, chapterId)
        .then(async (volunteer) => {
          const user = await userDB.findById(oktaId);
          const chapter = await chapterDB.findBy(chapterId);
          const leaders = await chaptersVolunteersDB.findLeaders(chapterId);
          const info = {};
          info.user = user;
          info.chapter = chapter;
          leaders.map((e) => {
            info.leader = e;
            sendEmail("NEW_LEADER", e.email, info);
          });

          res.status(201).json({
            Message: "Volunteer Successfully Requested to become leader",
          });
        })
        .catch((err) => {
          res.status(500).json({
            err,
            Message:
              "Something went wrong and volunteer could not make the request right now",
          });
        });
    } else {
      res.status(201).json({
        Message:
          "Volunteer is either already an admin, or is not approved for this chapter",
      });
    }
  }
);

//Update: chapter info
router.put(
  "/:chapterId",
  authenticationRequired,
  userInfo,
  adminCheck,
  async (req, res) => {
    try {
      const updatedChapter = req.body;
      const current = await chapterDB.findBy(req.params.chapterId);
      if (updatedChapter.city && updatedChapter.state) {
        const chapterCoordinates = await axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${updatedChapter.city},${updatedChapter.state}.json?access_token=${process.env.MAPBOX_API}`
          )
          .then((res) => {
            return res.data.features[0].geometry.coordinates;
          })
          .catch((err) => {
            console.log("could not get lat & lng from mapbox", err);
            res
              .status(500)
              .json({ Error: "could not get lat & lng from mapbox", err });
          });

        updatedChapter.latitude = chapterCoordinates[1];
        updatedChapter.longitude = chapterCoordinates[0];
      }

      if (req.files && req.files.chapter_img) {
        const { chapter_img } = await req.files;
        try {
          uploadToS3(chapter_img, res);
        } catch (error) {
          res.status(500).json({ error: "error uploading the image to AWS" });
        }
        // storing the chapter image url i database
        const chapterImgName = await req.files.chapter_img.name;
        const encodedChapterImgName = encodeURI(chapterImgName);
        updatedChapter.chapter_img_url = aws_link + encodedChapterImgName;
      }

      if (
        updatedChapter.longitude ||
        updatedChapter.title ||
        updatedChapter.chapter_img ||
        updatedChapter.description ||
        updatedChapter.facebook ||
        updatedChapter.email
      ) {
        const chapter = await chapterDB.updateChapter(
          req.params.chapterId,
          updatedChapter,
          current
        );
        res.status(200).json(chapter);
      } else {
        res.status(401).json({ Error: "Please Submit something to change" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        Message: "Error updating the chapter",
        error,
      });
    }
  }
);

//Delete: chapter from db
router.delete(
  "/:chapterId",
  authenticationRequired,
  userInfo,
  adminCheck,
  (req, res) => {
    const chapterId = req.params.chapterId;
    chapterDB
      .removeChapter(chapterId)
      .then((chapter) => {
        res.status(200).json({ Message: "Chapter successfully deleted." });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ Error: "There was an error deleting this chapter" });
      });
  }
);

module.exports = router;
