exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex('users')
      //.truncate()
      .then(function() {
        // Inserts seed entries
        return knex('users').insert([
          {
            username: '31malmal',
            email: '31email@hotmail.com',
            password: 'rowValue3'
          }
        ]);
      })
  );
};
