const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Volunteers = require("../../models/form-model.js");
const Interests = require("../../models/form-model.js");

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/api/form");
    expect(res.status).toBe(200);
  });

  it("should return json type", async () => {
    const res = await request(server).get("/api/form");
    expect(res.type).toBe("application/json");
  });
});

describe("volunteers model", () => {
  beforeEach(async () => {
    await db("volunteers").del();
  });

  describe("POST /", () => {
    it("should insert volunteers into the db", async () => {
      await Volunteers.addVolunteer({
        id: 0,
        fname: "John2",
        lname: "Smith",
        email: "jsmith@.com",
        phone: "+14802658966",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        comment: "No comment"
      });
      await Volunteers.addVolunteer({
        
        id: 1,
        fname: "John",
        lname: "Smith",
        email: "johnsmith@.com",
        phone: "+14802658966",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        comment: "No comment"
      });
      const volunteers = await db("volunteers");

      expect(volunteers).toHaveLength(2);
      expect(volunteers[0].fname).toBe("John2");
      expect(volunteers[0].lname).not.toBe("Jones");
      expect(volunteers[0].email).toContain("com")
      expect(volunteers[1].email).toContain("@");
      expect(volunteers[1].phone).toContain("0");
      expect(volunteers[1].state).toBe("CA");
      expect(volunteers[1].country).not.toBe("Canada");
    });
  });
});



  describe("POST /", () => {
    it("should insert interests into the db", async () => {
      await Interests.addInterests({
        volunteersid: 0,
        volunteering: true,
        donating: true,
        joinmm: false,
        mediacoverage: false,
        somethingelse: "Hello"
      });

      
        await Interests.addInterests({
          volunteersid: 1,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: true,
          somethingelse: "World"
        });

      const interests = await db("interests");

      expect(interests).toHaveLength(2);
      expect(interests[0].donating).toBe(true);
      expect(interests[0].somethingelse).toContain("Hello");
      expect(interests[0].mediacoverage).toBe(false);
      expect(interests[0].volunteering).not.toBe(false);
      expect(interests[1].mediacoverage).toBe(true);
      expect(interests[1].somethingelse).toContain("World");
      expect(interests[1].joinmm).toBe(false);
    });
  });
  
  
  
