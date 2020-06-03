const db = require("../config/dbConfig.js");

module.exports = {
  find,
  findById,
  remove,
  addReunion,
  updateReunion,
  findByChapterId,
  findPendingReunions,
  approveReunion
};

//Find all reunions
function find() {
  return db("reunions");
}

function findById(id) {
  // console.log("chapter id in model:", id)
  return db("reunions")
    .where({ "id": id })
    .first()
}

//Find all reunions of a chapter 
function findByChapterId(id) {
  console.log("chapter id in model:", id)
  return db("reunions")
    .where({ "chapterid": id });
}


function findPendingReunions(chapterId) {
  return db("reunions")
    .where({ "chapterid": chapterId })
    .andWhere({"approved": false})
}

function approveReunion(id) {
  return db("reunions")
    .where({ id })
    .update({"approved": true})
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
function updateReunion(id, changes, current) {
  const { longitude = current.longitude,
    latitude = current.latitude,
    city = current.city,
    title = current.title,
    state = current.state,
    link_to_media = current.link_to_media,
    reunion_img = current.reunion_img,
    story = current.story,
  
  } = changes
  const update = {longitude,
    latitude,
    city,
    title, 
    state, 
    link_to_media, 
    reunion_img, 
    story
    }

  return db("reunions")
    .where({ id })
    .update(update)
    .catch(err => console.log(err))
}



