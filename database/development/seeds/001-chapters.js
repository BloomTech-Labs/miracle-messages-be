exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chapters")
    .del()
    .then(function() {
      return knex("chapters").insert([
        {
          city: "San Francisco",
          title: "San Francisco",
          state: "CA",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/BrianBevCropped.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We host weekly volunteer sessions at DSCS! Learn more at miraclemessages.org/events",
          longitude: -122.431297,
          latitude: 37.773972,
          approved: true,
          requestedBy: "testestest1"

        },
        {
          city: "Los Angeles",
          title: "Los Angeles",
          state: "CA",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/sterling-davis-4iXagiKXn3Y-unsplash_low.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "This chapter operates in partnership with the University of Southern California. USC students visit sites on a weekly basis to offer Miracle Messages, then work with other Miracle Messages volunteers to solve their cases.",
          longitude: -118.243683,
          latitude: 34.052235,
          approved: true,
          requestedBy: "testestest2"
        },
        {
          city: "Riverside",
          title: "Riverside",
          state: "CA",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/kevin_riverside_chapter.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "This chapter works with the City of Riverside, Mt. Rubidoux Church, and Path of life ministries. ",
          longitude: -117.377022,
          latitude: 33.98053,
          approved: true,
          requestedBy: "testestest1"
        },
        {
          city: "Seattle",
          title: "Seattle",
          state: "WA",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -122.332069,
          latitude: 47.606209,
          approved: true,
          requestedBy: "testestest3"
        },
        {
          city: "Fort Lauderdale",
          title: "Fort Lauderdale",
          state: "FL",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -80.137314,
          latitude: 26.122438,
          approved: true,
          requestedBy: "testestest1"
        },
        {
          city: "Miami",
          title: "Miami",
          state: "FL",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -80.191788,
          latitude: 25.761681,
          approved: true,
          requestedBy: "testestest1"
        },
        {
          city: "San Antonio",
          title: "San Antonio",
          state: "TX",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -98.493629,
          latitude: 29.424122,
          approved: true,
          requestedBy: "testestest2"
        },
        {
          city: "New York",
          title: "New York",
          state: "NY",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -74.005974,
          latitude: 40.712776,
          approved: true,
          requestedBy: "testestest3"
        },
        {
          city: "Boston",
          title: "Boston",
          state: "MA",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -71.058884,
          latitude: 42.360081,
          approved: true,
          requestedBy: "testestest2"
        },
        {
          city: "Phoenix",
          title: "Phoenix",
          state: "AZ",
          msg_recorded: 0,
          msg_delivered: 0,
          chapter_img_url:
            "https://labs14-miracle-messages-image-upload.s3.amazonaws.com/isaac%20avila%202.jpg",
          email: "kevin@miraclemessages.org, jess@miraclemessages.org",
          description:
            "We record messages at local service partners under the direction of our General Manager, Gabby Cordell. ",
          longitude: -112.074036,
          latitude: 33.448376,
          approved: true,
          requestedBy: "testestest1"
        }
      ]);
   });
};
