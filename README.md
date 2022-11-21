<h1 align="center">Tech challenge</h3>

---

<p align="center">A backend application, dockerized, whose objective is to enable NG users to be able to perform internal transfers between themselves.
    <br> 
</p>

## 📝 Table of Contents

- [Getting Started](#getting_started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running the tests](#tests)
- [Usage](#usage)
- [Deployment](#deployment)
- [Author](#author)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

These programs installed on your machine:
  - [NodeJS v16.17.1](https://nodejs.org/en/download/)
  - [Postgresql](https://www.postgresql.org/download/)
  - [Yarn](https://classic.yarnpkg.com/en/docs/install)
  
#### Envrionments file configuration

Create the environment files for production, development and test

```bash
touch .env .env.development .env.test
```

Then configure your environment variables by editing each file

_Editing .env file_

```env
POSTGRES_USER="Your postgres user"
POSTGRES_PASSWORD="Your postgres password"
POSTGRES_DB="Your postgres database"

DATABASE_URL="postgres://${YOUR_POSTGRES_USER}:${YOUR_POSTGRES_PASSWORD}@postgres:5432/${YOUR_POSTGRES_DB}?schema=public"

JWT_SECRET="Your secret password"
JWT_AUDIENCE="Your jwt audience" (optional)
JWT_ISSUER="Your jwt issuer" (optional)

SERVER_HOST="Your server host" (optional)
SERVER_PORT="Your server port" (optional)
```
---
_Editing .env.development file_

```env
DATABASE_URL="postgres://${YOUR_POSTGRES_USER}:${YOUR_POSTGRES_PASSWORD}@localhost:5432/${YOUR_POSTGRES_DB}?schema=public"

JWT_SECRET="Your secret password"
JWT_AUDIENCE="Your jwt audience" (optional)
JWT_ISSUER="Your jwt issuer" (optional)

SERVER_HOST="Your server host" (optional)
SERVER_PORT="Your server port" (optional)
```
---
_Editing .env.test file_

```env
DATABASE_URL="postgres://${YOUR_POSTGRES_USER}:${YOUR_POSTGRES_PASSWORD}@localhost:5432/${YOUR_POSTGRES_TEST_DB}?schema=public"

JWT_SECRET="Your secret password"
JWT_AUDIENCE="Your jwt audience" (optional)
JWT_ISSUER="Your jwt issuer" (optional)

SERVER_HOST="Your server host" (optional)
SERVER_PORT="Your server port" (optional)
```

For more information about URL connection, visit: [Prisma - Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres)

### Installing

A step by step series of examples that tell you how to get a development env running.

Installing the dependencies

```bash
yarn install
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Execute the command to run the tests

```bash
yarn test
```

## 🎈 Usage <a name="usage"></a>

Execute the command

```bash
yarn dev
```

Access the application: http://localhost:3000/ OR http://localhost:{YOUR_SERVER_PORT}/

## 🚀 Deployment <a name = "deployment"></a>

Let's use docker compose for application deployment

Execute the command

```bash
docker-compose up
```

Access the application: http://localhost:3000/

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [Typescript](https://www.typescriptlang.org/) - Programming language
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Prisma](https://www.prisma.io/) - Object Relational Mapping (ORM)
- [Jest](https://jestjs.io/) - Test Framework
- [Swagger](https://swagger.io/) - API DOCS Framework

## ✍️ Author <a name = "author"></a>

- [@igorsilva3](https://github.com/igorsilva3) - Igor Silva

