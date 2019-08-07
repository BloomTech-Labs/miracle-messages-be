exports.up = function(knex, Promise) {
    return knex.schema.createTable('chapters', tbl => {
      tbl.increments();
      tbl.string('location', 128).notNullable();
      tbl.integer('numvolunteers').notNullable();
      tbl.double('longitude').notNullable();
      tbl.double('latitude').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('chapters');
  };
  