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

- FOLLOW THIS STEP BY STEP
- Migrations/Seeds for Development Environment
  1. "npx knex migrate:up" -- Adds table into postgres db
  2. "npx knex seed:run --specific=001-chapters.js" -- Adds seed into table
  3. "npx knex migrate:up"
  4. "npx knex seed:run --specific=002-volunteers.js"
  5. "npx knex migrate:up"
  6. "npx knex seed:run --specific=003-interests.js"
  7. "npx knex migrate:up"
  8. "npx knex seed:run --specific=004-partners.js"
  9. "npx knex migrate:up"
  10. "npx knex seed:run --specific=005-chapters-partners.js"

- Migrations/Seeds for Testing Environment
  1. "npx knex migrate:up --env testing" -- Adds table into postgres db
  2. "npx knex seed:run --specific=001-chapters.js --env testing" -- Adds seed into table
  3. "npx knex migrate:up --env testing"
  4. "npx knex seed:run --specific=002-volunteers.js --env testing"
  5. "npx knex migrate:up --env testing"
  6. "npx knex seed:run --specific=003-interests.js --env testing"
  7. "npx knex migrate:up --env testing"
  8. "npx knex seed:run --specific=004-partners.js --env testing"
  9. "npx knex migrate:up --env testing"
  10. "npx knex seed:run --specific=005-chapters-partners.js --env testing"
