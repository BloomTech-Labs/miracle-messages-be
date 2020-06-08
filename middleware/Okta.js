const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.CLIENT_ID,
  scope: ["groups"],
  assertClaims: {
    aud: "api://default"
  }
});

function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const match = authHeader.match(/Bearer (.+)/);
  if (!match) { return res.status(401).json({"error": "there was no match"}); }

  const accessToken = match[1];
  const expectedAudience = "api://default";
  req.accessToken= accessToken
 
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then(jwt => {
  
      req.jwt = jwt;
   
      next();
    })
    .catch(err => {
      res.status(401).json({"error": "something went wrong", err});
    });
}

module.exports = authenticationRequired;