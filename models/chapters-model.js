const db = require('../config/dbConfig.js');

module.exports = {
  findBy,
  findChapters,
  addChapter,
  updateChapter,
  removeChapter,
  findPendingChapters,
  approveChapter
};

// get all chapters
function findChapters(query) {
  return db('chapters')
  .orderBy(query.sortBy || "city", query.dir || "asc")
  .where("approved", true);
}

function findPendingChapters() {
  return db('chapters')
  .where("approved", false);
}

function approveChapter(id){
  return db('chapters')
  .where("id", id)
  .update("approved", true)
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
function updateChapter(id, changes, current) {
  const { longitude = current.longitude,
    latitude = current.latitude,
    city = current.city,
    title = current.title,
    state = current.state,
    msg_recorded = current.msg_recorded,
    msg_delivered = current.msg_delivered,
    chapter_img_url = current.chapter_img_url,
    description = current.description,
    email = current.email,
    facebook = current.facebook
  } = changes
  const update = {longitude,
    latitude,
    city,
    title, 
    state, 
    msg_delivered, 
    msg_recorded, 
    chapter_img_url, 
    description,
    email,
    facebook}

  return db('chapters')
    .where({ id })
    .update(update)
    
    
}


// delete chapter
function removeChapter(id) {
  return db('chapters')
    .where({ id })
    .del();
}


