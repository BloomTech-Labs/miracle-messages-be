const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Volunteer = require("../models/volunteer-model.js"); 
const generateToken = require("../middleware/Token.js"); 

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


  router.post('/login', (req, res) => { // localhost:9000/api/auth/login 
    // implement login
    const { email } = req.body
    const { password } = req.body
    // const { fname } = require.body
  
    if(!email && !password) {
        res.status(401).json({ error: "Wrong password or username" })
    } else {
        Volunteer.addId({ email })
        .first()
        .then(user => { 
          // console.log(user)
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                
                res.status(200).json({ message: `Welcome ${user.fname}!!`, token, id: user.id })  
            } else {
                res.status(400).json({ error: "please provide credentials"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Internal Server Error"})
        })
    }
  })

  // For Hash 
router.get("/hash", (req, res) => {
  const password = req.headers.authorization

  if(password) {
    const hash = bcrypt.hashSync(password, 10)
    res.status(200).json({ hash })
  } else {
    res.status(400).json({ error: "Please provide credentials" })
  }
})
  
  module.exports = router;