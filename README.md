# Node Express Start Project

Node start project using: Express, Node.js, sqlite, swagger, etc.

## Prerequisites

Node.js NPM and Express.JS

- [Node.js](https://nodejs.org/en/) - Server Environment
- [NPM](https://www.npmjs.com/) - Package Manager
- [ExpressJS](http://expressjs.com/) - Web Framework for Node.js
- [Sqlite](https://www.sqlite.org/) - SQL database
- [Swagger](https://swagger.io/) - Design, build, document and consume REST APIs

## Installing

```
Clone the repo: `git clone git@github.com:eltonmoraes6/node-start-project.git`
```

```
Environment variables
```

Create `.env.development, .env.production and .env.test` files on the root directory of your project, and add the following
environment-specific variables on new lines in the form of `NAME=VALUE`:

```dosini
PORT=5000
SECRET=754654654654654686
REFRESH_TOKEN_SECRET=754654654654654686
```

For more information on how to configure `environment-specific variables` access [dotenv](https://github.com/motdotla/dotenv/).

```
Install dependencies: `npm install`
```

```
Start the server: `npm start`
```

## consuming api:

You can use [Postman](https://www.getpostman.com) or [Insomnia](https://insomnia.rest/download/).
