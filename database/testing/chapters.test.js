const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Chapters = require("../../models/chapters-model.js");

//TODO redo once authentication is set with Okta access token
let token; //Global Variable token to be used all over test

//Clears out volunteers database
//TODO Review Later
// afterAll(async () => {
//   await db.raw(`TRUNCATE TABLE volunteers RESTART IDENTITY CASCADE`);
// });

describe("chapterRouter endpoint testing", () => {
  afterAll(async () => {
    await db("chapters").del();
    await db("chapters_partners").del();
  });

  //tests endpoints

  test("GET / should return 200", () => {
    return (
      request(server)
        .get("/api/chapter")
        // .set("Authorization", `${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
        })
    );
  });

  test("should return json type", async () => {
    const res = await request(server).get("/api/chapter");
    expect(res.type).toBe("application/json");
  });

  test("Post/ assigning partner to the chapter", async () => {
    const chapter = await db("chapters");
    expect(chapter).toHaveLength(0);
    await Chapters.addChapter({
      city: "Los Angeles",
      title: "Los Angeles",
      state: "CA",
      numvolunteers: 30,
      numreunions: 17,
      msg_recorded: 0,
      msg_delivered: 0,
      chapter_img_url:
        "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/sterling-davis-4iXagiKXn3Y-unsplash_low.jpg",
      reunion_img_url:
        "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/Perry-and-Joe-Miracle-Messages-LA.jpg",
      established_date: "September 2017",
      description:
        "This chapter operates in partnership with the University of Southern California. USC students visit sites on a weekly basis to offer Miracle Messages, then work with other Miracle Messages volunteers to solve their cases.",
      story:
        "Jose Jr. was searching for his father Jose Sr. with the help of Miracle Messages. The father and son had not parted on good terms, but Jose Jr. felt as though enough time had passed and that he wanted to reconnect and get to know more of his family, specifically his brother and sister whom he has not met. A messenger searched for Jose Sr.'s on White Pages and Facebook but was unable to find any current information. After finding an inactive Facebook profile for Jose Sr., a messenger reached out to some of Jose Sr.'s Facebook friends with the same last name.  One of Jose Sr.'s sons relayed the message to Jose Sr., who then called our messenger. He spoke spanish, so with the help of a translator, Jose Jr. was able to deliver his message.  Jose Sr. wanted to reconnect, so after getting back in touch with Jose Jr. via a letter in the mail, a phone call was facilitated between the father and son. The two talked for a long while and decided to keep talking and see one another. Soon after Jose Sr. drove to San Diego from Tijuana to have lunch with Jose Jr. seen in the attached picture. Jose Jr. has reunited with his father after nearly 25 years of separation.",
      email: "kevin@miraclemessages.org, jess@miraclemessages.org",
      longitude: -118.243683,
      latitude: 34.052235,
    });
    const newChapter = await db("chapters");
    expect(newChapter).toHaveLength(1);
  });

  test("GET by id / should return 500", () => {
    return request(server)
      .get("/api/chapter/:id")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });

  test("GET / should return partners for a given chapter", () => {
    return request(server)
      .get("/api/chapter/1/partners")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("PUT / should update newly created chapter", () => {
    return request(server)
      .put("/api/chapter/:id")
      .send({ city: "New Orleans" })
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
});
