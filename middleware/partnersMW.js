const db = require('../config/dbConfig.js')

module.exports = {
    validatePartnerId,
}


/****************************************************************************/
/*                        Verify that partner Id exists                     */
/****************************************************************************/
async function validatePartnerId(req, res, next) {
    const id = req.params.id;
    try {
        const records = await db('partners').where({id});
        if(records.length > 0)
            next();
        else {
            res.status(404).json({errorMessage: "Partner Id does  not exist"})
        }
    }
    catch {
        res.status(500).json({errorMessage: "There was a problem looking up partner id"})
    }
}

