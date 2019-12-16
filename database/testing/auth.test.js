const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Chapters = require("../../models/chapters-model.js");
const Volunteers = require("../../models/volunteer-model.js");

let token; //Global Variable token to be used all over test

beforeAll(done => {
  //register a volunteer
  request(server)
    .post("/api/volunteer/register")
    .set("Content-Type", "application/json")
    .send({
      fname: "John2",
      lname: "Smith",
      email: "jsmith@.com",
      password: "password",
      phone: "+14802658966",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      comment: "No comment",
      volunteering: true,
      donating: true,
      joinmm: false,
      mediacoverage: false,
      somethingelse: "Hello"
    })
    .end((err, res) => {
      request(server)
        .post("/api/volunteer/login")
        .set("Content-Type", "application/json")
        .send({
          email: "jsmith@.com",
          password: "password"
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });
  //Logging in with the volunteer credentials above
});

//Clears out volunteers database
afterAll(async () => {
  await db.raw(`TRUNCATE TABLE volunteers RESTART IDENTITY CASCADE`);
});

//Tests for authentication
describe("GET /", () => {
  //Checks an authenticated route '/api/chapter'
  // token not being sent - should respond with a 401
  test("It should require authorization", () => {
    return request(server)
      .get("/api/chapter")
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token to protected route - should respond with a 200
  test("It responds with JSON", () => {
    return request(server)
      .get("/api/chapter")
      .set("Authorization", `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});
