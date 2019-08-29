const db = require("../config/dbConfig.js");

module.exports = {
  findBy,
  findChapters,
  addChapter,
  updateChapter,
  removeChapter
};

//**** GET ALL CHAPTERS ******
function findChapters() {
  return db("chapters");
}

//**** FIND SPECIFIC CHAPTER BY CHAPTER ID ******

function findBy(id) {
  const chapter = db("chapters")
    .where({ id })
    .first();

  return chapter;
}

//**** ADD A CHAPTER  ******
function addChapter(chapter) {
  const value = db("chapters").insert(chapter, "id");
  return value;
}

//**** UPDATE CHAPTER ******
function updateChapter(id, changes) {
  return db("chapters")
    .where({ id })
    .update(changes);
}

//**** REMOVE CHAPTER ******
function removeChapter(id) {
  return db("chapters")
    .where({ id })
    .del();
}
