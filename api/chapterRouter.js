const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

const chapterDB = require("../models/chapters-model.js");

router.get("/", (req, res) => {
  chapterDB
    .find()
    .then(chapters => {
      res.status(200).json(chapters);
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the chapters data" });
    });
});

router.post("/", async (req, res) => {
  try {
    const { chapter_img_url } = req.files;
    let { newChapter } = req.body;

    const awsRes = await uploadToS3(chapter_img_url, res);

    newChapter.chapter_img_url = await awsRes.Location;
    // const chapter = await chapterDB.addChapter(newChapter);
    // res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: " Error adding the chapter" });
  }
});

module.exports = router;
