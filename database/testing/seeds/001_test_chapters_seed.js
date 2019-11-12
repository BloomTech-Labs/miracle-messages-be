exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('chapters').insert([
        {
          city: 'San Francisco',
          title: 'San Francisco',          
          state: 'CA',
          numvolunteers: 50,
          numreunions: 150,
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/BrianBevCropped.jpg",
          reunion_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/wayne%20jasmine.jpg",
          established_date: 'December 2014',
          description: "We host weekly volunteer sessions at DSCS! Learn more at miraclemessages.org/events",
          story: "Wayne reunited with his beloved niece Jasmine and the rest of his family after years disconnected. Today, Wayne is off-the-streets thanks to his reunion!",
          longitude: -122.431297,
          latitude: 37.773972
        },
        {
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

          longitude: -118.243683,
          latitude: 34.052235
        },
        {
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
          longitude: -80.141126,
          latitude: 26.105631,
        },
        {
          city: 'Fort Lauderdale',
          title: 'South Florida',
          state: 'FL',
          numvolunteers: 1,
          numreunions: 8,
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          reunion_img_url: "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          established_date: 'July 2019',
          description: "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          story: "Miracle Messages partnered with Choose Love Foundation to reunite Isaac with his family. Isaac was reunited with his sister Guadalupe Avila after nearly 40 years of separation. Isaac is now off the streets and living with his sister.",
          longitude: -117.161087,
          latitude: 32.715736
        },
      ]);
    });
};
