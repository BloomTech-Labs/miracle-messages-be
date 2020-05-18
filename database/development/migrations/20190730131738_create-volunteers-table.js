exports.up = function (knex, Promise) {
  return knex.schema.createTable("volunteers", (tbl) => {
    tbl.string("oktaid", 32).primary();
    tbl.string("fname", 128).notNullable();
    tbl.string("lname", 128).notNullable();
    tbl.string("email", 128).notNullable().unique();
    tbl.string("profile_img_url")
    tbl.string("city", 64)
    tbl.string("state", 32)
    tbl.string("country", 32)
    tbl.datetime("date", { precision: 4 }).defaultTo(knex.fn.now(0));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("volunteers");
};
