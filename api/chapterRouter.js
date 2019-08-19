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

    //uploading and storing chapter image to aws:
    const { chapter_img } = await req.files;
    uploadToS3(chapter_img, res);

    //uploading and storing the reunion image to aws:
    const { reunion_img } = await req.files;
    uploadToS3(reunion_img, res);

    // storing the chapter image url i database
    const chapterImgName = await req.files.chapter_img.name;
    const encodedChapterImgName = encodeURI(chapterImgName);
    newChapter.chapter_img_url = aws_link + encodedChapterImgName;

    // storing the chapter image url in the newChapter object
    const reunionImgName = await req.files.reunion_img.name;
    const encodedReunionImgName = encodeURI(reunionImgName);
    newChapter.reunion_img_url = aws_link + encodedReunionImgName;

    const chapter = await chapterDB.addChapter(newChapter);

    console.log(newChapter);

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, Please try again" });
  }
});

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
