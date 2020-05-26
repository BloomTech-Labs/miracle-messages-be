const pg = require("pg");

//uncomment the line below if you are workign on heroku servers
//pg.defaults.ssl = true;

require("dotenv").config();

module.exports = {
  staging: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.HEROKU_POSTGRESQL_BLACK_URL,

    migrations: {
      directory: "./database/development/migrations",
    },

    seeds: {
      directory: "./database/development/seeds",
    },
  },

  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DEV_DB,
    pool: {
      min: 2,
      max: 10,
    },

    migrations: {
      directory: "./database/development/migrations",
    },

    seeds: {
      directory: "./database/development/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: process.env.DEV_TESTDB,
    

    useNullAsDefault: true,

    migrations: {
      directory: "./database/development/migrations",
    },

    seeds: {
      directory: "./database/development/seeds",
    },
  },

  production: {
    client: "pg",
    useNullAsDefault: true,

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/development/migrations",
    },
    seeds: {
      directory: "./database/development/seeds",
    },
  },
};
