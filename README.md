# short-link-api
STATELESS REST API, which creates short-link with either random code or with custom code from user. Also redirects on needed short-link if it exists.

## Content
- [Technologies](#technologies)
- [How to use](#how-to-use)
- [Requirements](#requirements)
- [Testing](#testing)
- [Creators](#creators)

## Technologies
- [Fastify](https://fastify.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [pg-typed](https://pgtyped.dev/)
- [jest](https://jestjs.io/ru/)
- [postgresql](https://www.postgresql.org/)

## How to use
Clone the repo with command:
```sh
$ git clone https://github.com/cracksoff/balance-api/tree/main
```

Install dependencies:
```sh
$ npm i -D
```

Create .env file with code provided below:
```
NODE_ENV='development' // u can also use 'production' word or don't write it
PGURI='postgres://postgres:<password>@0.0.0.0:5432/postgres' // change <password> with your postgresql password
POSTGRES_URL='postgres://postgres:<password>@0.0.0.0:5432/postgres'
```

Use SQL script from short_urls.sql in your db, to create postgres dump with 1 table, 2 indexes, 2 functions and 1 trigger

Launch:
```sh
$ npm run start
```

## Testing
I used Jest to test application, u can run code below to see 70%+ coverage of tests.
```sh
$ npm run test
```

### Requirements
To install and launch project you need [NodeJS](https://nodejs.org/) 13.x or higher and [Typescript](https://www.typescriptlang.org/download) 5.x or higher.

### Why did you develop this project?
I've created this project to practice my skills with database and REST API.

## Creators
- [Yaroslav Mikhaylov](https://t.me/cracksoff) — Back-End Engineer
