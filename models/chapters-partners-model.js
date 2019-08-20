const dB = require("../config/dbConfig");

module.exports = {
  removePartnerChapter,
  removeChapterPartner
};

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
