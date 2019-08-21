const dB = require("../config/dbConfig");

module.exports = {
  removePartnerChapter,
  removeChapterPartner,
  addChapterPartner
};

//

//given a partner id, remove all chapter relationships for that partner
function removePartnerChapter(id) {
  return dB("chapters_partners")
    .where({ partnersid: id })
    .del();
}

//given a chapter id, remove all partner relationships for that chapter

function removeChapterPartner(id) {
  return dB("chapters_partners")
    .where({ chaptersid: id })
    .del();
}

// add a ChapterPartner Relationship for a chapter
function addChapterPartner(partnerId, chapterId) {
  console.log("triggering add chapter partner");
  console.log(partnerId);
  console.log(chapterId);
  return dB("chapters_partners").insert({
    partnersid: partnerId,
    chaptersid: chapterId
  });
}


