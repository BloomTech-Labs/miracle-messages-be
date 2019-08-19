const db = require('../config/dbConfig.js');

module.exports = {
    find,
    remove,
}

function find(id) {
    return db.select('partners.name', 'partners.site_url', 'partners.icon_url')
        .from ('chapters_partners')
        .innerJoin('partners', 'chapters_partners.partnersid', 'partners.id')
        .where({id})
}

function remove(id) {
    return db('partners')
        .where({id})
        .del();
}