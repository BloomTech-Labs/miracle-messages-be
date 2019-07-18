const express = require('express');
const server = express();
server.use(express.json());

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

module.exports = server;
