import fastify, { FastifyInstance } from "fastify";
import { env } from "./validations/env";

const app: FastifyInstance = fastify();

const start = async () => {
    try {
        await app.listen({ port: env.PORT });
        console.log("HTTP Server is running!");
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();