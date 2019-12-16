const db = require("../config/dbConfig");

//given a chapter ID, find all volunteers assigned to the Chapter:
function findChapterVolunteers(id) {
  return db.raw(
    `SELECT c.id, c.city, cv.volunteersid, v.fname, v.lname FROM chapters c
        INNER JOIN chapters_volunteers cv ON c.id = cv.chaptersid
        INNER JOIN volunteers v ON cv.volunteersid = v.id
        WHERE c.id = ${id}`
  );
}

//given a volunteer id, remove all chapter relationships for that volunteer
function removeVolFromAllChapters(volunteerId) {
  return db("chapters_volunteers")
    .where({ volunteersid: volunteerId })
    .del();
}

// //Get specific chapter volunteer row
async function getSpecificChapterVolunteer(volunteerId, chapterId) {
  return db("chapters_volunteers")
    .where("chaptersid", chapterId)
    .where("volunteersid", volunteerId);
}

// assign a volunteer to a Chapter to be displayed under the volunteers section
//volunteers work with and support Miracle Messages
async function assignChapterVolunteer(volunteerId, chapterId) {
  console.log("in the model");
  console.log(volunteerId);
  console.log(chapterId);
  return db("chapters_volunteers").insert(
    {
      volunteersid: volunteerId,
      chaptersid: chapterId
    },
    "id"
  );
}

//unassign a Partner from a Chapter.
function removeSpecificChapterVolunteer(volunteerId, chapterId) {
  return db("chapters_volunteers")
    .where({
      volunteersid: volunteerId,
      chaptersid: chapterId
    })
    .del();
}

module.exports = {
  findChapterVolunteers,
  removeVolFromAllChapters,
  assignChapterVolunteer,
  removeSpecificChapterVolunteer,
  getSpecificChapterVolunteer
};
