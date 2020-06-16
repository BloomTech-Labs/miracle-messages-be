const express = require("express");
const router = express.Router();
const users = require("../models/users-model.js");
const cvDB = require("../models/chapters-volunteers-model");
const aws_link = "https://miraclemessagesimages.s3.amazonaws.com/";
const uploadToS3 = require("../middleware/uploadToS3.js");
const authenticationRequired = require("../middleware/Okta");
const userInfo = require("../middleware/userInfo");
const adminCheck = require("../middleware/Admin");

//gets user that's logged in
router.get("/", authenticationRequired, userInfo, (req, res) => {
  const oktaid = req.userInfo.sub;
  if (oktaid) {
    users
      .getUsers({ oktaid: oktaid })
      .then(async (user) => {
        user.leaderOf = await cvDB.findLeaderOf(oktaid);
        console.log(user.leaderOf);
        res.status(200).json(user);
      })
      .catch((err) => res.status(201).json({ "Error Message": err }));
  } else {
    res
      .status(401)
      .json({ "Error Message": "Must submit an okta id to get user info" });
  }
});

// retreives a list of all users if the okta id is whitelisted as an CEO
router.get("/CEO", authenticationRequired, userInfo, adminCheck, (req, res) => {
  users
    .getUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => res.status(201).json({ "Error Message": err }));
});

//Endpoint to check if user has already been registered in the database upon login
//if user currently doesnt exist it will add them to the db
router.post("/login", authenticationRequired, userInfo, async (req, res) => {
  try {
    //checks if use has previously logged in via oktaid 1
    const user = await users.findById(req.userInfo.sub);
    //if user is found it will return the user
    if (user) {
      res.status(200).json(user);
    }
    //if user is not found it will submit them to the db
    else {
      //deconstructing the request for submission
      const newUser = {};
      newUser.oktaid = req.userInfo.sub;
      newUser.email = req.userInfo.email;
      newUser.name = req.userInfo.name;

      //submits the new user, and returns their info
      users
        .add(newUser)
        .then((user) => res.status(201).json({ "Welcome User": user }))
        .catch((err) => res.status(400).json({ "Error Message": err }));
    }
  } catch (err) {
    res.status(400).json({ "error message": err });
  }
});

// Update for logged in user
// first it finds user by their id, and stores it as a variable
// then it checks to make sure the use is submitting info thto be updated
// finally it passes the update info, found user info, and their id into the function
router.put("/update", authenticationRequired, userInfo, async (req, res) => {
  const update = req.body;
  if (req.files && req.files.profile_img) {
    const { profile_img } = await req.files;
    try {
      await uploadToS3(profile_img, res);
    } catch (error) {
      res.status(500).json({ error: "error uploading the image to AWS" });
    }
    const profileImgName = await req.files.profile_img.name;
    const encodedProfileImgName = encodeURI(profileImgName);
    update.profile_img_url = aws_link + encodedProfileImgName;
  }
  const user = await users.findById(req.userInfo.sub);
  if (user) {
    if (
      update.name ||
      update.email ||
      update.city ||
      update.state ||
      update.country ||
      update.profile_img_url
    ) {
      users
        .updateUser(update, user, user.oktaid)
        .then((updated) => {
          res.status(201).json({ user: updated });
        })
        .catch((err) => {
          console.log("error:", err);
          res.status(401).json({ "Error on update": err });
        });
    } else {
      res.status(400).json({ Error: "Please provide something to update" });
    }
  } else {
    res.status(400).json({ Error: "No User found with matching id" });
  }
});

//Finds user by their id, and then deletes them from the db. This only affects data we have stored, and not anything related to their okta
router.delete("/delete", authenticationRequired, userInfo, async (req, res) => {
  const oktaid = req.userInfo.sub;
  try {
    //finds user
    const user = await users.findById({ oktaid: oktaid });
    if (user) {
      //deletes user
      users
        .deleteUser(oktaid)
        .then((user) =>
          res
            .status(200)
            .json({
              Message:
                "User has be removed from DB, this will not change their okta account",
            })
        )
        .catch((err) =>
          res
            .status(500)
            .json({ Error: "Something went wrong deleting this user", err })
        );
    } else {
      res.status(400).json({ Error: "There is no user with this id" });
    }
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
