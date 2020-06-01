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
      oktaid: "00uc4zemuUeyaDfEd4x6",
      name: "Kevin Chiang",
      email: "wherestheoi666@aim.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JQ2UCKV-efd94e6ccb6e-512"
    },
    {
      oktaid: "00ud5eh8zUduV6GTR4x6",
      name: "Samuel Ardis",
      email: "ardis.productions@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012BRSBECW-5a9a45765a13-512"
    },
    {
      oktaid: "00ucw86t4StjDC1aL4x6",
      name: "Alexander Karren",
      email: "alex@karren.com",
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JHYAT26-8fba223ad62c-512"
    },
    {
      oktaid: "00ucjaxelCFMx6uiO4x6",
      name: "Charlie DiFranco",
      email: "charlie.difranco2@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012QNVLLHJ-733a40b8d717-512"
      
    }
  ]);
})
};
