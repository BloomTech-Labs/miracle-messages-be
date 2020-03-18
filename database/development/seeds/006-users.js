const bcrypt = require("bcryptjs");
let hash = bcrypt.hashSync("password", 10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex("users")
  //   .del()
  //   .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: hash
        }
      ]);
    // });
};
