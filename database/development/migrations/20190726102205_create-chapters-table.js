exports.up = function(knex, Promise) {
  return knex.schema.createTable('chapters', tbl => {
    tbl.increments();
  
    tbl.integer('numvolunteers').notNullable();
    tbl.double('longitude').notNullable();
    tbl.double('latitude').notNullable();
    tbl.string('city',128).notNullable();
    tbl.string('title',128).notNullable();
    tbl.string('state',128).notNullable();
    tbl.integer('numreunions').notNullable();
    tbl.integer('msg_recorded').notNullable();
    tbl.integer('msg_delivered').notNullable();
    tbl.string('chapter_img_url',128).notNullable();
    tbl.string('reunion_img_url',128).notNullable();
    tbl.string('established_date',128).notNullable();
    tbl.text('description').notNullable();
    tbl.text('story').notNullable();
    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('chapters');
};