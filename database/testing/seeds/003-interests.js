exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interests')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('interests').insert([
        {
          volunteersid: 1,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 2,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 3,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 4,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 5,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 6,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 7,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 8,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 9,
          volunteering: true,
          donating: true,
          joinmm: false,
          mediacoverage: false,
          somethingelse: 'Hello'
        },
        {
          volunteersid: 10,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 11,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 12,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 13,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 14,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 15,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 16,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 17,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 18,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 19,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 20,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 21,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 22,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        },
        {
          volunteersid: 23,
          volunteering: true,
          donating: false,
          joinmm: true,
          mediacoverage: true,
          somethingelse: 'Yellow'
        }
      ]);
    });
};
