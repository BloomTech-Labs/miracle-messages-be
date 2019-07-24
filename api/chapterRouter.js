const express = require('express');
const router = express.Router();

const chapterDB = require('../models/chapters-model.js');

router.get('/', (req, res) => {
  chapterDB
    .find()
    .then(chapters => {
      res.status(200).json(chapters);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error retrieving the chapters data' });
    });
});

module.exports = router;
