// Update with your config settings.
const pg = require('pg');
//pg.defaults.ssl=true;
require('dotenv').config()

module.exports = {
  staging: {
    client: 'pg',
    connection: 'postgres://fjqaiuqrszutzf:9bf95beffb14b87dee814a29f73f303f05aa329ac8d2fecd484ecc166e61fcb9@ec2-54-83-1-101.compute-1.amazonaws.com:5432/d1h1cg5bjnl52m',
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
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: "postgres",
    },

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
      directory: './database/development/migrations'
    },
    seeds: {
      directory: './database/development/seeds'
    }
  }

};
