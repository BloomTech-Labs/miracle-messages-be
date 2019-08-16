
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('partners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('partners').insert([
        {name: 'SFPD', icon_url: 'https://sfpd.com/image' },
        {name: 'goodWill', icon_url: 'https://goodwill.com/image'},
        {name: 'glide', icon_url: 'https://glide.com/image' }
      ]);
    });
};
