const express = require('express');
const router = express.Router();

const formDB = require('../models/form-model.js');

router.get('/', (req, res) => {
  formDB
    .find(req.query)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

module.exports = router;
