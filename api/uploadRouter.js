const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const AWS = require("aws-sdk");

//ENDPOINT IS api/upload
//the below endpoint is merely to test that AWS upload works correctly
//see this doc for instructions on how to use: https://www.notion.so/Uploading-to-s3-Bucket-Node-js-39579c64549942e883b143c9624abc67
router.post("/", async (req, res) => {
  const file = req.files.name;

  console.log(filename);

  uploadToS3(filename, res);
});

module.exports = router;
