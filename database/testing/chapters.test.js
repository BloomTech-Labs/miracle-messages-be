const request = require("supertest");
const server = require("../../server");

const db = require("../../config/dbConfig.js");
const Chapters = require("../../models/chapters-model.js");

describe("chapter model", () => {
  beforeEach(async () => {
    await db('chapters').del();
    await db("chapters_partners").del();
  });

  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/api/chapter");
      expect(res.status).toBe(200);
    });

    it("should return json type", async () => {
      const res = await request(server).get("/api/chapter");
      expect(res.type).toBe("application/json");
    });

    it('should insert chapters into the db', async () => {
      await Chapters.addChapter(({
        city: 'Los Angeles',
        title: 'Los Angeles',
        state: 'CA',
        numvolunteers: 30,
        numreunions: 17,
        msg_recorded: 0,
        msg_delivered: 0,
        chapter_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/sterling-davis-4iXagiKXn3Y-unsplash_low.jpg",
        reunion_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/Perry-and-Joe-Miracle-Messages-LA.jpg",
        established_date: 'September 2017',
        description: "This chapter operates in partnership with the University of Southern California. USC students visit sites on a weekly basis to offer Miracle Messages, then work with other Miracle Messages volunteers to solve their cases.",
        story: "Jose Jr. was searching for his father Jose Sr. with the help of Miracle Messages. The father and son had not parted on good terms, but Jose Jr. felt as though enough time had passed and that he wanted to reconnect and get to know more of his family, specifically his brother and sister whom he has not met. A messenger searched for Jose Sr.'s on White Pages and Facebook but was unable to find any current information. After finding an inactive Facebook profile for Jose Sr., a messenger reached out to some of Jose Sr.'s Facebook friends with the same last name.  One of Jose Sr.'s sons relayed the message to Jose Sr., who then called our messenger. He spoke spanish, so with the help of a translator, Jose Jr. was able to deliver his message.  Jose Sr. wanted to reconnect, so after getting back in touch with Jose Jr. via a letter in the mail, a phone call was facilitated between the father and son. The two talked for a long while and decided to keep talking and see one another. Soon after Jose Sr. drove to San Diego from Tijuana to have lunch with Jose Jr. seen in the attached picture. Jose Jr. has reunited with his father after nearly 25 years of separation.",
        "email": "kevin@miraclemessages.org, jess@miraclemessages.org",
        longitude: -118.243683,
        latitude: 34.052235
      }));


      await Chapters.addChapter({
          city: 'Riverside',
          title: 'Riverside',
          state: 'CA',
          numvolunteers: 3,
          numreunions: 1,
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/kevin_riverside_chapter.jpg",
          reunion_img_url: "",
          established_date: 'February 2019',
          description: "This chapter works with the City of Riverside, Mt. Rubidoux Church, and Path of life ministries. ",
          story: "Paula was searching for her sister Shela when she found Miracle Messages. A messengers was able to find Shela’s contact information via Whitepages and contacted her on behalf of Paula. Shela was more than willing to reconnect with her sister. The two sisters have been reunited after months of separation.",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          longitude: -80.141126,
          latitude: 26.105631,
        });

      const chapters = await db('chapters')

       expect(chapters).toHaveLength(2);
       expect(chapters[0].city).toBe('Los Angeles');
       expect(chapters[1].city).toBe('Riverside');
       expect(chapters[1].numvolunteers).toBe(3)
   });
  
  });
});
