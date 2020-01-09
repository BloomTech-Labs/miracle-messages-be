const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

/**
 * Protected Middleware
 * For all routes that need protection with auth token
 * Returns: logged in user's id for use with specific routes
 */
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      // console.log("i made it here protected router middleware");
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        // console.log("i made in protected else statement", req.decodedJwt);
        req.user_id = decodedToken.subject;
        // console.log(req.user_id);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
