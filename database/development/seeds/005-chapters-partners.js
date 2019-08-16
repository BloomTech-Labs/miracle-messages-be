
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters_partners').del()
    .then(function () {
      // Inserts seed entries
      return knex('chapters_partners').insert([
        {chaptersid: 1, partnersid: 1},
        {chaptersid: 1, partnersid: 3},
        {chaptersid: 2, partnersid: 3},
        {chaptersid: 3, partnersid: 3},
        {chaptersid: 4, partnersid: 2},
        {chaptersid: 4, partnersid: 1},
      ]);
    });
};
