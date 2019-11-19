# Back-End

Setup Development and Testing Environment

After cloning repo --
"npm install OR yarn install"
\*MUST HAVE PostgreSQL installed and working

\*\*If you dont have postgres follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

Create dev and test databases

In terminal run the following commands:

"psql" -- To get into postgreSQL utility
"CREATE DATABASE miracle_be;" -- Creates development server
"CREATE DATABASE miracle_be_test;" -- Creates testing server
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
  11. "npx knex migrate:up"

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

  11. "npx knex migrate:up"


* Windows setup after postrges installation
  !!!MUST HAVE PostgreSQL installed and working!!!

1.  Set up Postgres and create databases for both the development server (miracle_be) and testing server (miracle_be_test)

    - Open pgAdmin, sign in with your master password created during the set up of postgres.
    - Create a server if needed, if already created, turn server on by right clicking and pressing "Connect Server"
    - Once connected, look for the drop down for databases and right click to Create a database
    - Create a database called 'miracle_be' for the development connection & (miracle_be_test) for the testing connection

2.  Make sure in the knexfile.js that both the development and testing servers have their connection set to

    <!-- This is for the dev database -->

    connection: {
    host: process.env.POSTGRESS_DEV_HOST,
    port: process.env.POSTGRESS_DEV_PORT,
    user: process.env.POSTGRESS_DEV_USER,
    password: process.env.POSTGRESS_DEV_PASSWORD,
    database: process.env.POSTGRESS_DEV_DATABASE
    },

    <!-- this is for the test database -->

    connection: {
    host: process.env.POSTGRESS_TEST_HOST,
    port: process.env.POSTGRESS_TEST_PORT,
    user: process.env.POSTGRESS_TEST_USER,
    password: process.env.POSTGRESS_TEST_PASSWORD,
    database: process.env.POSTGRESS_TEST_DATABASE
    },

3.  Create a .env file and add the following for both DEV and TEST databases

    <!-- This is for the dev database -->

    POSTGRESS*DEV_HOST=localhost
    POSTGRESS_DEV_PORT=5432
    POSTGRESS_DEV_USER=postgres
    POSTGRESS_DEV_PASSWORD= \_Insert your postgres password here*
    POSTGRESS_DEV_DATABASE=miracle_be

    <!-- this is for the test database -->

    POSTGRESS*TEST_HOST=localhost
    POSTGRESS_TEST_PORT=5432
    POSTGRESS_TEST_USER=postgres
    POSTGRESS_TEST_PASSWORD= \_Insert your postgres password here*
    POSTGRESS_TEST_DATABASE=miracle_be_test

4.  Once this is all set up, in terminal you should be able to run knex commands to migrate
    To migrate to the dev database "npx knex migrate:latest"
    To migrate to the test database "npx knex migrate:latest --env testing"

