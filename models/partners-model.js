const db = require('../config/dbConfig.js');

module.exports = {
    find,
    remove,
}

/****************************************************************************/
/*                        Find all partners of a chapter                    */
/****************************************************************************/
function find(id) {
    console.log(id)
    return db.select('partners.name', 'partners.site_url', 'partners.icon_url')
        .from ('chapters_partners')
        .innerJoin('partners', 'chapters_partners.partnersid', 'partners.id')
        .where({'chapters_partners.chaptersid': id})
}

/****************************************************************************/
/*                              Remove a partner                            */
/****************************************************************************/
function remove(id) {
    return db('partners')
        .where({id})
        .del();
}