const db = require("../config/dbConfig");

//given a chapter ID, find all volunteers assigned to the Chapter:
function findChapterVolunteers(chapterId) {
  return db("chapters as c")
    .join("chapters_volunteers as cv", "c.id", "cv.chaptersid")
    .join("volunteers as v", "v.id", "cp.volunteersid")
    .where({ chaptersid: chapterId });
}

//given a volunteer id, remove all chapter relationships for that volunteer
function removeVolFromAllChapters(volunteerId) {
  return db("chapters_volunteers")
    .where({ volunteersid: volunteerId })
    .del();
}

// assign a volunteer to a Chapter to be displayed under the volunteers section
//volunteers work with and support Miracle Messages
function assignChapterVolunteer(volunteerId, chapterId) {
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
  removeSpecificChapterVolunteer
};
