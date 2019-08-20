const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const partnersDb = require("../models/partners-model.js");
const chaptersPartnersDb = require("../models/chapters-partners-model.js");

const aws_link =
  "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/";

/****************************************************************************/
/*                 Get all partners 
/****************************************************************************/
router.get("/", async (req, res) => {
  try {
    const partners = await partnersDb.find();
    res.status(200).json(partners);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding partners data" });
  }
});
/****************************************************************************/
/*                 Get all partners of a specific chapter                   */
/****************************************************************************/
router.get("/:id", async (req, res) => {
  const chapterId = req.params.id;
  try {
    const partners = await partnersDb.findById(chapterId);
    res.status(200).json(partners);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding partners data" });
  }
});

/****************************************************************************/
/*      Delete a partner - will also also delete it from each chapter       */
/****************************************************************************/
router.delete("/:id", async (req, res) => {
  const partnerId = req.params.id;
  let numChapters;

  //Need to validate that partner id exists.//////////////////////////

  // Delete all chapter relationships with this partner
  try {
    numChapters = await chaptersPartnersDb.removeChapterPartner(partnerId);
  } catch {
    res.status(500).json({
      "error message":
        "There is a problem removing this partner from all chapters"
    });
  }

  //Delete the partner from database
  try {
    const numPartners = await partnersDb.remove(partnerId);
    res.status(200).json({
      partners: `${numPartners} partner deleted`,
      chapters: `this partner removed from ${numChapters} chapters`
    });
  } catch {
    res
      .status(500)
      .json({ "error message": "There is a problem removing this partner" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPartner = await req.body;

    console.log(newPartner);

    if (req.files && req.files.partner_icon) {
      //grabbing the partner icon from req.files
      const { partner_icon } = await req.files;

      //first we upload the icon to AWS and make sure it succeeds:
      try {
        uploadToS3(partner_icon, res);
      } catch (error) {
        res
          .status(500)
          .json({ error: "error uploading the partner_icon to AWS" });
      }

      // next we build the partner icon url that will get stored in the database:
      const partnerIconName = await req.files.partner_icon.name;
      // remove & replace special characters to make it URL compatible:
      const encodedpartnerIconName = encodeURI(partnerIconName);

      //add the icon url to the newPartner object:
      newPartner.icon_url = aws_link + encodedpartnerIconName;
      console.log(newPartner);
    }

    //finally, we add the newPartner object to the database:

    const partnerId = await partnersDb.addPartner(newPartner);
    res.status(201).json(partnerId);
  } catch (error) {
    res.status(500).json({ error: "error adding to the database" });
  }
});



module.exports = router;
