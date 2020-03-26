const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const MW = require("../middleware/partnersMW");
const partnersDb = require("../models/partners-model.js");
const chaptersPartnersDb = require("../models/chapters-partners-model.js");
const authenticated = require("../auth/restricted-middleware");
const authenticationRequired = require("../middleware/Okta");
// this link below is to specify the AWS S3 BUCKET where our images will live:

const aws_link =
  "https://miraclemessagesimages.s3.amazonaws.com/";

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
/*                 Get all partners of one specific chapter                 */
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
router.delete("/:id", authenticationRequired, MW.validatePartnerId, async (req, res) => {
  const partnerId = req.params.id;
  let numChapters;

  // Delete all chapter relationships with this partner
  try {
    numChapters = await chaptersPartnersDb.removePartnerChapter(partnerId);
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

/****************************************************************************/
/*      ADD A PARNTER ORGANIZATION TO THE DATABASE
/****************************************************************************/
//TODO POST Requires an image/Need to re-visit: AWS 
router.post("/", authenticationRequired, MW.verifyPartnerData, async (req, res) => {
  const newPartner = req.body;
  const { partner_icon } = req.files;

  //first we upload the icon to AWS and make sure it succeeds:
  try {
    uploadToS3(partner_icon, res);
  } catch (error) {
    res.status(500).json({ error: "error uploading the partner_icon to AWS" });
  }

  // next we build the partner icon url that will get stored in the database:
  const partnerIconName = req.files.partner_icon.name;
  // remove & replace special characters to make it URL compatible:
  const encodedpartnerIconName = encodeURI(partnerIconName);

  //add the icon url to the newPartner object:
  newPartner.icon_url = aws_link + encodedpartnerIconName;

  //finally, we add the newPartner object to the database:
  try {
    const partnerId = await partnersDb.addPartner(newPartner);
    res.status(201).json(partnerId);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There was a problem adding partner to database" });
  }
});

/****************************************************************************/
/*     UPDATE A PARTNER ORGANIZATION IN THE DATABASE                        */
/****************************************************************************/
//TODO Remove requirement for file upload in order to update partner
router.put("/:id", authenticationRequired, MW.verifyPartnerImgFilename, async (req, res) => {
  try {
    const changes = await req.body;
    const id = req.params.id;

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
      changes.icon_url = aws_link + encodedpartnerIconName;
    }

    //finally, we add the newPartner object to the database:

    const partner = await partnersDb.updatePartner(id, changes);

    res.status(201).json(partner);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error updating the new partner to the database" });
  }
});

module.exports = router;
