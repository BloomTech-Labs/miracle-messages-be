const express = require('express');
const server = express();
server.use(express.json());

const cors = require('cors');
server.use(cors());

server.get('/', (req,res) => {
    res.status(200).json({hello: 'World!'});
})

module.exports = server;