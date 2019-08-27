const express = require("express");
const server = express();

const morgan = require("morgan");
const fileupload = require("express-fileupload");

const cors = require("cors");
const helmet = require("helmet");

const chaptersRouter = require("./api/chapterRouter.js");
const formRouter = require("./api/formRouter.js");
const userRouter = require("./api/usersRouter");
const partnerRouter = require("./api/partnerRouter");
const uploadRouter = require("./api/uploadRouter");

server.use(helmet());
server.use(cors());
server.use(logger);
server.use(morgan("dev"));
server.use(fileupload());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

server.use("/api/upload", uploadRouter);
server.use("/api/chapter", chaptersRouter);
server.use("/api/partner", partnerRouter);
server.use("/api/form", formRouter);
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
