const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const AWS = require("aws-sdk");

//api/upload
router.post("/", async (req, res, next) => {
  // console.log(res);
  const file = req.files.name;
  uploadToS3(file, res, next);
  // res.status(200).json(data);
});

module.exports = router;
