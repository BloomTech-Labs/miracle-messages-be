const db = require('../config/dbConfig.js');

module.exports = {
  find
};

function find(query) {
  let { page = 1, limit = 2, sortby = 'id', sortdit = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('volunteers')
    .orderBy(sortby, sortdit)
    .limit(limit)
    .offset(offset);

  return rows;
}
