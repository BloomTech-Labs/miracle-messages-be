const dB = require('../config/dbConfig')

module.exports = {
    removeChapterPartner,
}

function removeChapterPartner(id) {
    return dB('chapters_partners')
        .where({"partnersid": id})
        .del()
}