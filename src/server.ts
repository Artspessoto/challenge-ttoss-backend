import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify();
const port = 3333;

const start = async () => {
    try {
        await app.listen({ port });
        console.log("HTTP Server is running!");
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();