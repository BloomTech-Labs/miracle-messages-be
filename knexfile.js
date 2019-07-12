// Update with your config settings.
const pg = require('pg');
pg.defaults.ssl=true;
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://fjqaiuqrszutzf:9bf95beffb14b87dee814a29f73f303f05aa329ac8d2fecd484ecc166e61fcb9@ec2-54-83-1-101.compute-1.amazonaws.com:5432/d1h1cg5bjnl52m',

    useNullAsDefault: true,

    migrations: {
      directory: './database/migrations'
    },

    seeds: {
      directory: './database/seeds'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },

  //   useNullAsDefault: true,

  //   // pool: {
  //   //   min: 2,
  //   //   max: 10
  //   // },

  //   migrations: {
  //     directory: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
