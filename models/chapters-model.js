const db = require('../config/dbConfig.js');

module.exports = {
  findBy,
  findChapters,
  addChapter,
  updateChapter,
  removeChapter,
};

// get all chapters
function findChapters() {
  return db('chapters');
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
  const value = db('chapters').insert(chapter, 'id');
  return value;
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


