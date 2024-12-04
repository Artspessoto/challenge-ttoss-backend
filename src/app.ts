import fastify, { FastifyInstance } from "fastify";
import { errorHandler } from "./utils/errorHandler";
import routes from "./routes";

const app: FastifyInstance = fastify();

app.register(routes)
app.setErrorHandler(errorHandler);

export { app };