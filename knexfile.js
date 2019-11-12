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
    // connection: {
    //   // host: process.env.POSTGRESS_DEV_HOST,
    //   // port: process.env.POSTGRESS_DEV_PORT,
    //   // user: process.env.POSTGRESS_DEV_USER,
    //   // password: process.env.POSTGRESS_DEV_PASSWORD,
    //   // database: process.env.POSTGRESS_DEV_DATABASE
    // },
    connection: {
      postgres:"postgres://localhost/miracle-be"
    },

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
      host: process.env.POSTGRESS_TEST_HOST,
      port: process.env.POSTGRESS_TEST_PORT,
      user: process.env.POSTGRESS_TEST_USER,
      password: process.env.POSTGRESS_TEST_PASSWORD,
      database: process.env.POSTGRESS_TEST_DATABASE
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
