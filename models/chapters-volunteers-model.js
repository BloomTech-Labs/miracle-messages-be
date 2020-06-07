const db = require("../config/dbConfig");

//given a chapter ID, find all volunteers assigned to the Chapter:
// ✔
// function findChapterVolunteers(id) {
//   return db.raw(
//     `SELECT c.id, cv.volunteersid, v.profile_img_url, v.name FROM chapters c
//         INNER JOIN chapters_volunteers cv ON c.id = cv.chaptersid
//         INNER JOIN volunteers v ON cv.volunteersid = v.oktaid
//         WHERE c.id = ${id} AND  cv.approved = true`
//   )
// }
async function findChapterVolunteers(chapterId) {
  return db("chapters_volunteers as CV")
    .select("V.name","profile_img_url", "V.email")
    .join("volunteers as V", "CV.volunteersid", "V.oktaid")
    .where("CV.chaptersid", chapterId)
    .andWhere("CV.approved", true)
    .andWhere("CV.isAdmin", false)
 
}

function memberCount(chapterId){
  return db("chapters_volunteers as CV")
  .count("V.name")
  .join("volunteers as V", "CV.volunteersid", "V.oktaid")
  .where("CV.chaptersid", chapterId)
  .andWhere("CV.approved", true)
  .first()
}





function findLeaders(chapterId) {
  return db("chapters_volunteers as CV")
  .select("V.name","profile_img_url", "V.email", "V.bio")
  .join("volunteers as V", "CV.volunteersid", "V.oktaid")
  .where("CV.chaptersid", chapterId)
    .andWhere("CV.isAdmin", true)
}



function findPendingChapterVolunteers(id) {
  return db('chapters_volunteers')
    .where("chaptersid", id)
    .andWhere("approved", false)
}

function approveVolunteer(oktaId, chapterId) {
  return db("chapters_volunteers")
    .where("volunteersid", oktaId)
    .andWhere("chaptersid", chapterId)
    .update("approved", true)
}


function requestLeader(oktaId, chapterId) {
  return db("chapters_volunteers")
    .where("volunteersid", oktaId)
    .andWhere("chaptersid", chapterId)
    .update("requestedAdmin", true)
}

function findPendingChapterLeaders() {
  return db('chapters_volunteers as CV')
  .select("CV.chaptersid", "C.title as ChapterTitle", "C.city as ChapterCity", "C.state as ChapterState", "V.name", "V.email", "V.profile_img_url", "V.city as VolunteerCity", "V.state as VolunteerState",  "CV.approved", "CV.isAdmin")
  .join("volunteers as V", "CV.volunteersid", "V.oktaid")
  .join("chapters as C", "CV.chaptersid", "C.id")
  .where("requestedAdmin", true)
  .catch(error => console.log(error))
}

function approveLeader(oktaId, chapterId) {
  return db("chapters_volunteers")
    .where("volunteersid", oktaId)
    .andWhere("chaptersid", chapterId)
    .update({"requestedAdmin": false, "isAdmin": true})
}

function declineLeader(oktaId, chapterId) {
  return db("chapters_volunteers")
    .where("volunteersid", oktaId)
    .andWhere("chaptersid", chapterId)
    .update({"requestedAdmin": false})
}

//given a volunteer id, remove all chapter relationships for that volunteer
function removeVolFromAllChapters(volunteerId) {
  return db("chapters_volunteers").where( "volunteersid" , volunteerId ).del();
}

//Get specific chapter volunteer 
// ✔
async function getSpecificChapterVolunteer(oktaId, chapterId) {
  return db("chapters_volunteers as CV")
    .select("CV.chaptersid", "V.name", "V.email", "V.city", "V.state", "V.country", "CV.approved", "CV.isAdmin")
    .join("volunteers as V", "CV.volunteersid", "V.oktaid")
    .where("chaptersid", chapterId)
    .andWhere("volunteersid", oktaId)
    .first()
}

// assign a volunteer to a Chapter to be displayed under the volunteers section
//volunteers work with and support Miracle Messages
async function assignChapterVolunteer(oktaId, chapterId) {
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
  findPendingChapterVolunteers,
  approveVolunteer,
  requestLeader,
  findPendingChapterLeaders,
  approveLeader,
  declineLeader,
  findLeaders,
  memberCount
};
