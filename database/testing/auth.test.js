const request = require("supertest");
const server = require("../../server");

// const db = require("../../config/dbConfig.js");
// const Chapters = require("../../models/chapters-model.js");
// const Volunteers = require("../../models/volunteer-model.js");

let token; //Global Variable token to be used all over test

//TODO revisit: can use this test suite to check authenticationRequired via Okta
//Tests for authentication
describe("GET /", () => {
  //Checks an authenticated route '/api/chapter'
  // token not being sent - should respond with a 401
  test("It should not require authorization", () => {
    return request(server)
      .get("/api/chapter")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  // send the token to protected route - should respond with a 200
  test("It responds with JSON", () => {
    return request(server)
      .get("/api/chapter")
      // .set("Authorization", `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});
