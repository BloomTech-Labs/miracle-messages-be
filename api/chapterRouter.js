const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const chapterDB = require("../models/chapters-model.js");
const chaptersPartnersDB = require("../models/chapters-partners-model.js");
const partnerDB = require("../models/partners-model");
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";
const axios = require("axios");
//TODO to be implemented
const authenticationRequired = require("../middleware/Okta");

/******************/
// ** ALL THE GETS **
/******************/
/**
 * Method: GET
 * What: Getting all chapters
 * Endpoint: /api/chapter
 * Returns: Json of all chapters with related partners
 */
// ENDPOINT VERIFIED

router.get("/", async (req, res) => {
  try {
    let chapters = await chapterDB.findChapters();

    const promises = chapters.map(async (chapter) => {
      let partners = await partnerDB.findById(chapter.id);
      chapter.partners = partners;
      return chapter;
    });

    chapters = await Promise.all(promises);
    res.status(200).json(chapters);
  } catch {
    res.status(500).json({
      error: "there was a problem getting chapter or partner information",
    });
  }
});

//TODO could use to assign specific volunteers to specific chapters: Keep for further review
/**
 * Method: GET
 * What: Getting a list of volunteers from chapter
 * Endpoint: /api/chapter/:id/volunteers
 * Returns: Json of all volunteers related to a specific chapter
 */
// ENDPOINT VERIFIED

// router.get("/:id/volunteers", authenticationRequired, async (req, res) => {
//   const chapterId = req.params.id;
//   try {
//     const volunteers = await chaptersVolunteersDB.findChapterVolunteers(
//       chapterId
//     );
//     //Checks if there are volunteers in chapter
//     if (volunteers.rows.length < 1) {
//       res
//         .status(404)
//         .json({ message: "There is no volunteers in this chapter" });
//     } else {
//       res.status(200).json(volunteers.rows);
//     }
//   } catch {
//     res
//       .status(500)
//       .json({ errorMessage: "There is a problem finding volunteers data" });
//   }
// });

/**
 * Method: GET
 * What: Getting a specific chapter
 * Endpoint: /api/chapter/:id
 * Returns: JSON a specific chapter by id
 */
// ENDPOINT VERIFIED

router.get("/:id", async (req, res) => {
  try {
    const chapter = await chapterDB.findBy(req.params.id);

    let partners = await partnerDB.findById(chapter.id);

    chapter.partners = partners;
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter",
    });
  }
});

/**
 * Method: GET
 * What: Getting partners from chapter
 * Endpoint: /api/chapter/:id/partners
 * Returns: JSON of all partners specific to a chapter
 */
// ENDPOINT VERIFIED

router.get("/:id/partners", async (req, res) => {
  try {
    const chapter = await chaptersPartnersDB.findChapterPartners(req.params.id);

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter",
    });
  }
});

//TODO could use in the future; Keep for further review
/**
 * Method: GET
 * What: Getting a specific volunteer from chapter
 * Endpoint: /api/chapter/:id/volunteer
 * Returns: JSON of specific Chapter_Volunteer by their oktaid's
 */
// ENDPOINT VERIFIED
// router.get("/:id/volunteer", async (req, res) => {
//   let chapterId = req.params.id;
//   let oktaId = req.body.oktaid;
//   try {
//     const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
//       oktaId,
//       chapterId
//     );
//     res.status(200).json(isVolunteerInChapter);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error getting the chapter",
//     });
//   }
// });

/********************/
// ** ALL THE POSTS **
/********************/

//TODO adds chapter
/**
 * Method: POST
 * What: Adds chapter into DB
 * Endpoint: /api/chapter
 * Requires: `req.body: longitude, latitude, city, title, state, email, chapter_img_url, established_date, description, email
 * Optional: `req.body: numvolunteers, numreunions, msg_recorded, msg_delivered, reunion_img_url, story, facebook
 * Returns: JSON of chapter or id
 */
router.post("/", async (req, res) => {
  const newChapter = req.body;
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

    // Adds Chapter to the Database
    chapterDB
      .addChapter(newChapter)
      .then((chapter) => {
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

//TODO assigns a partner/sponsor to a chapter
/**
 * Method: POST
 * What: Creates row in chapters_partners for specific chapter/partner
 * Endpoint: /api/chapter/:id/partners
 * Requires: req.body: partnerId
 *           req.params.id
 * Returns: ID of newly created row
 */
// ENDPOINT VERIFIED
router.post("/:id/partners", async (req, res) => {
  try {
    const id = await chaptersPartnersDB.assignChapterPartner(
      req.body.partnerId,
      req.params.id
    );

    res.status(200).json(id);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error assigning partner to the chapter", error });
  }
});

//TODO could use in the future. Keep for further review
/**
 * Method: POST
 * What: Adding volunteer into chapter
 * Endpoint: /api/chapter
 * Requires: req.user_id: volunteerId
 *           req.params.id : chapterId
 * Returns: ID of the created chapter_volunteers row
 */
//**********************************************************************
//********* SIGNING UP AS A VOLUNTEER TO A CHAPTER   *************/
//**********************************************************************
// ROUTE FIXED AND VERIFIED
router.post("/:id/volunteer", async (req, res) => {
  let chapterId = req.params.id;
  let oktaId = req.body.oktaid;
  console.log(oktaId);
  try {
    const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    console.log(isVolunteerInChapter);
    //Checks if this volunteer is already in the chapter
    if (isVolunteerInChapter.length < 1) {
      const signedUp = await chaptersVolunteersDB.assignChapterVolunteer(
        oktaId,
        chapterId
      );

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
    res.status(500).json({
      errorMessage: "error assigning volunteer to the chapter",
      error,
    });
  }
});

/********************/
// ** ALL THE PUTS **
/********************/

/**
 * Method: PUT
 * Endpoint: /api/chapter/:id
 * Requires: req.user_id: volunteerId
 * Returns: ID of the created chapter_volunteers row
 */
//**********************************************************************
//********* UPDATING THE INFO FOR A CHAPTER  *************/
//**********************************************************************

//TODO currently only specific roles (which roles) can update a chapter
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

    //TODO when implementing authentication this will need to be reviewed.
    const chapter = await chapterDB.updateChapter(
      req.params.id,
      updatedChapter
    );

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the chapter",
    });
  }
});

/********************/
// ** ALL THE DELETES **
/********************/

//TODO Need to confirm these deletes

/**
 * Method: DEL
 * What: Deleting a chapter
 * Endpoint: /api/chapter/:id
 * Requires: id of chapter
 * Returns: Nothing or ID
 */
//************************************************************
// THIS IS FOR DELETING A CHAPTER FROM THE DATABASE */
//************************************************************
// ROUTE VERIFIED
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
        "There is a problem removing all chapter-partner relationships for this chapter",
    });
  }

  //Next, Delete the chapter from chatpers table:
  try {
    const numChapters = await chapterDB.removeChapter(chapterId);
    res.status(200).json({
      partners: `${numChapters} chapter deleted`,
      chapters: `this chapter was removed from ${numPartners} partners`,
    });
  } catch {
    res.status(500).json({
      "error message": "There is a problem removing this partner",
    });
  }
});

/**
 * Method: DEL
 * What: Un-assigning a partner from chapter
 * Endpoint: /api/chapter/:id
 * Requires: id of chapter
 * Returns: Nothing or ID
 */
//****************************************************************
// THIS IS FOR REMOVING A SPECIFIC PARTNER ORG FROM A CHAPTER *
//***************************************************************
router.delete("/:id/partners/:partnerid", async (req, res) => {
  try {
    const count = await chaptersPartnersDB.unassignChapterPartner(
      req.params.partnerid,
      req.params.id
    );

    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: "error removing partner from chapter" });
  }
});

/**
 * Method: DEL
 * What: Un-assigning a volunteer from chapter (Admin)
 * Endpoint: /api/chapter/:id
 * Requires: id of chapter
 * Returns: Nothing or ID
 * UNTESTED DON'T KNOW IF IT WORKS YET
 */
/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Admin
        to be used for 
/****************************************************************************/
router.delete("/:id/volunteers/:oktaid", async (req, res) => {
  try {
    const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
      req.params.oktaid,
      req.params.id //chapterId
    );

    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: "error removing volunteer from chapter" });
  }
});

//TODO could use in the future

/**
 * Method: DEL
 * What: Unassigning a volunteer from chapter (Volunteer)
 * Endpoint: /api/chapter/:id
 * Requires: id of chapter
 * Returns: Nothing or ID
 */
/****************************************************************************/
/*      Delete a volunteer from a specific chapter - Volunteer
/****************************************************************************/
router.delete("/:id/volunteer", async (req, res) => {
  let chapterId = req.params.id;
  let oktaId = req.body.oktaid;

  try {
    const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
      oktaId,
      chapterId
    );

    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ errorMessage: "error removing volunteer" });
  }
});

module.exports = router;
