
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reunions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reunions').insert([
        {chapter_id: 1, volunteersid: "testtesttest1", longitude: 39.974127, latitude: -74.565811, city: "Browns Mills", state: "NJ", story: "We met some people. Connects with some dudes. Hung out. Was cool.", link_to_media: "https://www.youtube.com/watch?v=UcB1bMc86Pw", reunion_img: "https://images.unsplash.com/photo-1517346665566-17b938c7f3ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
        {chapter_id: 1, volunteersid: "testtesttest2", longitude: 41.894100, latitude: -87.619843, city: "Chicago", state: "MI", story: "I don't even know how I ended up here.", link_to_media: "https://www.youtube.com/watch?v=Zljgcc-RnFA", reunion_img: "https://images.unsplash.com/photo-1517346665566-17b938c7f3ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
        {chapter_id: 2, volunteersid: "testtesttest1", longitude: 60.909073, latitude: -111.694338, city: "????", state: "????", story: "help.", link_to_media: "https://www.youtube.com/watch?v=SXIDN11fYyY", reunion_img: "https://images.unsplash.com/photo-1517346665566-17b938c7f3ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"}
      ]);
    });
};
