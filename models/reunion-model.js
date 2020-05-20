const db = require("../config/dbConfig.js");

module.exports = {
  find,
  findById,
  remove,
  addReunion,
  updateReunion
};

//Find all reunions
function find() {
  return db("reunions");
}

//Find all reunions of a chapter 
function findById(id) {
  console.log("chapter id in model:", id)
  return db("reunions")
    .where({ "chapterid": id });
}

//Remove a reunion 
function remove(id) {
  return db("reunions")
    .where({ id })
    .del();
}

//add a reunion 
function addReunion(reunion) {
  return db("reunions")
    .insert(reunion, "id")
}

//update a reunion 
function updateReunion(id, changes) {
  return db("reunion")
    .where({ id })
    .update(changes);
}



