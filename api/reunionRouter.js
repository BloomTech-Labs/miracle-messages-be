const express = require("express");
const router = express.Router();
// const uploadToS3 = require("../middleware/uploadToS3.js");
// const MW = require("../middleware/partnersMW");
const reunionDB = require("../models/reunion-model.js");
// const chaptersPartnersDb = require("../models/chapters-partners-model.js");
// const authenticationRequired = require("../middleware/Okta");
// // this link below is to specify the AWS S3 BUCKET where our images will live:

// const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";

//Get all reunions 
router.get("/", async (req, res) => {
  try {
    const reunions = await reunionDB.find();
    res.status(200).json(reunions);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding partners data" });
  }
});



module.exports = router;
