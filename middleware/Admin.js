const cvDB = require("../models/chapters-volunteers-model")



async function adminCheck(req, res, next){
    const groups = req.jwt.claims.groups
    const chapterId = req.params.id
    const oktaId = req.userInfo.sub
    const volunteer = await cvDB.getSpecificChapterVolunteer(oktaId, chapterId)
    if(!volunteer){
       
        res.status(401).json({"Error":"User Does not exist"})
    }
    if(groups.includes("Admins") && volunteer.isAdmin ){
        next()
    }else {
    res.status(401).json({"Error":"User logged in must be an admin"})
    }

    
};


module.exports = adminCheck;