const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Volunteers = require("../../models/form-model.js");

describe("volunteers model", () => {
  beforeEach(async () => {
    await db("volunteers");
  });

  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/api/form");
      expect(res.status).toBe(200);
    });

    it("should return json type", async () => {
      const res = await request(server).get("/api/form");
      expect(res.type).toBe("application/json");
    });

    it('should insert volunteers into the db', async () => {
      await Volunteers.addVolunteer(({ fname: 'John',
      lname: 'Smith',
      email: 'john@smith456.com',
      phone: '+14802658966',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      comment: 'No comment'
      }));
      await Volunteers.addVolunteer({ fname: 'John2',
      lname: 'Smith',
      email: 'john@smith789.com',
      phone: '+14802658966',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      comment: 'No comment' });

      const volunteers = await db('volunteers')

       expect(volunteers).toHaveLength(2);
       expect(volunteers[0].location).toBe('San Antonio, TX');
       
   });
})
})
