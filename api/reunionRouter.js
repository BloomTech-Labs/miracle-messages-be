const express = require("express");
const router = express.Router();
const reunionDB = require("../models/reunion-model.js");
const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo")
const adminCheck = require("../middleware/Admin")
const axios = require("axios")
const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";


//Get all reunions 
router.get("/", async (req, res) => {
  try {
    const reunions = await reunionDB.find();
    res.status(200).json(reunions);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "There is a problem finding partners data" });
  }
});

router.get("/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  try {
    const reunions = await reunionDB.findByChapterId(chapterId);
    res.status(200).json(reunions);
  } catch (error) {
    res.status(500).json({ "Error": "Error getting the reunions", error });
  }
});



router.get("/specific/:id", async (req,res)=> {
  const reunionId = req.params.id
  try {
    const reunion = await reunionDB.findById(reunionId)
    res.status(200).json(reunion);
  } catch (error) {
    res.status(500).json({ "Error": "Error retrieving pending reunions", error})
  }
})


router.post("/:chapterid", authenticationRequired, userInfo, async (req, res) => {
  const newReunion = req.body
  newReunion.chapterid = req.params.chapterid
  newReunion.volunteersid = req.userInfo.sub


const reunionCoordinates = await axios
  .get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${newReunion.city},${newReunion.state}.json?access_token=${process.env.MAPBOX_API}`
  )
  .then((res) => {
    return res.data.features[0].geometry.coordinates;
  })
  .catch((err) => {
    console.log("could not get lat & lng from mapbox", err);
  });

newReunion.latitude = reunionCoordinates[1];
newReunion.longitude = reunionCoordinates[0];

if (req.files && req.files.reunion_img) {
  const { reunion_img }  = await req.files;

  try {
    uploadToS3(reunion_img, res);
  } catch (error) {
    res.status(500).json({ error: "error uploading the image to AWS" });
  }

  // storing the reunion image url in the newChapter object:
  const reunionImgName = await req.files.reunion_img.name;
  const encodedReunionImgName = encodeURI(reunionImgName);
  newReunion.reunion_img = aws_link + encodedReunionImgName;
}
  try {
    console.log("owo")
    const id = await reunionDB.addReunion(newReunion);

    res.status(200).json(id);
  } catch (error) {
    console.log('error',error)
    res
      .status(500)
      .json({ errorMessage: "error submitting reunion to the chapter", error });
  }
});





router.put("/:id",authenticationRequired, userInfo, adminCheck, async (req, res) => {
  try {
    const updatedReunion = req.body;
    const current = await reunionDB.findById(req.params.id)
    if(updatedReunion.city && updatedReunion.state) {
      const reunionCoordinates = await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${updatedReunion.city},${updatedReunion.state}.json?access_token=${process.env.MAPBOX_API}`
    )
    .then((res) => {
      return res.data.features[0].geometry.coordinates;
    })
    .catch((err) => {
      console.log("could not get lat & lng from mapbox", err)
      res.status(500).json({"Error": "could not get lat & lng from mapbox", err})
    });
      
      updatedReunion.latitude = reunionCoordinates[1];
      updatedReunion.longitude = reunionCoordinates[0];
    }

    if (req.files && req.files.reunion_img) {
      const  { reunion_img }  = await req.files;
      try {
        uploadToS3(reunion_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }
      const reunionImgName = await req.files.reunion_img.name;
      const encodedReunionImgName = encodeURI(reunionImgName);
      updatedReunion.reunion_img = aws_link + encodedReunionImgName;
    }
   
    if(updatedReunion.longitude 
      || updatedReunion.title 
      || updatedReunion.reunion_img 
      || updatedReunion.title 
      || updatedReunion.story 
      || updatedReunion.link_to_media){
      
      const reunion = await reunionDB.updateReunion(
          req.params.id,
          updatedReunion,
          current
        )
        res.status(200).json(reunion);
      }
    else {
      res.status(401).json({"Error": "Please Submit something to change"})
    }
  } catch (error) {
    res.status(500).json({
      "Message": "Error updating the reunion",
      error
    });
  }

});


router.delete("/:id",authenticationRequired, userInfo, adminCheck, async (req, res) => {
  const  reunionId  = req.params.id
 
    const reunionSpecified = await reunionDB.findById(reunionId)
    if(reunionSpecified){
      reunionDB.remove(reunionId)
      .then(del => {res.status(201).json({"Message":"Reunion Successfully Deleted"})})
      .catch(err => {
        res.status(500).json({"Error": "Something went wrong", err})
      })
    } else {
      res.status(401).json({"Error":"Reunion doesn't exist to delete"})
    }
  
} )

module.exports = router;
