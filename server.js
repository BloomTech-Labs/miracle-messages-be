require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");

const chaptersRouter = require("./api/chapterRouter.js");
const reunionRouter = require("./api/reunionRouter");
const volunteerRouter = require("./api/volunteerRouter");
const userRouter = require("./api/userRouter.js");
const pendingRouter = require("./api/pendingRouter");

server.use(helmet());
server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );

  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);

  next();
});
server.use(logger);
server.use(morgan("dev"));
server.use(fileupload());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});
server.use("/api/user", userRouter);
server.use("/api/chapter", chaptersRouter);
server.use("/api/reunion", reunionRouter);
server.use("/api/volunteer", volunteerRouter);
server.use("/api/pending", pendingRouter);

// custom logging function
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`A ${req.method} request to '${req.url}'at ${now}`);
  next();
}

module.exports = server;
