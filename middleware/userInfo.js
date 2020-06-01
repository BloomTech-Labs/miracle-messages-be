const Axios = require ("axios")




function userInfo (req,res,next) {
    const config = {headers: {Authorization: "Bearer " + req.accessToken}}
    Axios.get("https://dev-750287.okta.com/oauth2/default/v1/userinfo", config)
    .then(res => {
        // console.log(res.data)
        req.userInfo = res.data
        next()
    })
    .catch(error => {
        console.log(error, "error")
        next(error)
    })
}


module.exports = userInfo;