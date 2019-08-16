const express = require("express");
const server = express();

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fileupload = require("express-fileupload");

const chaptersRouter = require("./api/chapterRouter.js");
const formRouter = require("./api/formRouter.js");
const userRouter = require("./api/usersRouter");
const uploadRouter = require("./api/uploadRouter");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(fileupload());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

server.use("/api/chapter", chaptersRouter);
server.use("/api/form", formRouter);
server.use("/api/user", logger, userRouter);
server.use("/api/upload", uploadRouter);

function logger(req, res, next) {
  const now = new Date().toISOString();
  req.now = now;
  console.log(`A ${req.method} request to '${req.url}'at ${req.now}`);
  next();
}

module.exports = server;
