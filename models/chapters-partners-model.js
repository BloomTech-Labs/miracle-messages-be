const db = require("../config/dbConfig");

module.exports = {
  findChapterPartners,
  removePartnerChapter,
  removeChapterPartner,
  assignChapterPartner,
  unassignChapterPartner
};

//given a chapter ID, find all partners assigned to the Chapter:
function findChapterPartners(chapterId) {
  return db("chapters as c")
    .join("chapters_partners as cp", "c.id", "cp.chaptersid")
    .join("partners as p", "p.id", "cp.partnersid")
    .where({ chaptersid: chapterId });
}

//given a partner id, remove all chapter relationships for that partner
function removePartnerChapter(partnerIid) {
  return db("chapters_partners")
    .where({ partnersid: partnerIid })
    .del();
}

//given a chapter id, remove all partner relationships for that chapter

function removeChapterPartner(chapterId) {
  return db("chapters_partners")
    .where({ chaptersid: chapterId })
    .del();
}

// assign a Partner to a Chapter to be displayed under the partners/sponsors section
//partners and sponsors are organizations that work with and support Miracle Messages
function assignChapterPartner(partnerId, chapterId) {
  console.log("in the model");
  console.log(partnerId);
  console.log(chapterId);
  return db("chapters_partners").insert(
    {
      partnersid: partnerId,
      chaptersid: chapterId
    },
    "id"
  );
}

//unassign a Partner from a Chapter. This is if an orgnaziation is no longer partnering with a Chapter

function unassignChapterPartner(partnerId, chapterId) {
  return db("chapters_partners")
    .where({
      partnersid: partnerId,
      chaptersid: chapterId
    })
    .del();
}
