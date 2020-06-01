exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("volunteers")
  .del()
  .then(function() {
  return knex("volunteers").insert([
    {
      oktaid: "00ud5cf5v0zK8zYCG4x6",
      name: "Ronald McIntyre",
      email: "r.campbell.mcintyre@gmail.com",
      city: "Browns Mills",
      state: "NJ",
      country: "United States",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012H6R0ZK7-3822657a594c-512"
    },
    {
      oktaid: "testtesttest2",
      name: "Colin de Vries",
      email: "colindevries325@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012BRKJN4E-f68576ae20c9-512"
    },
    {
      oktaid: "testtesttest3",
      name: "Shun Chiang",
      email: "yuushamenma@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JQ2UCKV-efd94e6ccb6e-512"
    },
    {
      oktaid: "testtesttest4",
      name: "Samuel Ardis",
      email: "ardis.productions@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012BRSBECW-5a9a45765a13-512"
    },
    {
      oktaid: "testtesttest5",
      name: "Tricia Dislers",
      email: "triciadislers@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012H6L1M7F-e27e5d3c1cb0-512"
    },
    {
      oktaid: "testtesttest6",
      name: "Alexander Karren",
      email: "alex@karren.com",
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JHYAT26-8fba223ad62c-512"
    },
    {
      oktaid: "testtesttest7",
      name: "Charlie DiFranco",
      email: "charlie.difranco2@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012QNVLLHJ-733a40b8d717-512"
      
    }
  ]);
})
};
