const db = require('../config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  deleteVolunteer
};

function find() {
  return db('volunteers').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('volunteers').where(filter);
}

async function add(volunteer) {
  const [id] = await db('volunteers').insert(volunteer, 'id');

  return findById(id);
}

function findById(id) {
  return db('volunteers')
    .where({ id })
    .first();
}

const update = (id, volunteer) => {
  return db("volunteers")
    .update(volunteer)
    .where("id", id) //* returns count of updated
    .then(volunteer => {
      return findById(id);
    });
};

const deleteVolunteer = id => {
  return db("volunteers")
    .where("id", id)
    .del(); //* returns count of deleted
};
