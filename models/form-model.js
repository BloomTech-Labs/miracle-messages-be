const db = require('../config/dbConfig.js');

module.exports = {
  find,
  findByEmail,
  findByPhone,
  findByName,
  findByCity,
  findByState,
  findByCountry
};

function find(query) {
  let { page = 1, limit = 10, sortby = 'id', sortdit = 'asc' } = query;
  const offset = limit * (page - 1);

  const list = db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .orderBy(sortby, sortdit)
    .limit(limit)
    .offset(offset);

  return list;
}

function findByEmail(email) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ email });
}

function findByPhone(phone) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ phone });
}

function findByName(fname, lname) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ fname: fname, lname: lname });
}

function findByCity(city, state, country) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ city: city, state: state, country: country });
}

function findByState(state) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ state });
}

function findByCountry(country) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where({ country });
}
