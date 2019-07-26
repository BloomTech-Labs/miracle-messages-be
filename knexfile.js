// Update with your config settings.
const pg = require('pg');
// pg.defaults.ssl=true;
require('dotenv').config();

module.exports = {
  staging: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_BLACK_URL,
    useNullAsDefault: true,
  migrations: {
      directory: './database/development/migrations'
    },
    seeds: {
      directory: './database/development/seeds'
    }
  },

  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRESS_DEV_HOST,
      port: process.env.POSTGRESS_DEV_PORT,
      user: process.env.POSTGRESS_DEV_USER,
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: process.env.POSTGRESS_DEV_DATABASE
    },

    // development: {
    //   client: 'pg',
    //   connection: {
    //     host: "localhost",
    //     port: 5432,
    //     user: "postgres",
    //     password: process.env.POSTGRESS_DEV_PASSWORD,
    //     database: "postgres",
    //   },

    useNullAsDefault: true,

    migrations: {
      directory: './database/development/migrations'
    },

    seeds: {
      directory: './database/development/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRESS_TEST_ORANGE_HOST,
      port: process.env.POSTGRESS_TEST_ORANGE_PORT,
      user: process.env.POSTGRES_TEST_ORANGE_USER,
      password: process.env.POSTGRES_TEST_ORANGE_PASSWORD,
      database: process.env.POSTGRES_TEST_ORANGE_DATABASE
    },

  // testing: {
  //   client: 'pg',
  //   connection: {
  //     host: 'localhost',
  //     port: 5432,
  //     user: 'postgres',
  //     password: process.env.POSTGRESS_DEV_PASSWORD,
  //     database: 'testing'
  //   },

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
      directory: './database/development/migrations'
    },
    seeds: {
      directory: './database/development/seeds'
    }
  }

};
