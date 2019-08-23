
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('partners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('partners').insert([
        {category: 'partner', name: 'SFPD', site_url:'https://www.sanfranciscopolice.org/', icon_url: 'https://pbs.twimg.com/profile_images/880890495651545088/LcAV6z-c_400x400.jpg' },
        {category: 'partner',name: 'goodWill', site_url:'https://www.goodwill.org/', icon_url: 'https://www.goodwill.org/wp-content/uploads/2019/06/cropped-Goodwill-Industries-International-Logo-1.jpg'},
        {category: 'sponsor', name: 'glide', site_url: 'https://www.glide.org/', icon_url: 'https://unm5i3x3smv2e4zlycj53ret-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/logo.svg' },
        {category: 'sponsor',name: 'National Charity League, LA', site_url: 'https://www.nclla.org', icon_url: 'https://www.nclla.org/wp-content/uploads/ncl-la-logo_2.svg' },
        {category: 'sponsor',name: 'Christian Appalachian Project, LA', site_url: 'https://www.charities.org/charities/christian-appalachian-projec', icon_url: 'https://www.charities.org/sites/default/files/styles/logo/public/One-Color%20Standard%20Logo%20Blue.png?itok=T81vTIl5'}, 
      ]);
    });
};
