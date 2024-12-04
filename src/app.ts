import fastify, { FastifyInstance } from "fastify";
import { errorHandler } from "./utils/errorHandler";

const app: FastifyInstance = fastify();
app.setErrorHandler(errorHandler);

export { app };