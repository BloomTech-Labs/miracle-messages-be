exports.up = function (knex) {
  return knex.schema.createTable("chapters_okta_table", (tbl) => {
    tbl.increments();

    tbl
      .integer("chaptersid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("chapters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.string("oktaid", 128).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chapters_okta_table");
};
