const db = require("../config/dbConfig.js");

module.exports = {
  find,
  findById,
  remove,
  addPartner
};

/****************************************************************************/
/*                        Find all partners                    */
/****************************************************************************/
function find() {
  return db("partners");
}

/****************************************************************************/
/*                        Find all partners of a chapter                    */
/****************************************************************************/
function findById(id) {
  console.log(id);
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
