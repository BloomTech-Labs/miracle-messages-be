const express = require("express");
const router = express.Router();
const Records = require("../utils/airtable");
const airDB = require("../models/airtable-model");

router.get("/update", async (req, res) => {
  Records();
  res.status(201).json({ Message: "it done" });
});

router.get("/get", (req, res) => {
  airDB.get().then((records) => {
    res.status(201).json(records);
  });
});

router.get("/del", (req, res) => {
  airDB.del().then(() => {
    res.status(201).json({ Message: "did it" });
  });
});

module.exports = router;
