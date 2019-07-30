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
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

router.get('/findbyemail', (req, res) => {
  const { email } = req.body;

  formDB
    .findByEmail(email)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

router.get('/findbyphone', (req, res) => {
  const { phone } = req.body;

  formDB
    .findByPhone(phone)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

module.exports = router;
