const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

const chapterDB = require("../models/chapters-model.js");
const partnerDB = require("../models/partners-model")
const chaptersPartnersDb = require("../models/chapters-partners-model.js");

const aws_link =
  "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/";

// router.get("/", (req, res) => {
//   chapterDB
//     .findChapters()
//     .then(chapters => {
//       res.status(200).json(chapters);
//     })
//     .catch(error => {
//       res.status(500).json({ error: "Error retrieving the chapters data" });
//     });
// });

/****************************************************************************/
/*               Find all chapters with all related partners                */
/****************************************************************************/
router.get('/', async (req,res) => {

  try {
    let chapters = await chapterDB.findChapters();
      
    const promises = chapters.map( async (chapter) => {
      let partners = await partnerDB.findById(chapter.id);
      chapter.partners = partners;
      return(chapter);
    });

    chapters = await Promise.all(promises)
    res.status(200).json(chapters);
  }
  catch {
    res.status(500).json({error: "there was a problem getting chapter or partner information"})
  }
})

/****************************************************************************/
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

//**** THIS IS FOR DELETING A CHAPTER TO THE DATABASE */
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

// **** THIS IS FOR ADDING A CHAPTER TO THE DATABASE
router.post("/", async (req, res) => {
  try {
    const newChapter = await req.body;

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      const { chapter_img } = await req.files;

      try {
        uploadToS3(chapter_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }

      // storing the chapter image url i database
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      newChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }

    if (req.files && req.files.reunion_img) {
      //uploading and storing the reunion image to aws:
      const { reunion_img } = await req.files;

      try {
        uploadToS3(reunion_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }

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

//***** THIS IS FOR UPDATING THE INFO FOR A CHAPTER  */
router.put("/:id", async (req, res) => {
  try {
    const updatedChapter = await req.body;

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
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

    if (req.files && req.files.reunion_img) {
      //uploading and storing the reunion image to aws:
      const { reunion_img } = await req.files;
      try {
        uploadToS3(reunion_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }

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

//****** THIS POSTING A PARTNER TO A CHAPTER DOESNT WORK NEED TO DEBUG WHY */
router.post("/:id", async (req, res) => {
  try {
    console.log(await req.body.partnerId);
    console.log(await req.params.id);
    const id = await chaptersPartnersDb.addChapterPartner(
      req.body.partnerId,
      req.params.id
    );

    res.status(200).json(id);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error adding zee dang partner to the chapter" });
  }
});

module.exports = router;
