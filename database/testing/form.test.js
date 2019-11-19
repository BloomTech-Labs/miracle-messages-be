const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const VolunteersTwo = require("../../models/volunteer-model.js");
const InterestsTwo = require("../../models/volunteer-model.js");

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
  describe("POST Volunteer /", () => {
    beforeEach(async () => {
      await db.raw(`TRUNCATE TABLE volunteers RESTART IDENTITY CASCADE`);
    });

    it("should insert volunteers into the db", async () => {
      await VolunteersTwo.add({
        fname: "John2",
        lname: "Smith",
        email: "jsmith@.com",
        password: "password",
        phone: "+14802658966",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        comment: "No comment"
      });
      await VolunteersTwo.add({
        fname: "John",
        lname: "Smith",
        email: "johnsmith@.com",
        password: "password",
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
      expect(volunteers[0].email).toContain("com");
      expect(volunteers[1].email).toContain("@");
      expect(volunteers[1].phone).toContain("0");
      expect(volunteers[1].state).toBe("CA");
      expect(volunteers[1].country).not.toBe("Canada");
    });
  });
});

describe("UPDATE Volunteer /", () => {
  it("should update a volunteer in the db", async () => {
    await VolunteersTwo.updateVolunteer(1, {
      fname: "Richard",
      lname: "Lovelace",
      password: "password",
      email: "greyflanel@.com",
      phone: "+14802658966",
      city: "San Antonio",
      state: "TX",
      country: "United States",
      comment: "I got a comment"
    });
    await VolunteersTwo.updateVolunteer(2, {
      fname: "Ron",
      lname: "Smith",
      password: "password",
      email: "1067703@.com",
      phone: "+14802658966",
      city: "Norfolk",
      state: "VA",
      country: "United States",
      comment: "Wasn't me"
    });

    const volunteers = await db("volunteers");
    console.log(volunteers);

    expect(volunteers).toHaveLength(2);
    expect(volunteers[0].fname).toEqual("Richard");
    expect(volunteers[1].email).toContain("@");
    expect(volunteers[0].city).toBe("San Antonio");
    expect(volunteers[1].comment).toContain("W");
    expect(volunteers[1].phone).not.toContain("7");
    expect(volunteers[1].state).toBe("VA");
    expect(volunteers[0].lname).not.toBe("Jones");
  });
});

describe("POST Interests /", () => {
  it("should insert interests into the db", async () => {
    await InterestsTwo.addInterests({
      volunteersid: 1,
      volunteering: true,
      donating: true,
      joinmm: false,
      mediacoverage: false,
      somethingelse: "Hello"
    });

    await InterestsTwo.addInterests({
      volunteersid: 2,
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

describe("UPDATE Interest /", () => {
  it("should update an interest in the db", async () => {
    await InterestsTwo.updateInterest(1, {
      volunteersid: 1,
      volunteering: false,
      donating: false,
      joinmm: true,
      mediacoverage: true,
      somethingelse: "What's the frequency Kenneth?"
    });

    await InterestsTwo.addInterests(2, {
      volunteersid: 2,
      volunteering: false,
      donating: false,
      joinmm: false,
      mediacoverage: false,
      somethingelse: "Not again!!!!!"
    });

    const interests = await db("interests");

    expect(interests).toHaveLength(2);
    expect(interests[0].donating).not.toBe(false);
    expect(interests[0].somethingelse).not.toContain("Hello");
    expect(interests[0].mediacoverage).toBe(true);
    expect(interests[0].volunteering).not.toBe(false);
    expect(interests[1].mediacoverage).toBe(true);
    expect(interests[1].somethingelse).not.toContain("World");
    expect(interests[1].joinmm).toBe(true);
  });
});

describe("DELETE Volunteer /", () => {
  it("should delete a volunteer in the db", async () => {
    await VolunteersTwo.deleteVolunteer(1);

    const volunteers = await db("volunteers");

    expect(volunteers).toHaveLength(1);
  });
});
