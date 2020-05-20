
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
        tbl.text("story").notNullable();
        tbl.string("link_to_media");
        tbl.string("reunion_img").defaultTo("https://media.graytvinc.com/images/690*433/Cliff+gets+new+home.JPG");
        tbl.boolean("approved")
            .defaultTo(false)
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reunions");
};
