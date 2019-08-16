const db = require("../config/dbConfig.js");

module.exports = {
  find,
  addChapter
};

function find() {
  return db("chapters");
}

function addChapter(chapter) {
  console.log("hi");
  return db("chapters").insert(chapter, "id");
}
