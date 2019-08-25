
exports.up = function(knex, Promise) {
  return knex.schema.createTable('partners', tbl => {
      tbl.increments();
      tbl.string('category', 64).notNullable();
      tbl.string('name', 128).notNullable();
      tbl.string('site_url', 128).notNullable();
      tbl.string('icon_url', 256).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('partners');
};
