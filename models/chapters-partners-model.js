const dB = require("../config/dbConfig");

module.exports = {
  removeChapterPartner,
  addChapterPartner
};

/****************************************************************************/
/*                      Remove all partners of a chapter                    */
/****************************************************************************/
function removeChapterPartner(id) {
  return dB("chapters_partners")
    .where({ partnersid: id })
    .del();
}

function addChapterPartner(relationship) {
  return db("partners").insert(relationship, "id");
}
