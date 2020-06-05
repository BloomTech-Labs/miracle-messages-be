
exports.up = function(knex) {
    return knex.schema.createTable("reunions", tbl => {
        tbl.increments()
        tbl
        .integer('chapterid')
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
        tbl.double("longitude").notNullable();
        tbl.double("latitude").notNullable();
        tbl.string("city", 128).notNullable();
        tbl.string("state", 128).notNullable();
        tbl.string("title", 128).notNullable();
        tbl.text("story").notNullable();
        tbl.string("link_to_media").defaultTo("https://www.youtube.com/watch?v=8vcmuC_D-p0");
        tbl.string("reunion_img").defaultTo("https://miraclemessagesimages.s3.amazonaws.com/default_photo.jpg")
        tbl.boolean("approved")
            .defaultTo(false)
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reunions");
};
