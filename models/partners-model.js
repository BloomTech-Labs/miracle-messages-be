const db = require("../config/dbConfig.js");

module.exports = {
  find,
  findById,
  remove,
  addPartner,
  updatePartner
};

/****************************************************************************/
/*                        Find all partners                    */
/****************************************************************************/
function find() {
  console.log("in zee modeeel");
  return db("partners");
}

/****************************************************************************/
/*                        Find all partners of a chapter                    */
/****************************************************************************/
function findById(id) {
  return db
    .select("partners.name", "partners.site_url", "partners.icon_url")
    .from("chapters_partners")
    .innerJoin("partners", "chapters_partners.partnersid", "partners.id")
    .where({ "chapters_partners.chaptersid": id });
}

/****************************************************************************/
/*                              Remove a partner                            */
/****************************************************************************/
function remove(id) {
  return db("partners")
    .where({ id })
    .del();
}

/****************************************************************************/
/*                              add a partner                            */
/****************************************************************************/

function addPartner(partner) {
  const value = db("partners").insert(partner, "id");

  return value;
}

/****************************************************************************/
/*                              update a partner                            */
/****************************************************************************/

function updatePartner(id, changes) {
  return db("partners")
    .where({ id })
    .update(changes);
}
