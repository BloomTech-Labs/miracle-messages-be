const knex = require("knex");

const config = require("../knexfile.js");

//Test variable only set when yarn test is run
const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(config[dbEnv]);
