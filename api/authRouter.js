const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const Users = require("../models/users-model.js"); 
const Volunteer = require("../models/volunteer-model.js"); 

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Volunteer.add(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error registering user: '+err });
      });
  });
  
  router.post("/login", (req, res) => {
    const email = req.body
    const password = req.body

    if(!email && !password) {
      res.status(401).json({error: "Wrong email or password"})
    } else {
      Volunteer.addId({ email })
      .then(volunteer => {
        if(volunteer && bcrypt.compareSync(password, volunteer.password)) {
          const token = generateToken(volunteer)

          res.status(200).json({message: `Welcome ${volunteer.email}!!`, token, id: volunteer.id})
        } else {
          res.status(400).json({ error: "Please provide credentials" })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
      })
    }
  })
  
  module.exports = router;