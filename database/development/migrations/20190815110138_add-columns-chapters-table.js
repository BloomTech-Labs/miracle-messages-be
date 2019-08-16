
exports.up = function(knex, Promise) {
    return knex.schema.table('chapters', table => {
        table.string('state', 64);
        table.renameColumn('location', 'city');
        table.string('title', 128)
        table.integer('numreunions').unsigned();
        table.integer('msg_recorded').unsigned();
        table.integer('msg_delivered').unsigned();
        table.string('chapter_img_url', 512);
        table.string('reunion_img_url', 512);
        table.string('established_date', 32);
        table.string('description', 2048);
        table.string('story', 2048);
        table.string('email');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('chapters', table => {
      table.dropColumn('state');
      table.renameColumn('city', 'location');
      table.dropColumn('title');
      table.dropColumn('numreunions');
      table.dropColumn('msg_recorded');
      table.dropColumn('msg_delivered');
      table.dropColumn('chapter_img_url');
      table.dropColumn('reunion_img_url');
      table.dropColumn('established_date');
      table.dropColumn('description');
      table.dropColumn('story');
      table.dropColumn('email');
    })
  };
