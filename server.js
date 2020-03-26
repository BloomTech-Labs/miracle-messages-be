const express = require("express");
const server = express();

const morgan = require("morgan");
const fileupload = require("express-fileupload");

const cors = require("cors");
const helmet = require("helmet");

const authenticationRequired = require("./middleware/Okta.js");

const chaptersRouter = require("./api/chapterRouter.js");
// const formRouter = require("./Lab18_unusedcode/formRouter.js");
const userRouter = require("./api/masterRouter");
const partnerRouter = require("./api/partnerRouter");
// const uploadRouter = require("./api/uploadRouter");
// const volunteersRouter = require("./Lab18_unusedcode/volunteersRouter");

// importing auth routers below
const authRouter = require("./api/authRouter.js");
// importing auth routers above

// import resetPassword router below
const resetPasswordRouter = require("./Lab18_unusedcode/ResetPasswordRouter.js");
// import resetPassword above

server.use(helmet());
server.use(cors());
server.use(logger);
server.use(morgan("dev"));
server.use(fileupload());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

// using auth router below
server.use("/api/volunteer", authRouter);
// using auth router above

// using resetPassword router below
server.use("/api/account", resetPasswordRouter);
// using resetPassword router above

// server.use("/api/upload", uploadRouter);
server.use("/api/chapter", chaptersRouter);
server.use("/api/partner", partnerRouter);
// server.use("/api/form", formRouter);
server.use("/api/user", userRouter);

/**************************************/
/*      Custom Middleware             */
/**************************************/
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`A ${req.method} request to '${req.url}'at ${now}`);
  next();
}

module.exports = server;
