const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

const chapterDB = require("../models/chapters-model.js");

const aws_link =
  "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/";

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
    const newChapter = await req.body;
    newChapter.longitude = 2;
    newChapter.latitude = 4;
    const chapter = await chapterDB.addChapter(newChapter);

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Error adding the chapter" });
  }
});

// router.post ("/", async (req, res)=> {
// try {

// }

// catch {

// }

// }

// router.post("/", async (req, res) => {
//   try {
//     console.log("hi");
//     const newChapter = await req.body;
//

//     // const chapter_img_name = await req.files.chapter_img.name;

//     // newChapter.chapter_img_url = "here is a string";

//     // newChapter.chapter_img_url =
//     //   aws_link + chapter_img_name.split(" ").join("%20");

//     const chapterId = await chapterDB.addChapter(newChapter);

//     console.log(chapterId);

//     // uploadToS3(chapter_img_url, res, chapterId);

//     res.status(200).json(chapterId);

//   } catch (error) {
//     res.status(500).json({ error: " Error adding the chapter" });
//   }
// });

module.exports = router;
