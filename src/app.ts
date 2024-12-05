import fastify, { FastifyInstance } from "fastify";
import { errorHandler } from "./utils/errorHandler";
import routes from "./routes";
import { cookiePlugin } from "./plugins/cookiePlugin";
import { jwtPlugin } from "./plugins/jwtPlugin";

const app: FastifyInstance = fastify();

cookiePlugin(app);
jwtPlugin(app);

app.register(routes);
app.setErrorHandler(errorHandler);

export { app };
