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
  addInterests,
  deleteVolunteer,
  deleteInterests,
  updateVolunteer,
  updateInterest
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
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
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
}

function addVolunteer(volunteer, interests) {
  console.log(volunteer)
  return db('volunteers').insert(volunteer, 'id');
}

/////delete////////////

function deleteVolunteer(id) {
  return db('volunteers')
    .where({ id })
    .del();
}

function deleteInterests(volunteerId) {
  return db('interests')
    .where({ volunteersid: volunteerId })
    .del();
}

///////////update///////////////

async function updateVolunteer(id, change) {
  await db('volunteers')
    .where({ id })
    .update(change, '*');

  return findById(id);
}

function updateInterest(volunteerId, change) {
  return db('interests')
    .where({ volunteersid: volunteerId })
    .update(change, '*');
}
