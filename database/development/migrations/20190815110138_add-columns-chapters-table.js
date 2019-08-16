
exports.up = function(knex, Promise) {
    return knex.schema.table('chapters', table => {
        table.string('state', 2);
        table.renameColumn('location', 'city')
        table.integer('numreunions')
        table.string('chapter_img_url', 512);
        table.string('reunion_img_url', 512)
        table.string('established_date');
        table.string('description', 2048);
        table.string('story', 2048);
        table.string('email')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('chapters', table => {
      table.dropColumn('state')
      table.renameColumn('city', 'location')
      table.dropColumn('numreunions')
      table.dropColumn('chapter_img_url')
      table.dropColumn('reunion_img_url')
      table.dropColumn('established_date')
      table.dropColumn('description')
      table.dropColumn('story')
      table.dropColumn('email')
    })
  };
