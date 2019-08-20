const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cors = require("cors");

const chaptersRouter = require("./api/chapterRouter.js");
const formRouter = require("./api/formRouter.js");
const userRouter = require("./api/usersRouter");
const uploadRouter = require("./api/uploadRouter");
const partnerRouter = require("./api/partnerRouter");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(fileupload());
server.use(logger);
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

server.use("/api/chapter", chaptersRouter);
server.use("/api/partner", partnerRouter);
server.use("/api/form", formRouter);
server.use("/api/user", logger, userRouter);
server.use("/api/upload", uploadRouter);

/**************************************/
/*      Custom Middleware             */
/**************************************/
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`A ${req.method} request to '${req.url}'at ${now}`);
  next();
}

module.exports = server;
