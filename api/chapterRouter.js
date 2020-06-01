const express = require("express");
const router = express.Router();
const uploadToS3 = require("../middleware/uploadToS3.js");
const chapterDB = require("../models/chapters-model.js");
const reunionDB = require("../models/reunion-model");
const chaptersVolunteersDB = require("../models/chapters-volunteers-model");
const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";
const axios = require("axios");

//TODO to be implemented
const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo")
const adminCheck = require("../middleware/Admin")


// Returns: all chapters
// ✔
router.get("/", async (req, res) => {
  try {  
    let chapters = await chapterDB.findChapters(req.query);
     let newChapters = chapters.map( async (e) => {
        e.volunteers = await chaptersVolunteersDB.findChapterVolunteers(e.id)
        e.leaders = await chaptersVolunteersDB.findLeaders(e.id)
        count = await chaptersVolunteersDB.memberCount(e.id)
        e.memberCount = parseInt(count.count)
        return e
     })
  
    Promise.all(newChapters).then(values => res.status(200).json(values))
    
  } catch {
    res.status(500).json({
      error: "there was a problem getting chapter",
    });
  }
});

//see pending chapters
router.get("/pending", authenticationRequired, userInfo, adminCheck, async (req, res) => {
  try { 
    let chapters = await chapterDB.findPendingChapters();
    console.log(chapters)
    if(chapters.length >= 1) {
      res.status(200).json(chapters);
    } else {
      res.status(201).json({"Message":"There are no pending chapters at this time"})
    }
  } catch {
    res.status(500).json({
      error: "there was a problem getting chapter",
    });
  }
});


//approve pending chapter
router.put("/:id/approve", authenticationRequired, userInfo, async (req,res)=> {
  const chapterId = req.params.id
  const groups = req.jwt.claims.groups
 
  if(groups.includes("Admins")){
    const chapter = await chapterDB.findBy(chapterId)
    if(chapter.approved === false) {
      chapterDB.approveChapter(chapterId)
    .then(chapter => {
      res.status(201).json({"Message": "Chapter Successfully approved"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err, "Message": "Something went wrong and chapter could not be approved right now"})
    })
    } else {
      res.status(201).json({"Message": "Chapter was already Approved!"})
    }
    
  }
  else {
    res.status(401).json({"Error": "User must be an admin to approve chapters"})
  }

} )

//Returns: JSON a specific chapter by id
// ✔
router.get("/:id", async (req, res) => {
  const chapterId = req.params.id
  try {
    const chapter = await chapterDB.findBy(chapterId);
    res.status(200).json(chapter);
  } catch (error) { res.status(500).json({ message: "Error getting the chapter",});}
});

// Returns: Json of all volunteers related to a specific chapter
// ✔
router.get("/:id/volunteers", async (req, res) => {
  const chapterId = req.params.id;
  try {
    const volunteers = await chaptersVolunteersDB.findChapterVolunteers(chapterId);
    //Checks if there are volunteers in chapter
    // console.log(volunteers)
    if (volunteers.length < 1) { res.status(404).json({ message: "There is no volunteers in this chapter" });}
    else { res.status(200).json(volunteers); }
  } catch { res.status(500).json({ errorMessage: "There is a problem finding volunteers data" });}
});


router.get("/:id/pendingVolunteers", authenticationRequired, userInfo,  adminCheck, async (req, res) => {
  const chapterId = req.params.id;
  try {
    const volunteers = await chaptersVolunteersDB.findPendingChapterVolunteers(chapterId);
    //Checks if there are volunteers in chapter
    if (volunteers.length < 1) { res.status(404).json({ message: "There are no pending volunteers for this chapter" });}
    else { res.status(200).json(volunteers); }
  } catch { res.status(500).json({ errorMessage: "There is a problem finding volunteers data" });}
});



router.put("/:id/approveVolunteer", authenticationRequired, userInfo,  adminCheck, async (req,res)=> {
  const chapterId = req.params.id
  const oktaId = req.body.oktaId
  
    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(oktaId, chapterId)
    if(volunteer.approved === false) {
      chaptersVolunteersDB.approveVolunteer(oktaId, chapterId)
    .then(volunteer => {
      res.status(201).json({"Message": "Volunteer Successfully approved"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err, "Message": "Something went wrong and volunteer could not be approved right now"})
    })
    } else {
      res.status(201).json({"Message": "Volunteer was already Approved!"})
    }

} )


router.put("/:id/requestLeader", authenticationRequired, userInfo, async (req,res) => {
  const chapterId = req.params.id
  const oktaId = req.userInfo.sub
  
    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(oktaId, chapterId)
    if(volunteer.isAdmin === false && volunteer.approved === true) {
      chaptersVolunteersDB.requestLeader(oktaId, chapterId)
    .then(volunteer => {
      res.status(201).json({"Message": "Volunteer Successfully Requested to become leader"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err, "Message": "Something went wrong and volunteer could not make the request right now"})
    })
    } else {
      res.status(201).json({"Message": "Volunteer is either already an admin, or is not approved for this chapter"})
    }
})


router.get("/:id/pendingLeader", authenticationRequired, userInfo, adminCheck, async (req, res) => {
  const chapterId = req.params.id;
  try {
    const leaders = await chaptersVolunteersDB.findPendingChapterLeaders(chapterId);
    if (leaders.length < 1) { res.status(404).json({ message: "There are no pending chapter leaders for this chapter" });}
    else { res.status(200).json(leaders); }
  } catch { res.status(500).json({ errorMessage: "There is a problem finding volunteer data" });}
})

router.put("/:id/approveLeader",  authenticationRequired, userInfo, adminCheck, async (req, res) => {
  const chapterId = req.params.id
  const oktaId = req.body.oktaId
  
    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(oktaId, chapterId)
    if(volunteer.isAdmin === false && volunteer.requestedAdmin === true) {
      chaptersVolunteersDB.approveLeader(oktaId, chapterId)
    .then(volunteer => {
      res.status(201).json({"Message": "Volunteer is now a chapter leader"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err, "Message": "Something went wrong and volunteer could not be approved right now"})
    })
    } else {
      res.status(201).json({"Message": "Volunteer is already a leader!"})
    }

})

router.put("/:id/declineLeader",  authenticationRequired, userInfo, adminCheck, async (req, res) => {
  const chapterId = req.params.id
  const oktaId = req.body.oktaId
  
    const volunteer = await chaptersVolunteersDB.getSpecificChapterVolunteer(oktaId, chapterId)
    if(volunteer.isAdmin === false && volunteer.requestedAdmin === true) {
      chaptersVolunteersDB.declineLeader(oktaId, chapterId)
    .then(volunteer => {
      res.status(201).json({"Message": "Volunteer was declined ;-;"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err, "Message": "Something went wrong and volunteer could not be declined right now"})
    })
    } else {
      res.status(201).json({"Message": "Volunteer is either currently a chapter leader, or didn't request to become a leader"})
    }
})


// Returns: JSON of all reunions specific to a chapter 
// ✔
router.get("/:id/reunions", async (req, res) => {
  const chapterId = req.params.id;
  try {
    // console.log("chapterID on endpoint:", chapterId)
    const reunions = await reunionDB.findByChapterId(chapterId);
    res.status(200).json(reunions);
  } catch (error) {
    res.status(500).json({ message: "Error getting the chapter", error });
  }
});

// Returns a specific volunteer to a chapter
// ✔
router.get("/:id/volunteer", async (req, res) => {
  let chapterId = req.params.id;
  let oktaId = req.body.oktaid;
  try {
    const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    res.status(200).json(isVolunteerInChapter);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the chapter",
    });
  }
});

// create new chapter
// ✔
router.post("/", authenticationRequired, userInfo, async (req, res) => {
  const newChapter = req.body;
  newChapter.requestedBy = req.userInfo.sub
  // let locationData;

  // Gets the coordinates based of of city and state
  const chapterCoordinates = await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${newChapter.city},${newChapter.state}.json?access_token=${process.env.MAPBOX_API}`
    )
    .then((res) => {
      return res.data.features[0].geometry.coordinates;
    })
    .catch((err) => {
      console.log("could not get lat & lng from mapbox", err);
    });

  newChapter.latitude = chapterCoordinates[1];
  newChapter.longitude = chapterCoordinates[0];

  try {
    if (req.files && req.files.chapter_img) {
      //uploading and storing the reunion image to aws:
      const { chapter_img } = await req.files;

      try {
        uploadToS3(chapter_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }

      // storing the reunion image url in the newChapter object:
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      newChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }

    // Adds Chapter to the Database
    chapterDB
      .addChapter(newChapter)
      .then((chapter) => {
        res.status(201).json(chapter);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "failed to add new chapter", err });
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong, Please try again", error });
  }
});

// Creates new reunion connected to chapter
// ✔
router.post("/:id/reunions", authenticationRequired, userInfo, async (req, res) => {
  
  const newReunion = req.body
  newReunion.chapterid = req.params.id
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
  //uploading and storing the reunion image to aws:
  const { reunion_img } = await req.files;

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
    const id = await reunionDB.addReunion(newReunion);

    res.status(200).json(id);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "error submitting reunion to the chapter", error });
  }
});

//registers a user to a chapter to await approval
router.post("/:id/volunteer", authenticationRequired, userInfo, async (req, res) => {
  let chapterId = req.params.id;
  let oktaId = req.userInfo.sub;
  try {
    const isVolunteerInChapter = await chaptersVolunteersDB.getSpecificChapterVolunteer(
      oktaId,
      chapterId
    );
    //Checks if this volunteer is already in the chapter
    if (!isVolunteerInChapter) {
      const signedUp = await chaptersVolunteersDB.assignChapterVolunteer(
        oktaId,
        chapterId
      );

      res.status(201).json({
        message: `You have successfully signed up for this chapter.`,
        id: signedUp,
      });
    } else {
      res
        .status(400)
        .json({ message: "This volunteer is already in this chapter" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      errorMessage: "error assigning volunteer to the chapter",
      error
    });
  }
});

//update chapter info
// ✔
router.put("/:id",authenticationRequired, userInfo, adminCheck, async (req, res) => {
  try {
    const updatedChapter = req.body;
    const current = await chapterDB.findBy(req.params.id)
    if(updatedChapter.city && updatedChapter.state) {
      const chapterCoordinates = await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${updatedChapter.city},${updatedChapter.state}.json?access_token=${process.env.MAPBOX_API}`
    )
    .then((res) => {
      return res.data.features[0].geometry.coordinates;
    })
    .catch((err) => {
      console.log("could not get lat & lng from mapbox", err)
      res.status(500).json({"Error": "could not get lat & lng from mapbox", err})
    });
      
      updatedChapter.latitude = chapterCoordinates[1];
      updatedChapter.longitude = chapterCoordinates[0];
    }

    if (req.files && req.files.chapter_img) {
      //uploading and storing chapter image to aws:
      const { chapter_img } = await req.files;
      try {
        uploadToS3(chapter_img, res);
      } catch (error) {
        res.status(500).json({ error: "error uploading the image to AWS" });
      }
      // storing the chapter image url i database
      const chapterImgName = await req.files.chapter_img.name;
      const encodedChapterImgName = encodeURI(chapterImgName);
      updatedChapter.chapter_img_url = aws_link + encodedChapterImgName;
    }
   
    if(updatedChapter.longitude 
      || updatedChapter.title 
      || updatedChapter.chapter_img 
      || updatedChapter.description 
      || updatedChapter.facebook 
      || updatedChapter.email){
      
      const chapter = await chapterDB.updateChapter(
          req.params.id,
          updatedChapter,
          current
        )
        res.status(200).json(chapter);
      }
    else {
      res.status(401).json({"Error": "Please Submit something to change"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "Message": "Error updating the chapter",
      error
    });
  }

});

//update reunion
router.put("/:id/reunion",authenticationRequired, userInfo, adminCheck, async (req, res) => {
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
      const { reunion_img } = await req.files;
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
          req.body.reunionId,
          updatedReunion,
          current
        )
        res.status(200).json(reunion);
      }
    else {
      res.status(401).json({"Error": "Please Submit something to change"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "Message": "Error updating the reunion",
      error
    });
  }

});
//deletes chapter from db
router.delete("/:id", authenticationRequired, userInfo, adminCheck, (req, res) => {
    const chapterId = req.params.id;
      chapterDB.removeChapter(chapterId)
      .then( chapter => {res.status(200).json({ "Message": "Chapter successfully deleted."})})
      .catch(err => {res.status(500).json({"Error": "There was an error deleting this chapter"})})

});

//Delete a volunteer from a specific chapter 
router.delete("/:id/volunteer", authenticationRequired, adminCheck, async (req, res) => {
  const chapterId = req.params.id;
  const oktaId = req.body.oktaid;
    try {
     const count = await chaptersVolunteersDB.removeSpecificChapterVolunteer(
        oktaId,
       chapterId
     );

     res.status(200).json(count);
    } catch (error) {
     res.status(500).json({ errorMessage: "error removing volunteer" });
    }
});

//deletes a reunion registered to specified chapter
router.delete("/:id/reunion",authenticationRequired, adminCheck, async (req, res) => {
  const { reunionId } = req.body
 
    const reunionSpecified = await reunionDB.findById(reunionId)
    console.log(reunionSpecified.length)
    if(reunionSpecified.length >= 1){
      reunionDB.remove(reunionId)
      .then(del => {res.status(201).json({"Message":"Reunion Successfully Deleted"})})
      .catch(err => {
        console.log(err)
        res.status(500).json({"Error": "Something went wrong", err})
      })
    } else {
      res.status(401).json({"Error":"Reunion doesn't exist to delete"})
    }
  
} )

module.exports = router;
