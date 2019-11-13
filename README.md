# Back-End
 Setup Development and Testing Environment
- After cloning repo --
    1. "npm install OR yarn install"

 *MUST HAVE PostgreSQL installed and working
 
 **If you dont have postgres follow this link
 (Follow directions until you're able to get into psql utility after the 1st command on step 3 "psql postgres"):
 https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb


Create dev and test databases
-  In terminal run the following commands:
    1. "psql" -- To get into postgreSQL utility
    2. "CREATE DATABASE miracle-be;" -- Creates development server
    3. "CREATE DATABASE miracle-be-test;" -- Creates testing server

- CD into your miracle-messages-be repo
    1. "npx knex migrate:latest --env development" -- Adds tables into postgres db
    2. "npx knex migrate:latest --env testing" -- Adds tables into postgres db testing
    3. "npx knex seed:run --env development" -- Adds seeds info into db
    4. "npx knex seed:run --env testing" -- Adds seeds info into testing db