const db = require('../config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db('volunteers').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('volunteers').where(filter);
}

async function add(volunteer) {
  const [oktaid] = await db('volunteers').insert(volunteer, '*');
  console.log("add okta=", oktaid)
  return await findById(oktaid)
}

function findById(id) {
  return db('volunteers')
    .where(id)
    .first();
}
