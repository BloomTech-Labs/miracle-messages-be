
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters_volunteers').del()
    .then(function () {
      // Inserts seed entries
      return knex('chapters_volunteers').insert([
        {chaptersid: 1, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true, requestedAdmin: false,isAdmin: true}, 
        {chaptersid: 1, volunteersid: '00uc4zemuUeyaDfEd4x6', approved: true, requestedAdmin: false,isAdmin: false}, 
        {chaptersid: 1, volunteersid: '00ucw86t4StjDC1aL4x6', approved: true, requestedAdmin: true,isAdmin: false}, 
        {chaptersid: 2, volunteersid: '00ucw86t4StjDC1aL4x6', approved: true, requestedAdmin: false,isAdmin: true}, 
        {chaptersid: 2, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true, requestedAdmin: false,isAdmin: false}, 
        {chaptersid: 2, volunteersid: '00uc4zemuUeyaDfEd4x6', approved: true, requestedAdmin: true,isAdmin: false}, 
        {chaptersid: 3, volunteersid: '00uc4zemuUeyaDfEd4x6', approved: true, requestedAdmin: false,isAdmin: true}, 
        {chaptersid: 3, volunteersid: '00ucw86t4StjDC1aL4x6', approved: true, requestedAdmin: false,isAdmin: false}, 
        {chaptersid: 3, volunteersid: '00ud5cf5v0zK8zYCG4x6', approved: true, requestedAdmin: true,isAdmin: false}, 
        {chaptersid: 4, volunteersid: '00ud5eh8zUduV6GTR4x6', approved: true, requestedAdmin: false,isAdmin: true}, 
        {chaptersid: 4, volunteersid: '00ucjaxelCFMx6uiO4x6', approved: true, requestedAdmin: false,isAdmin: false}, 
        {chaptersid: 5, volunteersid: '00ucjaxelCFMx6uiO4x6', approved: true, requestedAdmin: false,isAdmin: true}, 
        {chaptersid: 5, volunteersid: '00ud5eh8zUduV6GTR4x6', approved: true, requestedAdmin: false,isAdmin: false}, 

        
      ]);
    });
};


