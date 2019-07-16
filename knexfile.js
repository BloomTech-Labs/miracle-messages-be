// Update with your config settings.
const pg = require('pg');
//pg.defaults.ssl=true;
require('dotenv').config()

module.exports = {
  staging: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_BLACK_URL,

    useNullAsDefault: true,

    migrations: {
      directory: './database/migrations'
    },

    seeds: {
      directory: './database/seeds'
    }
  },

  development: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: "postgres",
    },

    useNullAsDefault: true,

     migrations: {
      directory: './database/migrations'
    },

    seeds: {
      directory: './database/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: "testing",
    },

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
    connection: process.env.DATABASE_URL,

    useNullAsDefault: true,

    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};
