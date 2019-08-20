const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

const chaptersRouter = require('./api/chapterRouter.js');
const formRouter = require('./api/formRouter.js');
const userRouter = require('./api/usersRouter');
const partnerRouter = require('./api/partnerRouter')


server.use(helmet());
server.use(cors());
server.use(logger)
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

server.use('/api/chapter', chaptersRouter);
server.use('/api/form', formRouter);
server.use('/api/user', userRouter);
server.use('/api/partner', partnerRouter);


/**************************************/
/*      Custom Middleware             */
/**************************************/
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`A ${req.method} request to '${req.url}'at ${now}`);
  next();
};

module.exports = server;
