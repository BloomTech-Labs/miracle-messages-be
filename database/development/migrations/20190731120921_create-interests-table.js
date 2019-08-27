exports.up = function(knex, Promise) {
  return knex.schema.createTable('interests', tbl => {
    tbl.increments('interestid');
    tbl
      .integer('volunteersid')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('volunteers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.boolean('volunteering').defaultTo(false);
    tbl.boolean('donating').defaultTo(false);
    tbl.boolean('joinmm').defaultTo(false);
    tbl.boolean('mediacoverage').defaultTo(false);
    tbl.string('somethingelse', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('interests');
};
