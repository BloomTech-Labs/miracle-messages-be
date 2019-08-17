const db = require("../config/dbConfig.js");

module.exports = {
  find,
  addChapter,
  updateChapter
};

function find() {
  return db("chapters");
}

function addChapter(chapter) {
  const value = db("chapters").insert(chapter, "id");
  console.log(value);
  return value;
}

function updateChapter(id, changes) {
  return db("chapters")
    .where({ id })
    .update(changes);
}
