# Miracle Messages Map Back-End

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
2. "npm install OR yarn install"

**Migrations/Seeds for Development Environment**

If you don't want to install seeds

1. To migrate to the dev database "npx knex migrate:latest"

FOLLOW THIS STEP BY STEP

1. "npx knex migrate:up" -- Adds table into postgres db
2. "npx knex seed:run --specific=001-chapters.js" -- Adds seed into table
3. "npx knex migrate:up"
4. "npx knex seed:run --specific=002-volunteers.js"
5. "npx knex migrate:up"
6. "npx knex seed:run --specific=004-partners.js"
7. "npx knex migrate:up"
8. "npx knex seed:run --specific=005-chapters-partners.js"
9. "npx knex migrate:up"
10. "npx knex migrate:up"
11. "npx knex seed:run --specific=006-users.js"

**Migrations/Seeds for Testing Environment**

If you don't want to install seeds

1. To migrate to the test database "npx knex migrate:latest --env testing"

FOLLOW THIS STEP BY STEP

1. "npx knex migrate:up --env testing" -- Adds table into postgres db
2. "npx knex seed:run --specific=001-chapters.js --env testing" -- Adds seed into table
3. "npx knex migrate:up --env testing"
4. "npx knex seed:run --specific=002-volunteers.js --env testing"
5. "npx knex migrate:up --env testing"
6. "npx knex seed:run --specific=004-partners.js --env testing"
7. "npx knex migrate:up --env testing"
8. "npx knex seed:run --specific=005-chapters-partners.js --env testing"
9. "npx knex migrate:up"
10. "npx knex migrate:up"



==================== LOGIN && REGISTER ENDPOINTS START HERE =======================

**Register a volunteer**
method url: **/api/volunteer/register** 

http method: **[POST]**

**Body**

| name      | type     | required | description                         |  
| --------  | -------  | ------- | ----------------------------------   |
| fname     | String   | Yes      | Must be <= 128 char                 |
| lname     | String   | Yes      | Must be <= 128 char                 |    
| email     | String   | Yes      | Must be unique/ Must be <= 255 char |    
| password  | String   | Yes      | Must be <= 128 char                 |
| phone     | String   | No       | Must be <= 32 char                  |    
| city      | String   | Yes      | Must be <= 64 char                  |  
| state     | String   | Yes      | Must be <= 32 char                  |
| country   | String   | Yes      | Must be <= 32 char                  |    
| comment   | Text     | No       | Must be <= 64 char                  |  
| date      | datetime | Yes      | Must be <= 32 char                  |

*** I am Interested In Section ***

| name          | type        | required  | defaultTo/description |  
| -----------   -----------  | ----------| -------------------    |
| volunteering  | boolean | No           | false                  |    
| donating      | boolean | No           | false                  |  
| joinmm        | boolean | No           | false                  |    
| mediacoverage | boolean | No           | false                  |  
| somethingelse | String  | No           | Must be <= 32 char     |


**Example**

```
{
    fname: 'Bobby',
    lname : 'Frank',
    email: 'b@gmail.com',
    password: '123',
    phone: '878-999-9999',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    comment: 'hello there',
    date: '06-30-2005',
    volunteering: 'false',
    donating: 'false',
    joinmm: 'false',
    mediacoverage: 'true',
    somethingelse: 'false'
}
```

**Response** 200 (created)


**Login a volunteer**
method url: **/api/volunteer/login** 

http method: **[POST]**


**Body**

| name      | type     | required | description                         |  
| --------  | -------  | ------- | ----------------------------------   |
| email     | String   | Yes      | Must be unique/ Must be <= 255 char |    
| password  | String   | Yes      | Must be <= 128 char                 |


**Example**

```
{
    email: 'b@gmail.com',
    password: '123',
}
```

**Response** 200 (created)


==================== CHAPTER ENDPOINTS START HERE =======================

**Post new Chapters**
method url: **/api/chapter/** 

http method: **[POST]**


**Body**

| name             | type     | required | description             |  
| -----------      | -------  | -------  | --------------------    |
| numvolunteers    | Integer  | No       | none                    |    
| longitude        | Double   | Yes      | none                    |
| latitude         | Double   | Yes      | none                    |
| city             | String   | Yes      |  Must be <= 128 char    |    
| title            | String   | Yes      |  Must be <= 128 char    |
| state            | String   | Yes      |  Must be <= 128 char    |    
| numreunions      | Integer  | No       |  none                   |
| msg_recorded     | Integer  | No       |  none                   |    
| msg_delivered    | Integer  | No       |  none                   |
| chapter_img_url  | String   | Yes      |  none                   |    
| reunion_img_url  | String   | No       |  none                   |
| established_date | String   | No       |  none                   |    
| description      | Text     | No       |  none                   |
| story            | Text     | No       |  none                   |    
| email            | String   | Yes      |  none                   |
| facebook         | String   | No       |  none                   | 

**Example**

```
{
numvolunteers: 5,
longitude: 47.6062,
latitude:  122.3321,
city: Seattle, 
title: Seattle Group,
state: Washington,
numreunions: 10,
msg_recorded: 100,
msg_delivered: 120,
chapter_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
reunion_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
established_date: 06-20-2016,
description: "awesome group located in Seattle Washington",
story: "",
email: "chapterstaff@gmail.com",
facebook: "https://www.facebook.com/"
}
```

**Response** 200 (created)


**Put new Chapters**
method url: **/api/chapter/:id** 

http method: **[PUT]**


**Body**

| name             | type     | required | description             |  
| -----------      | -------  | -------  | --------------------    |
| numvolunteers    | Integer  | No       | none                    |    
| longitude        | Double   | Yes      | none                    |
| latitude         | Double   | Yes      | none                    |
| city             | String   | Yes      |  Must be <= 128 char    |    
| title            | String   | Yes      |  Must be <= 128 char    |
| state            | String   | Yes      |  Must be <= 128 char    |    
| numreunions      | Integer  | No       |  none                   |
| msg_recorded     | Integer  | No       |  none                   |    
| msg_delivered    | Integer  | No       |  none                   |
| chapter_img_url  | String   | Yes      |  none                   |    
| reunion_img_url  | String   | No       |  none                   |
| established_date | String   | No       |  none                   |    
| description      | Text     | No       |  none                   |
| story            | Text     | No       |  none                   |    
| email            | String   | Yes      |  none                   |
| facebook         | String   | No       |  none                   | 

**Example**

```
{
numvolunteers: 5,
longitude: 47.6062,
latitude:  122.3321,
city: Seattle, 
title: Seattle Group,
state: Washington,
numreunions: 10,
msg_recorded: 100,
msg_delivered: 120,
chapter_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
reunion_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
established_date: 06-20-2016,
description: "awesome group located in Seattle Washington",
story: "",
email: "chapterstaff@gmail.com",
facebook: "https://www.facebook.com/"
}
```

**Response** 200 (created)


**delete a Chapter**
method url: **/api/chapter/:id** 

http method: **[DELETE]**


**Body**

No Body 

**Example**

```
{
numvolunteers: 5,
longitude: 47.6062,
latitude:  122.3321,
city: Seattle, 
title: Seattle Group,
state: Washington,
numreunions: 10,
msg_recorded: 100,
msg_delivered: 120,
chapter_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
reunion_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
established_date: 06-20-2016,
description: "awesome group located in Seattle Washington",
story: "",
email: "chapterstaff@gmail.com",
facebook: "https://www.facebook.com/"
}
```

**Response** 200 (created)

**get a Chapter**
method url: **/api/chapter/** 

http method: **[GET]**


**Body**

No Body 

**Example**

```
{
numvolunteers: 5,
longitude: 47.6062,
latitude:  122.3321,
city: Seattle, 
title: Seattle Group,
state: Washington,
numreunions: 10,
msg_recorded: 100,
msg_delivered: 120,
chapter_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
reunion_img_url: "https://images.squarespace-cdn.com/content/v1/57e2d6ab440243c69eb9cb95/1573141887647-LR438DECYR8M1B1KOHS7/ke17ZwdGBToddI8pDm48kOVtNrpe7dYbM_JOZaIb8PR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcmmE2WSOo-yNshFv8pHpEIf8HnJS8QicebBj_MVoHD9GLDe_BHBL9JV7OZzPTrWmA/74457563_1512074532278704_1205922294392684544_o.jpg?format=1000w",
established_date: 06-20-2016,
description: "awesome group located in Seattle Washington",
story: "",
email: "chapterstaff@gmail.com",
facebook: "https://www.facebook.com/"
}
```

**Response** 200 (created)


<!-- Because of lack of time we were not able to document all endpoints -->