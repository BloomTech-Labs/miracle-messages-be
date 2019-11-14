# Back-End
Setup Development and Testing Environment

After cloning repo --
"npm install OR yarn install"
*MUST HAVE PostgreSQL installed and working

**If you dont have postgres follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

Create dev and test databases

In terminal run the following commands:

"psql" -- To get into postgreSQL utility
"CREATE DATABASE miracle-be;" -- Creates development server
"CREATE DATABASE miracle-be-test;" -- Creates testing server
CD into your miracle-messages-be repo

"npx knex migrate:latest --env development" -- Adds tables into postgres db
"npx knex migrate:latest --env testing" -- Adds tables into postgres db testing
"npx knex seed:run --env development" -- Adds seeds info into db
"npx knex seed:run --env testing" -- Adds seeds info into testing db