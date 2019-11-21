const express = require("express")
const router = express.Router(); 

const Volunteer = require("../models/volunteer-model.js"); 

// To find the req.body of id and email to make sure that the email exists in the database 
router.get("/email", (req, res) => {
    // const { id } = req.body;
    const email  = req.body;

    Volunteer.findBy({email})
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
router.put("/", (req, res) => {

})

module.exports = router; 