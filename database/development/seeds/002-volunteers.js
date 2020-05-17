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
    },
    {
      oktaid: "testtesttest2",
      fname: "Colin",
      lname: "de Vries",
      email: "colindevries325@gmail.com",
      city: "??",
      state: "??",
      country: "United States",
    },
    {
      oktaid: "testtesttest3",
      fname: "Shun",
      lname: "Chiang",
      email: "yuushamenma@gmail.com",
      city: "??",
      state: "??",
      country: "United States",
    },
    {
      oktaid: "testtesttest4",
      fname: "Samuel",
      lname: "Ardis",
      email: "ardis.productions@gmail.com",
      city: "??",
      state: "??",
      country: "United States",
    },
    {
      oktaid: "testtesttest5",
      fname: "Tricia",
      lname: "Dislers",
      email: "triciadislers@gmail.com",
      city: "??",
      state: "??",
      country: "United States",
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
      email: "charlie.difranco2@gmail.com",
      city: "??",
      state: "??",
      country: "United States",
    }
  ]);
})
};
