const db = require('../config/dbConfig.js');

module.exports = {
  find,
  findById,
  findByEmail,
  findByPhone,
  findByName,
  findByCity,
  findByState,
  findByCountry,
  addVolunteer,
  addInterests
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

function findById(id) {
  return db('volunteers')
    .where({ id })
    .first();
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

////// insert //////////

async function addInterests(interests) {
  const interestid = await db('interests').insert(interests);
  return interestid;
  // return db('interests').insert(interests, 'id');
}

function addVolunteer(volunteer, interests) {
  // const id = await db('volunteers').insert(volunteer);
  // interests.volunteersid = id;
  // console.log(interests.volunteersid);

  // await addInterests(interests);
  // return findById(id);
  return db('volunteers').insert(volunteer, 'id');
}
