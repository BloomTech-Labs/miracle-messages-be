const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const db = require("../config/dbConfig");

const authZ = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await db.raw(
      `SELECT * FROM volunteers WHERE email = ${email};`
    ); //This works...
    console.log(email, req, "email and pass");
    if (!user) {
      res.status(400).json("User not found");
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.generateToken(user);
      console.log(token);
      req.user_id = user.id;
      req.token = token;
      next();
    } else {
      res.status(404).json("Invalid username or password!");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error!");
  }
};

//Using JWT not jwt.js --- Check if this affects anything - Roenz
const protectedRoute = (req, res, next) => {
  const token = req.headers["token"];
  console.log(token, "token");
  JWT.verify(token, jwt.secretKey, (err, decoded) => {
    console.log("i made it here protected router middleware");
    if (err) {
      return res
        .status(500)
        .send({ authed: false, message: "The token could not be verified " });
    }
    req.user_id = decoded.id;
    console.log(req.user_id, `ids im trying to console log`);
    next();
  });
};

module.exports = {
  authZ,
  protectedRoute
};
