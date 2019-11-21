const express = require("express")
const router = express.Router(); 
const bcrypt = require('bcryptjs');

const Volunteer = require("../models/volunteer-model.js"); 

// To find the req.body of id and email to make sure that the email exists in the database 
// This works 
router.get("/getvolrunteer", (req, res) => {
    const email  = req.body;

    Volunteer.findBy(email)
    .then(mail => {
        if(email) {
            res.status(200).json(mail)
        } else {
            res.status(204).json("No content", mail)
        }
    })
    .catch(error => {
        console.log("Catch", error)
        res.status(500).json(error)
    })
})


// To replace volunteers old password with new one 
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const body  = req.body;
    
        Volunteer.updateVolunteer(id, body)
        .then(mail => {
            res.status(200).json(mail)
        })
        .catch(error => {
            res.status(500).json({message: "Internal Server Error", error})
    })
})

        // Please work!  
        // ajsdflk;asjd;flkasjdklfjasl;kdfjkals;df
        // al;ksjdfaklsdjf
            

module.exports = router; 