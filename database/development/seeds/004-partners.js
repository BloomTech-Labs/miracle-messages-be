
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('partners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('partners').insert([
        {name: 'SFPD', site_url:'https://sfpd.com', icon_url: 'https://sfpd.com/image' },
        {name: 'goodWill', site_url:'https://goodwill.com', icon_url: 'https://goodwill.com/image'},
        {name: 'glide', site_url: 'https://glide.com', icon_url: 'https://glide.com/image' }
      ]);
    });
};
