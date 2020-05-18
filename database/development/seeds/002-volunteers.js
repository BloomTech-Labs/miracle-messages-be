exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("volunteers")
  .del()
  .then(function() {
  return knex("volunteers").insert([
    {
      oktaid: "testtesttest1",
      fname: "Ronald",
      lname: "McIntyre",
      email: "r.campbell.mcintyre@gmail.com",
      city: "Browns Mills",
      state: "NJ",
      country: "United States",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012H6R0ZK7-3822657a594c-512"
    },
    {
      oktaid: "testtesttest2",
      fname: "Colin",
      lname: "de Vries",
      email: "colindevries325@gmail.com"
    },
    {
      oktaid: "testtesttest3",
      fname: "Shun",
      lname: "Chiang",
      email: "yuushamenma@gmail.com"
    },
    {
      oktaid: "testtesttest4",
      fname: "Samuel",
      lname: "Ardis",
      email: "ardis.productions@gmail.com"
    },
    {
      oktaid: "testtesttest5",
      fname: "Tricia",
      lname: "Dislers",
      email: "triciadislers@gmail.com"
    },
    {
      oktaid: "testtesttest6",
      fname: "Alexander",
      lname: "Karren",
      email: "alex@karren.com",
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
    },
    {
      oktaid: "testtesttest7",
      fname: "Charlie",
      lname: "DiFranco",
      email: "charlie.difranco2@gmail.com"
    }
  ]);
})
};
