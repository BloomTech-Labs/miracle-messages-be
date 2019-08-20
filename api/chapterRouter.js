const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

const chapterDB = require("../models/chapters-model.js");

const aws_link =
  "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/";

router.get("/", (req, res) => {
  chapterDB
    .findChapters()
    .then(chapters => {
      res.status(200).json(chapters);
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the chapters data" });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const classe = await chapterDB.findBy(req.params.id);

    res.status(200).json(classe);
  } catch (error) {
    // log error to server
    // console.log(error);
    res.status(500).json({
      message: "Error getting the chapter"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const chapter = await chapterDB.removeChapter(req.params.id);

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the chapter"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newChapter = await req.body;

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      const { chapter_img } = await req.files;
      uploadToS3(chapter_img, res);

      // storing the chapter image url i database
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      newChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }

    if (req.files && req.files.reunion_img) {
      //uploading and storing the reunion image to aws:
      const { reunion_img } = await req.files;
      uploadToS3(reunion_img, res);

      // storing the reunion image url in the newChapter object:
      const reunionImgName = await req.files.reunion_img.name;
      const encodedReunionImgName = encodeURI(reunionImgName);
      newChapter.reunion_img_url = aws_link + encodedReunionImgName;
    }

    //adding the newChapter object to the database
    const chapter = await chapterDB.addChapter(newChapter);

    console.log(newChapter);

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, Please try again" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedChapter = await req.body;

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      const { chapter_img } = await req.files;
      uploadToS3(chapter_img, res);

      // storing the chapter image url i database
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      updatedChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }

    if (req.files && req.files.reunion_img) {
      //uploading and storing the reunion image to aws:
      const { reunion_img } = await req.files;
      uploadToS3(reunion_img, res);

      // storing the reunion image url in the newChapter object:
      const reunionImgName = await req.files.reunion_img.name;
      const encodedReunionImgName = encodeURI(reunionImgName);
      updatedChapter.reunion_img_url = aws_link + encodedReunionImgName;
    }

    const chapter = await chapterDB.updateChapter(
      req.params.id,
      updatedChapter
    );

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the chapter"
    });
  }
});

module.exports = router;
