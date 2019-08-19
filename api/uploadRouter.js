const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const AWS = require("aws-sdk");

//api/upload
router.post("/", async (req, res) => {
  const file = req.files.name;

  console.log(filename);

  uploadToS3(filename, res);
});

module.exports = router;
