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

### Installing

A step by step series of examples that tell you how to get a development env running.

Installing the dependencies

```bash
yarn install
```

Create the .env file

```bash
touch .env
```

Then configure your environment variables by editing the .env file

```env
SERVER_HOST="Your server host" (optional)
SERVER_PORT="Your server port" (optional)

DATABASE_URL="Your connection URL to point to your own database."

JWT_SECRET="Your secret password"
JWT_AUDIENCE="Your jwt audience" (optional)
JWT_ISSUER="Your jwt issuer" (optional)
```

For more information about URL connection, visit: [Prisma - Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres)

Applying database migrations

```bash
yarn prisma migrate deploy
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Create the .env.test file

```bash
touch .env.test
```

Then configure your environment variables by editing the .env.test file

```env
SERVER_HOST="Your server host" (optional)
SERVER_PORT="Your server port" (optional)

DATABASE_URL="Your connection URL to point to your own test database."

JWT_SECRET="Your secret password"
JWT_AUDIENCE="Your jwt audience" (optional)
JWT_ISSUER="Your jwt issuer" (optional)
```

For more information about URL connection, visit: [Prisma - Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres)

Running tests

```bash
yarn test
```

## 🎈 Usage <a name="usage"></a>

Execute the command

```bash
yarn start
```

## 🚀 Deployment <a name = "deployment"></a>

Let's use docker compose for application deployment

Execute the command

```bash
docker-compose up
```

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [Typescript](https://www.typescriptlang.org/) - Programming language
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Prisma](https://www.prisma.io/) - Object Relational Mapping (ORM)
- [Jest](https://jestjs.io/) - Test Framework

## ✍️ Author <a name = "author"></a>

- [@igorsilva3](https://github.com/igorsilva3) - Igor Silva

