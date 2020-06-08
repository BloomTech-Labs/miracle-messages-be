const cvDB = require("../models/chapters-volunteers-model")

async function adminCheck(req, res, next){
   
    const groups = req.jwt.claims.groups
    const chapterId = req.params.chapterid
    const oktaId = req.userInfo.sub
      
    if(groups.includes("CEO")){
        next()
    } else if(groups.includes("Admins") && !chapterId){
        next()
    } else if (groups.includes("Admins") && chapterId) {
        const volunteer = await cvDB.getSpecificChapterVolunteer(oktaId, chapterId)
        if(!volunteer){
            res.status(401).json({"Error":"User Does not exist"})
        } else if(volunteer.isAdmin ){
            next()
        }else {
        res.status(401).json({"Error":"User logged in must be an admin"})
        }
    }else {
        res.status(401).json({"Error":"User logged in must be an admin"})
    } 
};

module.exports = adminCheck;