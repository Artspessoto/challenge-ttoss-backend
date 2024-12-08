# ttoss-api

## Description

API for voting on YouTube videos using Fastify.

## How to run the project

### 1. **Create the file `.env`**
Copy the contents of `.env.example` to a new file named `.env` in the root directory.

### 1.1. **Configure the `.env` file**
- `DATABASE_URL`: Your database connection URL.
- `DIRECT_URL`: A direct URL for your application.
- `PORT`: The port your application will run on (default: `4444`).
- `NODE_ENV`: Set the environment (`development`, `production`, etc.).
- `JWT_SECRET`: A secret key for signing JWTs (replace with your own secret key).

### 2. **Install the dependencies with NPM:**

```
npm install
```

### 3. **Start the server with:**

```
npm run dev
```

### 4. **Test with:**

```
npm run test
```

## Technologies used

- **Fastify**: A fast and low-overhead web framework for Node.js.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **Zod**: TypeScript-first schema declaration and validation.
- **Bcrypt**: Password hashing library.
- **JWT**: JSON Web Tokens for secure authentication.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
- **dotenv**: Module to load environment variables from a `.env` file.
- **tsx**: TypeScript execution and transpiling.

## Scripts

- `dev`: Run the development server with `tsx` in watch mode.
- `test`: Run the test using Vitest + Supertest.
- `prisma:init`: Initialize Prisma configuration.
- `prisma:generate`: Generate Prisma client.
- `prisma:migrate`: Run Prisma database migrations.
