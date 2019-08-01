const express = require('express');
const server = express();
server.use(express.json());

const chaptersRouter = require('./api/chapterRouter.js');
const formRouter = require('./api/formRouter.js');

const cors = require('cors');

server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

server.use('/api/chapter', chaptersRouter);
server.use('/api/form', formRouter);

module.exports = server;
