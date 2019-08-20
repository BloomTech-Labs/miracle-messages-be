const dB = require('../config/dbConfig')

module.exports = {
    removeChapterPartner,
}

/****************************************************************************/
/*                      Remove all partners of a chapter                    */
/****************************************************************************/
function removeChapterPartner(id) {
    return dB('chapters_partners')
        .where({"partnersid": id})
        .del()
}

