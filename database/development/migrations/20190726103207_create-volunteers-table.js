exports.up = function(knex, Promise) {
  return knex.schema.createTable('volunteers', tbl => {
    tbl.increments();
    tbl.string('fname', 128).notNullable();
    tbl.string('lname', 128).notNullable();
    tbl
      .string('email', 128)
      .notNullable()
      .unique();
    tbl.string('phone', 32).unique();
    tbl.string('city', 64).notNullable();
    tbl.string('state', 32).notNullable();
    tbl.string('country', 32).notNullable();
    tbl.text('comment');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('volunteers');
};
