const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const Users = require("../models/users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

/****************************************************************************/
/*                    New  user registration by an admin                    */
/****************************************************************************/

router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, Please try again" });
  }
});

/****************************************************************************/
/*                              Admin login                                 */
/****************************************************************************/
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  // const hash = bcrypt.hashSync(password, 10);
  // console.log(hash);
  // console.log(bcrypt.compareSync(password, hash));

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

/****************************************************************************/
/*                              Get all Admins                              */
/****************************************************************************/

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

/****************************************************************************/
/*                              Generate token                              */
/****************************************************************************/


//TODO token is created here as well as in the authRouter
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
