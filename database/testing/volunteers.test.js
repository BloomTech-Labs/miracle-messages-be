// const request = require("supertest");
// const server = require("../../server");

// const db = require("../../config/dbConfig.js");
// const VolunteersTwo = require("../../models/volunteer-model.js");

// // Clears out volunteers database
// afterAll(async () => {
//   await db.raw(`TRUNCATE TABLE volunteers RESTART IDENTITY CASCADE`);
// });

// describe("volunteersRouter endpoint testing", () => {
//   test("should return 200", async () => {
//     const res = await request(server).get("/api/volunteer");
//     expect(res.status).toBe(200);
//   });

//   test("should return json type", async () => {
//     const res = await request(server).get("/api/volunteer");
//     expect(res.type).toBe("application/json");
//   });

//   test("POST / should add a volunteer", () => {
//     return request(server)
//       .post("/api/volunteer")
//       .send({
//         fname: "Lee",
//         lname: "Lee-test",
//         email: "john@smith.com",
//         city: "Los Angeles",
//         state: "CA",
//         country: "United States",
//       })
//       .then((res) => {
//         expect(res.status).toBe(201);
//       });
//   });

//   test("PUT / should update newly created volunteer", () => {
//     return request(server)
//       .put("/api/volunteer/:id")
//       .send({ city: "New Orleans" })
//       .then((res) => {
//         expect(res.status).toBe(500);
//       });
//   });
// });

// describe("volunteers model", () => {
//   describe("POST Volunteer /", () => {
//     it("should insert volunteers into the db", async () => {
//       await VolunteersTwo.add({
//         fname: "John2",
//         lname: "Smith",
//         email: "jsmith@.com",
//         city: "Los Angeles",
//         state: "CA",
//         country: "United States",
//       });
//       await VolunteersTwo.add({
//         fname: "John",
//         lname: "Smith",
//         email: "johnsmith@.com",
//         city: "Los Angeles",
//         state: "CA",
//         country: "United States",
//       });

//       const volunteers = await db("volunteers");

//       expect(volunteers).toHaveLength(3);
//       expect(volunteers[0].fname).toBe("Lee");
//       expect(volunteers[0].lname).not.toBe("Jones");
//       expect(volunteers[0].email).toContain("com");
//       expect(volunteers[1].email).toContain("@");
//       expect(volunteers[1].state).toBe("CA");
//       expect(volunteers[1].country).not.toBe("Canada");
//     });
//   });
// });

// describe("UPDATE Volunteer /", () => {
//   test("should update a volunteer in the db", async () => {
//     await VolunteersTwo.updateVolunteer(1, {
//       fname: "Richard",
//       lname: "Lovelace",
//       email: "greyflanel@.com",
//       city: "San Antonio",
//       state: "TX",
//       country: "United States",
//     });
//     await VolunteersTwo.updateVolunteer(2, {
//       fname: "Ron",
//       lname: "Smith",
//       email: "1067703@.com",
//       city: "Norfolk",
//       state: "VA",
//       country: "United States",
//     });

//     const volunteers = await db("volunteers");
//     // console.log(volunteers);

//     expect(volunteers).toHaveLength(3);
//     expect(volunteers[0].fname).toEqual("John");
//     expect(volunteers[1].email).toContain("@");
//     expect(volunteers[0].city).toBe("Los Angeles");
//     expect(volunteers[1].state).toBe("TX");
//     expect(volunteers[0].lname).not.toBe("Jones");
//   });
// });

// describe("DELETE Volunteer /", () => {
//   test("should delete a volunteer in the db", async () => {
//     await VolunteersTwo.deleteVolunteer(1);

//     const volunteers = await db("volunteers");

//     expect(volunteers).toHaveLength(2);
//   });
// });
