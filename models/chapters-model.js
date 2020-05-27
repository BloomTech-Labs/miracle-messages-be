const db = require('../config/dbConfig.js');

module.exports = {
  findBy,
  findChapters,
  addChapter,
  updateChapter,
  removeChapter,
};

// get all chapters
function findChapters(query) {
  return db('chapters').orderBy(query.sortBy || "city", query.dir || "asc");
}

// get specific chapter

function findBy(id) {
  const chapter = db('chapters')
    .where({ id })
    .first();

  return chapter;
}

// add chapter
function addChapter(chapter) {
  return db('chapters').insert(chapter, 'id');
}

// update chapter
function updateChapter(id, changes) {
  return db('chapters')
    .where({ id })
    .update(changes);
}

// delete chapter
function removeChapter(id) {
  return db('chapters')
    .where({ id })
    .del();
}


