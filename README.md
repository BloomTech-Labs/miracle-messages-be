# Back-End
 Setup Development and Testing Environment

 *MUST HAVE PostgreSQL installed and working
- Create dev and test databases
 In terminal run the following commands:
    1. "psql" -- To get into postgreSQL utility
    2. "CREATE DATABASE miracle-be;" -- Creates development server
    3. "CREATE DATABASE miracle-be-test;" -- Creates testing server

CD into your miracle-messages-be repo
    1. "npx knex migrate:latest" -- Adds tables into postgres db
    2. "npx knex seed:run" -- Adds seeds info into db




npx knex seed:make 001-otherthing
-set up seeds-
npx knex seed:run