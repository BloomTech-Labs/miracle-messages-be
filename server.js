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

const db = require('./config/dbConfig');

function find() {
  return db('users');
}

server.get('/users', (req, res) => {
  find()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ errorMessage: err }));
});

server.use('/api/chapter', chaptersRouter);
server.use('/api/form', formRouter);

module.exports = server;
