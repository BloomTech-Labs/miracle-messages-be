exports.up = function(knex, Promise) {
  return knex.schema.createTable("chapters", tbl => {
    tbl.increments();

    tbl.integer("numvolunteers");
    tbl.double("longitude").notNullable();
    tbl.double("latitude").notNullable();
    tbl.string("city", 128).notNullable();
    tbl.string("title", 128).notNullable();
    tbl.string("state", 128).notNullable();
    tbl.integer("numreunions");
    tbl.integer("msg_recorded");
    tbl.integer("msg_delivered");
    tbl.string("chapter_img_url").notNullable();
    tbl.string("reunion_img_url");
    tbl
      .string("established_date")
      .tbl.text("description")
      .notNullable();
    tbl.text("story");
    tbl.string("email").notNullable();
    tbl.string("facebook");

    //Pending Requests
    tbl.boolean("approved").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("chapters");
};
