const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

const chapterDB = require("../models/chapters-model.js");
const chaptersPartnersDb = require("../models/chapters-partners-model.js");

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
    const chapter = await chapterDB.findBy(req.params.id);

    res.status(200).json(chapter);
  } catch (error) {
    // log error to server
    // console.log(error);
    res.status(500).json({
      message: "Error getting the chapter"
    });
  }
});

router.delete("/:id", async (req, res) => {
  const chapterId = req.params.id;
  let numPartners = 0;

  //Need to validate that chapter id exists.//////////////////////////

  // First, we delete all chapter-partner relationships from chapters_partners
  try {
    numPartners = await chaptersPartnersDb.removeChapterPartner(chapterId);
  } catch {
    res.status(500).json({
      "error message":
        "There is a problem removing all chapter-partner relationships for this chapter"
    });
  }

  //Next, Delete the chapter from chatpers table:
  try {
    const numChapters = await chapterDB.removeChapter(chapterId);
    res.status(200).json({
      partners: `${numChapters} chapter deleted`,
      chapters: `this chapter was removed from ${numPartners} partners`
    });
  } catch {
    res.status(500).json({
      "error message": "There is a problem removing this partner"
    });
  }
});

// add a chapter to the database
router.post("/", async (req, res) => {
  try {
    const newChapter = await req.body;

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      const { chapter_img } = await req.files;
      const boo = await uploadToS3(chapter_img, res);

      console.log(await boo);
      console.log("hi");

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
