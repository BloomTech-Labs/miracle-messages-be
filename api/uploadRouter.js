const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");

router.post("/", async (req, res) => {
  const file = req.files.name;
  uploadToS3(file, res);
});

module.exports = router;
