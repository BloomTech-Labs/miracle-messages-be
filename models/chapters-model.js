const db = require("../config/dbConfig.js");

module.exports = {
  findBy,
  findChapters,
  addChapter,
  updateChapter,
  removeChapter
};

function findChapters() {
  return db("chapters");
}

function findBy(id) {
  console.log("triggering the model");
  const chapter = db("chapters")
    .where({ id })
    .first();

  return chapter;
}

function addChapter(chapter) {
  const value = db("chapters").insert(chapter, "id");
  // console.log(value);
  return value;
}

function updateChapter(id, changes) {
  return db("chapters")
    .where({ id })
    .update(changes);
}

function removeChapter(id) {
  return db("chapters")
    .where({ id })
    .del();
}
