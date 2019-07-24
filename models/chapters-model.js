const db = require('../config/dbConfig.js');

module.exports = {
  find
};

function find() {
  return db('chapters');
}
