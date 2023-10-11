# profi-tz-back
 to launch you need:
 1) Write:
 ```
npm i -D
```
 2) Provide
 ```
NODE_ENV='development'
PGURI='postgres://postgres:<password>@0.0.0.0:5432/postgres'
POSTGRES_URL='postgres://postgres:<password>@0.0.0.0:5432/postgres'
```
in .env file

3) Use SQL script from short_urls.sql in your db, to create postgres dump with 1 table, 2 indexes, 2 functions and 1 trigger
4) Launch with ```npm run watch/start/start:dev```
