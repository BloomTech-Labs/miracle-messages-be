const Axios = require("axios")




function userInfo (req,res,next) {
        console.log("hello")
    const config = {headers: {Authorization: "Bearer " + req.accessToken}}
    Axios.get("https://dev-750287.okta.com/oauth2/default/v1/userinfo", config)
    .then(res => {
        
        req.userInfo = res.data

        
        next()
    })
    .catch(error => {
        res.status(401).json({"Error":"Cannot Validate user", error})
    })
}


module.exports = userInfo;