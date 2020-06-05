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
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012H6R0ZK7-3822657a594c-512",
      bio: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
    },
    {
      oktaid: "00uc4zemuUeyaDfEd4x6",
      name: "Kevin Chiang",
      email: "wherestheoi666@aim.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JQ2UCKV-efd94e6ccb6e-512",
      bio: "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring."
    },
    {
      oktaid: "00ud5eh8zUduV6GTR4x6",
      name: "Samuel Ardis",
      email: "ardis.productions@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012BRSBECW-5a9a45765a13-512",
      bio: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line."
    },
    {
      oktaid: "00ucw86t4StjDC1aL4x6",
      name: "Alexander Karren",
      email: "alex@karren.com",
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012JHYAT26-8fba223ad62c-512",
      bio: "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration."
    },
    {
      oktaid: "00ucjaxelCFMx6uiO4x6",
      name: "Charlie DiFranco",
      email: "charlie.difranco2@gmail.com",
      profile_img_url: "https://ca.slack-edge.com/ESZCHB482-W012QNVLLHJ-733a40b8d717-512",
      bio: "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
      
    }
  ]);
})
};
