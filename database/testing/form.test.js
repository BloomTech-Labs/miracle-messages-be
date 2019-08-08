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
})
})
