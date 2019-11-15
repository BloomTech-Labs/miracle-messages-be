const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.add(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error registering user: '+err });
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = authenticate.genToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error with login: '+err,
          err: err
        });
      });
  });
  
  module.exports = router;