const request = require("supertest");
const server = require("../../server");


describe("reunionRouter endpoint testing", () => {
  test("GET / should return 200", () => {
    return (
      request(server)
        .get("/api/reunion")
        .then((res) => {
          expect(res.status).toBe(200);
        })
    );
  });
  test("GET / should return a list of reunions", () => {
      return(
          request(server)
          .get("/api/reunion")
          .then((res) => {
              expect(res.body.length).toBe(4)
          })
    );
  })
})
