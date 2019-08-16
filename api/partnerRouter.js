const express = require('express');
const router = express.Router();

const partnersDb = require('../models/partners-model.js')

router.get('/:id', async (req,res) => {
    const chapterId = req.params.id;
    console.log('In Router');
    console.log(chapterId);

    try {
        const partners = await partnersDb.find(chapterId);
        res.status(200).json(partners)
    }
    catch {
        res.status(500).json({errorMessage: "There is a problem finding partners data"})
    }

})


module.exports = router;