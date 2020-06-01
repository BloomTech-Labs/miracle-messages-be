
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters_volunteers').del()
    .then(function () {
      // Inserts seed entries
      return knex('chapters_volunteers').insert([
        {chaptersid: 1, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true, isAdmin: true}, 
        {chaptersid: 1, volunteersid: 'testtesttest2', approved: false},
        {chaptersid: 2, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true, requestedAdmin: true},
        {chaptersid: 3, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true},
        {chaptersid: 3, volunteersid: 'testtesttest2', approved: true},
        {chaptersid: 1, volunteersid: 'testtesttest4', approved: true},
        {chaptersid: 2, volunteersid: 'testtesttest2', approved: true},
        {chaptersid: 1, volunteersid: 'testtesttest3', approved: true},
        {chaptersid: 4, volunteersid: 'testtesttest4', approved: true},
        {chaptersid: 4, volunteersid: 'testtesttest5', approved: true},
        {chaptersid: 4, volunteersid: 'testtesttest6', approved: true},
        {chaptersid: 5, volunteersid: 'testtesttest4', approved: true},
        {chaptersid: 5, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true}
      ]);
    });
};
