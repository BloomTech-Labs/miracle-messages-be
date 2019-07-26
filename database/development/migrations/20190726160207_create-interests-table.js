
exports.up = function(knex, Promise) {
  return knex.schema.createTable('interests', tbl => {
      tbl.increments();
      tbl.integer('volunteers_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('volunteers')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
      tbl.boolean('volunteering').defaultTo(false);
      tbl.boolean('donating').defaultTo(false);
      tbl.boolean('joinMM').defaultTo(false);
      tbl.boolean('media_coverage').defaultTo(false);
      tbl.string('something_else', 128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('interests');
};
