
exports.up = function(knex) {
    return knex.schema.createTable("reunions", tbl => {
        tbl.increments()
        tbl
        .integer('chapter_id')
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
        tbl.string("reunion_img").defaultTo("https://images.unsplash.com/photo-1517346665566-17b938c7f3ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
        tbl.boolean("approved")
            .defaultTo(false)
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reunions");
};
