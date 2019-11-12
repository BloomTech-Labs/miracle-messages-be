const pg = require('pg');

//uncomment the line below if you are workign on heroku servers
//pg.defaults.ssl = true;

require('dotenv').config();

module.exports = {
  staging: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.HEROKU_POSTGRESQL_BLACK_URL,

    migrations: {
      directory: './database/development/migrations'
    },

    seeds: {
      directory: './database/development/seeds'
    }
  },

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection:"postgres://localhost/miracle-be",


    migrations: {
      directory: './database/development/migrations'
    },

    seeds: {
      directory: './database/development/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection:"postgres://localhost/miracle-be-test",

    useNullAsDefault: true,

    migrations: {
      directory: './database/testing/migrations'
    },
    seeds: {
      directory: './database/testing/seeds'
    }
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: './database/development/migrations'
    },
    seeds: {
      directory: './database/development/seeds'
    }
  }
};
