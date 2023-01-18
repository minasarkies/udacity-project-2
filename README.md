# Udacity: Build A Storefront Backend
#### Summary

> The company's stakeholders have decided that they want to create an online store where their product ideas can be purchased – and they want me and a coworker to build it.
> The stakeholders have compiled a list of prerequisites for this online store. My coworker will build the frontend, while I will `provide the backend`, and the requirements have been compiled into a requirements document.
> I'll `build the database`, including tables and columns, to meet the data requirements, and then `write a RESTful API` to expose that information to the frontend developer.
> In order to be ready for beta testing, my application needs to `have tests`, `secure user information`, and `provide user authentication tokens` that are ready to integrate with the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation 
`npm install`

### Packages

- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [Typescript](https://github.com/microsoft/TypeScript)
- [Jasmine](https://github.com/jasmine/jasmine)
- [PostgreSQL](https://github.com/postgres/postgres)
- [db-migrate]
- [g]
- [rimraf]
- [cors]
- [bcrypt]
- [morgan]
- [jsonwebtoken]
- [cross-env]
- [supertest]
## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
    - Grant for test database
        - `\c shopping_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

### Migrate Database
To apply all the required migrations
`npm run dev-up`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. 

DB_NAME = shopping
DB_NAME_TEST = shopping_test
DB_HOST = localhost
DB_PORT = 5432
DB_USER = shopping_user
DB_PASS= password123

BCRYPT_PASSWORD=hello-from-the-other-side
SALT_ROUNDS=10
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
JWT_SECRET = 5ae8adc9731627905ebf0905dbe4a114ba7d8354ae1796772dfa523a2142761b78d48cbfcd98000bb94fbdbd8147f30de6b3484c3a060d389068204df6a50630
ENV = dev


## Start App
`npm run start`

### Running Ports 
Server ->   port `3000` 
database -> port `5432`

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 
`npm run test`

