const db = require("../config/dbConfig.js");

/////////// Get queries //////////////////

function find() {
  return db("volunteers").select("*");
}

function findBy(filter) {
  return db("volunteers")
    .innerJoin("interests", "volunteers.id", "interests.volunteersid")
    .where(filter);
}

function findEmail(id) {
  return db("volunteers").select("id", "email").where({ id }).first();
}

function findById(id) {
  return db("volunteers").where({ id }).first();
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
    .then((volunteer) => {
      return findById(id);
    });
}

/////delete////////////

function deleteVolunteer(id) {
  return db("volunteers").where({ id }).del();
}

////// insert //////////

async function add(volunteer) {
  return db("volunteers").insert(volunteer, "id");
}

function addId(filter) {
  return db("volunteers").first().where(filter);
}

module.exports = {
  add,
  addId,
  find,
  findBy,
  findById,
  deleteVolunteer,
  updateVolunteer,
  findDetailed,
  findEmail,
};
