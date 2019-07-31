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
      // console.log(error);
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

router.get('/findbyname', (req, res) => {
  const { fname, lname } = req.body;

  formDB
    .findByName(fname, lname)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

router.get('/findbycity', (req, res) => {
  const { city, state, country } = req.body;

  formDB
    .findByCity(city, state, country)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

router.get('/findbystate', (req, res) => {
  const { state } = req.body;

  formDB
    .findByState(state)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

router.get('/findbycountry', (req, res) => {
  const { country } = req.body;

  formDB
    .findByCountry(country)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

////////// addding /////////////

router.post('/', (req, res) => {
  formDB
    .addVolunteer(req.body)
    .then(volunteer => {
      console.log(volunteer);
      var [id] = volunteer;
      console.log(id);
      // res.status(201).json(volunteer);
    })
    .then(test => {
      console.log(`and ${test}`);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: ' Error adding the volunteer' });
    });
});

module.exports = router;

// try {
//     const data = await formDB.addVolunteer(req.body);
//     res.status(201).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: ' Error adding the volunteer' });
//   }
