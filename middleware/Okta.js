const OktaJwtVerifier = require("@okta/jwt-verifier");

// Pulls from {okta}
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.CLIENT_ID,
  scope: ["groups"],
  assertClaims: {
    aud: "api://default"
  }
});

// Authenticates access token
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const match = authHeader.match(/Bearer (.+)/);
  // console.log(authHeader, match)
  if (!match) { return res.status(401).json({"error": "there was no match"}); }

  const accessToken = match[1];
  const expectedAudience = "api://default";
  req.accessToken= accessToken
// console.log(accessToken)
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then(jwt => {
      console.log(jwt)
      // console.log(req.accessToken)
      req.jwt = jwt;
      // console.log("token is valid")
      next();
    })
    .catch(err => {
      // console.warn("token failed validation")
      res.status(401).json({"error": "something went wrong", err});
    });
}

module.exports = authenticationRequired;