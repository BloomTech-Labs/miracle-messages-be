require('dotenv').config();
const server = require('./server');

const port = 5000;

server.listen(port, () => console.log(`API running on port ${port}`));
