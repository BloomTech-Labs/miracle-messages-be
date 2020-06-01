
exports.seed = function(knex) {
  
  // Deletes ALL existing entries
  return knex('reunions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reunions').insert([
        {chapterid: 1, 
          volunteersid: "00ud5cf5v0zK8zYCG4x6",
           longitude: -120.440928,
            latitude: 34.951242,
             city: "Santa Maria",
             state: "CA",
              title:"Joe Reconnects With Family",
               story: "Joe was homeless for 5 years, without any contact from family members. I was able to search for, and find Joe's family. They were willing to reconnect and were overjoyed at the opportunity to see their family member again.",
                 reunion_img: "https://media1.s-nbcnews.com/j/MSNBC/Components/Video/__NEW/a_orig_homeless_marvin_160309__606123.focal-760x428.jpg"},
        {chapterid: 1, 
          volunteersid: "testtesttest2",
           longitude: -115.133404,
            latitude: 36.163379,
             city: "Las Vegas",
              state: "NV",
               title: "Jason found his relatives after 6 years of being declared missing",
                story: "Jason was homeless for 6 years, eventually being declared missing. With the help of social media we were able to track down his loved ones and get them communicating again.",
                 reunion_img: "https://miraclemessagesimages.s3.amazonaws.com/david-cain-XT_uItFNudk-unsplash.jpg" },

                
        {chapterid: 2,
           volunteersid: "testtesttest6",
            longitude: -111.870662,
             latitude: 40.597271,
              city: "Salt Lake City", 
               state: "UT",
                title: "Samuel celebrates his first Christmas in 10 years",
                 story: "Samuel was homeless for 5 years after falling on hard times. After a lot of hard work we finally found Sam's family. They too had been searching hoping to one day be reunited, and this Christmas they'll finally be together again.",
                 reunion_img: "https://media1.s-nbcnews.com/j/newscms/2019_23/2883511/190604-david-clark-photo-1-v3-cover-ac-512p_e78383be4c9c5cd5794253339351b909.fit-760w.jpg"
                },
        {chapterid: 2,
         volunteersid: "testtesttest7",
          longitude: -80.800005,
           latitude: 35.119909,
            city: "Charlotte", 
             state: "NC",
              title: "Benjamin found hope and belonging",
               story: "Benjamin had been wandering a long time after becoming homeless several years ago. He had longed for seeing his kids again after spending years alone. Through social media we were able to reach out to his daughter, and setup a virtual family reunion between him and his two kids.",
               reunion_img: "https://i.ytimg.com/vi/yZ5RA4VwCz4/maxresdefault.jpg"
                       }
      ]);
    });
};
