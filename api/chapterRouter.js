const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const chapterDB = require("../models/chapters-model.js");
const chaptersPartnersDB = require("../models/chapters-partners-model.js");
const partnerDB = require("../models/partners-model");
const authenticated = require("../auth/restricted-middleware");
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const aws_link =
  "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/";

/******************/
// ** ALL THE GETS **
/******************/

/****************************************************************************/
/*               GET all chapters with all related partners                */
/****************************************************************************/
router.get("/", authenticated, async (req, res) => {
  try {
    let chapters = await chapterDB.findChapters();

    const promises = chapters.map(async chapter => {
      let partners = await partnerDB.findById(chapter.id);
      chapter.partners = partners;
      return chapter;
    });

    chapters = await Promise.all(promises);
    res.status(200).json(chapters);
  } catch {
    res.status(500).json({
      error: "there was a problem getting chapter or partner information"
    });
  }
});

/****************************************************************************/
/*                 Get all volunteers of one specific chapter                 */
/****************************************************************************/
router.get("/:id/volunteers", authenticated, async (req, res) => {
  const chapterId = req.params.id;
  try {
    const volunteers = await chaptersVolunteersDB.findChapterVolunteers(
      chapterId
    );
    //Checks if there are volunteers in chapter
    if (volunteers.rows.length < 1) {
      res
        .status(404)
        .json({ message: "There is no volunteers in this chapter" });
    } else {
      res.status(200).json(volunteers.rows);
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding volunteers data" });
  }
});

/****************************************************************************/
// THIS IS FOR GETTING A SPECIFIC CHAPTER BY ID
/****************************************************************************/

router.get("/:id", async (req, res) => {
  try {
    const chapter = await chapterDB.findBy(req.params.id);

    let partners = await partnerDB.findById(chapter.id);

    chapter.partners = partners;
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter"
    });
  }
});

//************************************************************
//THIS IS FOR GETTING ALL PARTNER ORGANIZATIONS FOR A SPECIFIC CHAPTER
//************************************************************
router.get("/:id/partners", async (req, res) => {
  try {
    const chapter = await chaptersPartnersDB.findChapterPartners(req.params.id);

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter"
    });
  }
});

/****************************************************************************/
// THIS IS FOR GETTING A SPECIFIC CHAPTER_VOLUNTEER BY ID's
/****************************************************************************/

router.get("/:id/volunteer", authenticated, async (req, res) => {
  let chapterId = req.params.id;
  let volunteerId = req.user_id;
  try {
    const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      volunteerId,
      chapterId
    );
    // console.log(Boolean(isVolunteerInChapter.length));
    res.status(200).json(isVolunteerInChapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter"
    });
  }
});

/********************/
// ** ALL THE POSTS **
/********************/

//**********************************************************************
//********* ADDING A CHAPTER TO THE DATABASE  *************/
//**********************************************************************

router.post("/", async (req, res) => {
  try {
    const newChapter = await req.body;

    //checking to see if any chapter images were added so we can upload it to the AWS bucket:
    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      //1) we grab the file:
      const { chapter_img } = await req.files;

      //2) we try to upload
      try {
        uploadToS3(chapter_img, res);
      } catch (error) {
        res
          .status(500)
          .json({ error: "error uploading the chapter_img to AWS" });
      }

      // 3) we store the chapter image url in the database:
      //a) first get the name of the file
      const chapterImgName = await req.files.chapter_img.name;

      //b) then we encode the name i.e replace spaces etc with special characters to make it URL compatible
      //so it can be appended to the s3 bucket link:
      const encodedChapterImgName = encodeURI(chapterImgName);
      //c) we append the encoded name to the s3 bucket link to get the location of the
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

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, Please try again" });
  }
});

//**********************************************************************
//********* ASSIGNING A PARTNER ORGANIZATION TO A CHAPTER   *************/
//**********************************************************************

router.post("/:id/partners", async (req, res) => {
  try {
    console.log("in the router");
    console.log(req.body.partnerId);
    console.log(req.params.id);

    const id = await chaptersPartnersDB.assignChapterPartner(
      req.body.partnerId,
      req.params.id
    );

    res.status(200).json(id);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error assigning zee dang partner to the chapter" });
  }
});

//**********************************************************************
//********* SIGNING UP AS A VOLUNTEER TO A CHAPTER   *************/
//**********************************************************************

router.post("/:id/volunteer", authenticated, async (req, res) => {
  let chapterId = req.params.id;
  let volunteerId = req.user_id;

  try {
    const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      volunteerId,
      chapterId
    );
    console.log(isVolunteerInChapter);
    //Checks if this volunteer is already in the chapter
    if (isVolunteerInChapter.length < 1) {
      const signedUp = await chaptersVolunteersDB.assignChapterVolunteer(
        volunteerId,
        chapterId
      );

      res.status(200).json({
        message: `You have successfully signed up for this chapter.`,
        id: signedUp
      });
    } else {
      res
        .status(400)
        .json({ message: "This volunteer is already in this chapter" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "error assigning zee dang volunteer to the chapter" });
  }
});

/********************/
// ** ALL THE PUTS **
/********************/

//**********************************************************************
//********* UPDATING THE INFO FOR A CHAPTER  *************/
//**********************************************************************
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

/********************/
// ** ALL THE DELETES **
/********************/

//************************************************************
// THIS IS FOR DELETING A CHAPTER FROM THE DATABASE */
//************************************************************
router.delete("/:id", async (req, res) => {
  const chapterId = req.params.id;
  let numPartners = 0;

  //Need to validate that chapter id exists.//////////////////////////

  // First, we delete all chapter-partner relationships from chapters_partners
  try {
    numPartners = await chaptersPartnersDB.removeChapterPartner(chapterId);
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

//****************************************************************
// THIS IS FOR UNASSIGNING A SPECIFIC PARTNER ORG FROM A CHAPTER *
//***************************************************************

//
router.delete("/:id/partners/:partnerid", async (req, res) => {
  try {
    const count = await chaptersPartnersDB.unassignChapterPartner(
      req.params.partnerid,
      req.params.id
    );

    res.status(200).json(count);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error unassigning zee dang partner from the chapter" });
  }
});

/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Admin
/****************************************************************************/
router.delete(
  "/:id/volunteers/:volunteerid",
  authenticated,
  async (req, res) => {
    try {
      const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
        req.params.volunteerid,
        req.params.id //chapterId
      );

      res.status(200).json(count);
    } catch (error) {
      res
        .status(500)
        .json({ error: "error unassigning zee dang partner from the chapter" });
    }
  }
);

/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Volunteer
/****************************************************************************/
router.delete("/:id/volunteer/", authenticated, async (req, res) => {
  let chapterId = req.params.id;
  let volunteerId = req.user_id;

  try {
    const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
      volunteerId,
      chapterId
    );

    res.status(200).json(count);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error removing zee dang volunteer from the chapter" });
  }
});

module.exports = router;
