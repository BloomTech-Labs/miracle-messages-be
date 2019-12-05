exports.up = function(knex) {
  return knex.schema.createTable("chapters_volunteers", tbl => {
    tbl.increments();

    tbl
      .integer("chaptersid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("chapters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("volunteersid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("volunteers")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("chapters_volunteers");
};
