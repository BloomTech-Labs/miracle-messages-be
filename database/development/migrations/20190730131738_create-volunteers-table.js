exports.up = function(knex, Promise) {
  return knex.schema.createTable("volunteers", tbl => {
    tbl.increments();
    tbl.string("fname", 128).notNullable();
    tbl.string("lname", 128).notNullable();
    tbl
      .string("email", 128)
      .notNullable()
      .unique();
    tbl.string("password", 128).notNullable();
    tbl.string("phone", 32);
    tbl.string("city", 64).notNullable();
    tbl.string("state", 32).notNullable();
    tbl.string("country", 32).notNullable();
    tbl.text("comment");
    //   tbl.timestamp('created_at', { precision: 4 });
    tbl.datetime("date", { precision: 4 }).defaultTo(knex.fn.now(0));

    tbl.boolean("volunteering").defaultTo(false);
    tbl.boolean("donating").defaultTo(false);
    tbl.boolean("joinmm").defaultTo(false);
    tbl.boolean("mediacoverage").defaultTo(false);
    tbl.string("somethingelse", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("volunteers");
};
