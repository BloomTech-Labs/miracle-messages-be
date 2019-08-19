const express = require('express');
const router = express.Router();

const partnersDb = require('../models/partners-model.js')
const chaptersPartnersDb = require('../models/chapters-partners-model.js')


/****************************************************************************/
/*                 Get all partners of a specific chapter                   */
/****************************************************************************/
router.get('/:id', async (req,res) => {
    const chapterId = req.params.id;
    try {
        const partners = await partnersDb.find(chapterId);
        res.status(200).json(partners)
    }
    catch {
        res.status(500).json({errorMessage: "There is a problem finding partners data"})
    }

})

/****************************************************************************/
/*      Delete a partner - will also also delete it from each chapter     */
/****************************************************************************/
// router.delete('/:id', async (req, res) => {
//     partnerId = req.params.id;
//     let numChapters;

//     console.log('partner id: ',partnerId);
//     res.sendStatus(200);

//     //Need to validate that partner id exists.

//     // // Delete all chapter relationships with this partner
//     // try {
//     //     numChapters = await chaptersPartnersDb.removeChapterPartner(partnerId);
//     // }
//     // catch {
//     //     res.status(500).json({"error message": "There is a problem removing this partner from all chapters"})
//     // }

//     // // Delete the partner from database
//     // try {
//     //     const numPartners = await partnersdB.remove(partnerId);
//     //     res(200).json({partners: `${numPartners} partner deleted`, chapters:`partner removed from ${numChapters} chapters` })
//     // }
//     // catch {
//     //     res.status(500).json({"error message": "There is a problem removing this partner"})
//     // }
// })

// router.delete("/delete/:id", async (req, res) => {
//     res.sendStatus(200)
//     // try {
//     //   const count = await formDB.deleteInterests(req.params.id);
//     //   const count2 = await formDB.deleteVolunteer(req.params.id);
  
//     //   if (count2 > 0 && count > 0) {
//     //     res.status(200).json({ message: "The volunteer has been removed" });
//     //   } else {
//     //     res.status(404).json({ message: "The volunteer could not be found" });
//     //   }
//     // } catch (error) {
//     //   res.status(500).json({
//     //     message: "Error removing the hub"
//     //   });
//     // }
//   });



module.exports = router;