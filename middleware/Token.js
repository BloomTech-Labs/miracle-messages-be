const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

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
