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
  return db("chapters_volunteers").where({ volunteersid: volunteerId }).del();
}

// //Get specific chapter volunteer row
async function getSpecificChapterVolunteer(oktaId, chapterId) {
  console.log(oktaId, chapterId);
  return db("chapters_okta_table")
    .where("chaptersid", chapterId)
    .where("oktaid", oktaId);
}

// assign a volunteer to a Chapter to be displayed under the volunteers section
//volunteers work with and support Miracle Messages
async function assignChapterVolunteer(oktaId, chapterId) {
  console.log("in the model");
  console.log(oktaId);
  console.log(chapterId);
  return db("chapters_okta_table").insert(
    {
      oktaid: oktaId,
      chaptersid: chapterId,
    },
    "id"
  );
}

<<<<<<< HEAD
//unassign a Partner from a Chapter.
=======
//remove a volunteer from a Chapter.
>>>>>>> bb8230aa7718cce466caa6dd21aba09c9599050a
function removeSpecificChapterVolunteer(oktaId, chapterId) {
  return db("chapters_okta_table")
    .where({
      oktaid: oktaId,
      chaptersid: chapterId,
    })
    .del();
}

module.exports = {
  findChapterVolunteers,
  removeVolFromAllChapters,
  assignChapterVolunteer,
  removeSpecificChapterVolunteer,
  getSpecificChapterVolunteer,
};
