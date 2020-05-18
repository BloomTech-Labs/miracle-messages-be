const express = require("express");
const router = express.Router();
const users = require("../models/users-model.js");



//Endpoint to check if user has already been registered in the database upon login
//if user currently doesnt exist it will add them to the db 
router.post("/login", async (req, res) => {
    try{
        //checks if use has previously logged in via oktaid 
        const user = await users.findById({oktaid: req.body._embedded.user.id})
        //if user is found it will return the user
        if(user){ res.status(200).json(user)} 
        //if user is not found it will submit them to the db
        else {
            //deconstructing the request for submission
            const newUser = {};
            newUser.oktaid = req.body._embedded.user.id;
            newUser.email = req.body._embedded.profile.login;
            newUser.fname = req.body._embedded.profile.firstName;
            newUser.lname = req.body._embedded.profile.lastName;

            //submits the new user, and returns their info
            users.add(newUser)
            .then(user => res.status(201).json({"Welcome User": user}))
            .catch(err => res.status(400).json({"Error Message": err}))
            }
    }
    catch(err){
        res.status(400).json({"error message": err})
    }
 })


 router.put("/update", async (req, res) => {
     const update = req.body
     const user = await users.findById({oktaid: req.body.oktaid})
     if(user){
        console.log("user",user)
        console.log("update",update)
        if(update.city || update.state || update.country|| update.profile_img_url){
            users.updateUser(update, user, user.oktaid).then(updated => {
                res.status(201).json(updated)
            }).catch(err => res.status(401).json({"Error on update": err}))
        } else {
            res.status(400).json({"Error": "Please provide something to update"})
        }
     } else {
         res.status(400).json({"Error": "No User found with matching id"})
     }
 })



 module.exports = router