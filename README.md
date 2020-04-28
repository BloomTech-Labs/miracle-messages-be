# Miracle Messages Map Back-End - Production

Back-End documentation for installing, setup, usage, of the API.

## Setup PostgreSQL

### Homebrew (for macOS users)

If you dont have postgres follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

#### Create dev and test databases (Mac)

In terminal run the following commands:

1. "psql" -- To get into postgreSQL utility
2. "CREATE DATABASE miracle_be;" -- Creates development server
3. "CREATE DATABASE miracle_be_test;" -- Creates testing server
4. CD into your miracle-messages-be repo

### Windows

If you dont have postgres follow this link: https://www.2ndquadrant.com/en/blog/pginstaller-install-postgresql/

### Update S3 Credentials

To update S3 do the following

1. Using the Heroku CLI
   You may have to use Git BASH as the command is so long
2. Command: heroku git:remote -a miracle-messages-dev
3. Command: heroku config:set AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy
4. Command: heroku config:set S3_BUCKET_NAME=appname-assets


#### Create dev and test databases (Windows)

Set up Postgres and create databases for both the development server (miracle_be) and testing server (miracle_be_test)

1. Open pgAdmin, sign in with your master password created during the set up of postgres.
2. Create a server if needed, if already created, turn server on by right clicking and pressing "Connect Server"
3. Once connected, look for the drop down for databases and right click to Create a database
4. Create a database called 'miracle_be' for the development connection & (miracle_be_test) for the testing connection


## Environmental Variables at Runtime

1. Make sure in the knexfile.js that both the development and testing servers have their connection set to

```
    Development

    connection: {
    host: process.env.POSTGRESS_DEV_HOST,
    port: process.env.POSTGRESS_DEV_PORT,
    user: process.env.POSTGRESS_DEV_USER,
    password: process.env.POSTGRESS_DEV_PASSWORD,
    database: process.env.POSTGRESS_DEV_DATABASE
    },
```

```
    Testing

    connection: {
    host: process.env.POSTGRESS_TEST_HOST,
    port: process.env.POSTGRESS_TEST_PORT,
    user: process.env.POSTGRESS_TEST_USER,
    password: process.env.POSTGRESS_TEST_PASSWORD,
    database: process.env.POSTGRESS_TEST_DATABASE
    },
```

2.  Create a .env file and add the following for both DEV and TEST databases

```
    POSTGRESS_DEV_HOST=localhost
    POSTGRESS_DEV_PORT=5432
    POSTGRESS_DEV_USER=postgres
    POSTGRESS_DEV_PASSWORD= \_Insert your postgres password here*
    POSTGRESS_DEV_DATABASE=miracle_be
```

```
    POSTGRESS_TEST_HOST=localhost
    POSTGRESS_TEST_PORT=5432
    POSTGRESS_TEST_USER=postgres
    POSTGRESS_TEST_PASSWORD= \_Insert your postgres password here*
    POSTGRESS_TEST_DATABASE=miracle_be_test
```

## Setup Development and Testing Environment

1. Clone Repo
2. "yarn install -- both FE and BE use yarn to avoid conflict"

**Migrations/Seeds for Development Environment**



1. To run migrations: "npx knex migrate:latest"
2. To run seed files: "npx knex seed:run"



**Migrations/Seeds for Testing Environment**

Test database is depricated and not in use



==================== API Docs Start Here:=======================
 **BE API**

https://documenter.getpostman.com/view/9765799/SzfDxQme?version=latest

 **Okta API**

https://documenter.getpostman.com/view/9765799/SzfDxQmk