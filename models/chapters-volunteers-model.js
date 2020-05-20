const db = require("../config/dbConfig");

//given a chapter ID, find all volunteers assigned to the Chapter:
// ✔
function findChapterVolunteers(id) {
  // console.log(id)
  return db.raw(
    `SELECT c.id, cv.volunteersid, v.profile_img_url, v.fname, v.lname FROM chapters c
        INNER JOIN chapters_volunteers cv ON c.id = cv.chaptersid
        INNER JOIN volunteers v ON cv.volunteersid = v.oktaid
        WHERE c.id = ${id}`
  ).catch(error => console.log("error:", error))
}

//given a volunteer id, remove all chapter relationships for that volunteer
function removeVolFromAllChapters(volunteerId) {
  return db("chapters_volunteers").where( "volunteersid" , volunteerId ).del();
}

//Get specific chapter volunteer 
// ✔
async function getSpecificChapterVolunteer(oktaId, chapterId) {
  console.log("volunteersid:", oktaId,"chapterId:", chapterId);
  return db("chapters_volunteers as CV")
    .select("CV.chaptersid", "V.fname", "V.lname", "V.email", "V.city", "V.state", "V.country", "CV.approved")
    .join("volunteers as V", "CV.volunteersid", "V.oktaid")
    .where("chaptersid", chapterId)
    .andWhere("volunteersid", oktaId);
}

// assign a volunteer to a Chapter to be displayed under the volunteers section
//volunteers work with and support Miracle Messages
async function assignChapterVolunteer(oktaId, chapterId) {
  console.log("volunteersid:", oktaId, "chapterId:", chapterId);
  return db("chapters_volunteers").insert(
    {
      "volunteersid": oktaId,
      "chaptersid": chapterId
    },
    "volunteersid"
  );
}

//remove a volunteer from a Chapter.
function removeSpecificChapterVolunteer(oktaId, chapterId) {
  return db("chapters_volunteers")
    .where("volunteersid", oktaId)
    .andWhere("chaptersid", chapterId)
    .del();
}

module.exports = {
  findChapterVolunteers,
  removeVolFromAllChapters,
  assignChapterVolunteer,
  removeSpecificChapterVolunteer,
  getSpecificChapterVolunteer,
};
