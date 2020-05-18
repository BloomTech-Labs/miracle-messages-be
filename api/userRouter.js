const express = require("express");
const router = express.Router();
const users = require("../models/users-model.js");




router.post("/login", async (req, res) => {
    try{
        const user = await users.findById({oktaid: req.body._embedded.user.id})
        if(user){ res.status(200).json(user)} 
        else {
            const newUser = {};
            newUser.oktaid = req.body._embedded.user.id;
            newUser.email = req.body._embedded.profile.login;
            newUser.fname = req.body._embedded.profile.firstName;
            newUser.lname = req.body._embedded.profile.lastName;
            users.add(newUser)
            .then(user => { 
                console.log("user after add", user)

                res.status(201).json({"welcome user": user})})
            .catch(err => res.status(400).json({"error message": err}))
             }
    }
    catch(err){
        res.status(400).json({"error message": err})
    }
 })



 module.exports = router