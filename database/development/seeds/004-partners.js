
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('partners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('partners').insert([
        {category: 'sponsor', name: 'SFPD', site_url:'https://www.sanfranciscopolice.org/', icon_url: 'https://pbs.twimg.com/profile_images/880890495651545088/LcAV6z-c_400x400.jpg' },
        {category: 'sponsor', name: 'goodWill', site_url:'https://www.goodwill.org/', icon_url: 'https://www.goodwill.org/wp-content/uploads/2019/06/cropped-Goodwill-Industries-International-Logo-1.jpg'},
        {category: 'sponsor', name: 'glide', site_url: 'https://www.glide.org/', icon_url: 'https://unm5i3x3smv2e4zlycj53ret-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/logo.svg' },
        {category: 'partner', name: 'National Charity League, LA', site_url: 'https://www.nclla.org', icon_url: 'https://www.nclla.org/wp-content/uploads/ncl-la-logo_2.svg' },
        {category: 'partner', name: 'Christian Appalachian Project, LA', site_url: 'https://www.charities.org/charities/christian-appalachian-projec', icon_url: 'https://www.charities.org/sites/default/files/styles/logo/public/One-Color%20Standard%20Logo%20Blue.png?itok=T81vTIl5'},
        {category: 'sponsor', name: 'San Francisco Fire', site_url: 'https://sf-fire.org/', icon_url: 'https://upload.wikimedia.org/wikipedia/commons/1/19/San_Francisco_Fire_Department_Seal.png'},
        {category: 'sponsor', name: 'LGBT', site_url: 'https://www.sfcenter.org/', icon_url: 'https://pbs.twimg.com/profile_images/1019981834896097280/quGA-HOi.jpg'},
        {category: 'sponsor', name: 'Coalition on homelessness', site_url: 'http://www.cohsf.org/', icon_url: 'https://i2.wp.com/www.cohsf.org/wp-content/uploads/2017/03/coh_logo.png?fit=60%2C60'},
      ]);
    });
};
