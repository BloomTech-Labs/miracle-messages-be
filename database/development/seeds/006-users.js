exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password:
            "$2a$10$bdIwvXg3r8EQaXWLM4WVTeDGJaIYaLUchA2SAGKSllaNF.P3UWJGW"
        }
      ]);
    });
};
