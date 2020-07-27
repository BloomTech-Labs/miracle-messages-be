exports.up = function (knex) {
  return knex.schema.createTable("airtable", (tbl) => {
    tbl.increments();
    tbl.string("title", 128).notNullable();
    tbl.string("origin", 128).notNullable();
    tbl.double("originLongitude").notNullable();
    tbl.double("originLatitude").notNullable();
    tbl.string("destination", 128).notNullable();
    tbl.double("destLongitude").notNullable();
    tbl.double("destLatitude").notNullable();
    tbl.text("story").notNullable();
    tbl.string("link_to_media").defaultTo("https://youtu.be/8vcmuC_D-p0");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("airtable");
};
