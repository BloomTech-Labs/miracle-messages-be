exports.up = function(knex) {
  return knex.schema.createTable("chapters_volunteers", tbl => {
    //TODO may need to add this to prevent duplicate rows tbl.unique(['chaptersid', 'volunteersid']);

    tbl
      .integer("chaptersid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("chapters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .string("volunteersid")
      .unsigned()
      .notNullable()
      .references("oktaid")
      .inTable("volunteers")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.boolean("appoved")
      .defaultTo(false)
    tbl.boolean("isAdmin")
      .defaultTo(false)

    tbl.primary(["chaptersid","volunteersid"])
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("chapters_volunteers");
};
