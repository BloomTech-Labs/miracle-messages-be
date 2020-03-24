const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

//TODO creates a token here, authRouter, and masterRouter
function generateToken(volunteer) {
  const payload = {
    username: volunteer.email,
    subject: volunteer.id
  };
  const options = {
    expiresIn: "4d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = generateToken;
