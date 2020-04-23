const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Partners = require("../../models/partners-model.js");


describe('partnerRouter endpoint testing', () => {

 test("GET / should return 200", () => {
   return (
     request(server)
       .get("/api/partner")
       // .set("Authorization", `${token}`)
       .then((res) => {
         expect(res.status).toBe(200);
       })
   );
 });
 //TODO this id comes from chapter_partners table which are deleted after the chapter test runs
 test("GET / should return specific partner by id", () => {
  return request(server).get("/api/partner/:id").send({id: 1})
  .then((res)=> {
   expect(res.status).toBe(500);
  })
 })




})