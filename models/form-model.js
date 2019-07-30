const db = require('../config/dbConfig.js');

module.exports = {
  find,
  findByEmail,
  findByPhone
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

function findByEmail(email) {
  return db('volunteers').where({ email });
}

function findByPhone(phone) {
  return db('volunteers').where({ phone });
}
