const db = require('../config/dbConfig.js');

module.exports = {
  find,
  findBy,
  addVolunteer,
  addInterests,
  deleteVolunteer,
  deleteInterests,
  updateVolunteer,
  updateInterest
};

/////////// Get queries //////////////////

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

function findBy(filter) {
  return db('volunteers')
    .innerJoin('interests', 'volunteers.id', 'interests.volunteersid')
    .where(filter );
}

////// insert //////////

async function addInterests(interests) {
  const interestid = await db('interests').insert(interests);
  return interestid;
}

function addVolunteer(volunteer) {
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

  return findBy({id});
}

function updateInterest(volunteerId, change) {
  return db('interests')
    .where({ volunteersid: volunteerId })
    .update(change, '*');
}
