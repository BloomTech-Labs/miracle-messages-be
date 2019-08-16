const db = require('../config/dbConfig.js');

module. exports = {
    find
}

function find(chapterId) {
    console.log("in Model");
    return db.select('partners.name', 'partners.site_url', 'partners.icon_url')
        .from ('chapters_partners')
        .innerJoin('partners', 'chapters_partners.partnersid', 'partners.id')
        .where({ "chapters_partners.chaptersid": chapterId})
}