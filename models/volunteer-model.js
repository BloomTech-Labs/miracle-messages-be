const db = require("../config/dbConfig.js");

/////////// Get queries //////////////////
function find() {
  return db("volunteers").select("id", "email", "password");
}

function findBy(filter) {
  return db("volunteers")
    .innerJoin("interests", "volunteers.id", "interests.volunteersid")
    .where(filter);
}

function findById(id) {
  return db("volunteers")
    .where({ id })
    .first();
}

function findDetailed(query) {
  let { page = 1, limit = 10, sortby = "id", sortdit = "asc" } = query;
  const offset = limit * (page - 1);

  const list = db("volunteers")
    .innerJoin("interests", "volunteers.id", "interests.volunteersid")
    .orderBy(sortby, sortdit)
    .limit(limit)
    .offset(offset);

  return list;
}

///////////update///////////////

function updateVolunteer(id, volunteer) {
  return db("volunteers")
    .update(volunteer)
    .where("id", id) //* returns count of updated
    .then(volunteer => {
      return findById(id);
    });
}

function updateInterest(volunteerId, change) {
  return db("interests")
    .where({ volunteersid: volunteerId })
    .update(change, "*");
}

/////delete////////////

function deleteVolunteer(id) {
  return db("volunteers")
    .where({ id })
    .del();
}

function deleteInterests(volunteerId) {
  return db("interests")
    .where({ volunteersid: volunteerId })
    .del();
}

////// insert //////////

async function add(volunteer) {
  const [id] = await db("volunteers").insert(
    //Abstracting out the id from inserted volunteer
    volunteer,
    "id" //This returns the id instead of default
  );

  return findById(id);
}

async function addInterests(interests) {
  const interestid = await db("interests").insert(interests);
  return interestid;
}

function addId(filter) {
  return db("volunteers")
    .first()
    .where(filter);
}

module.exports = {
  add,
  addId,
  find,
  findBy,
  findById,
  deleteVolunteer,
  updateVolunteer,
  updateInterest,
  addInterests,
  findDetailed,
  deleteInterests
};
