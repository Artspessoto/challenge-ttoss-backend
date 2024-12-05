import fastify, { FastifyInstance } from "fastify";
import { errorHandler } from "./utils/errorHandler";
import routes from "./routes";
import { cookiePlugin } from "./plugins/cookiePlugin";
import { jwtPlugin } from "./plugins/jwtPlugin";
import { ensuredAuthenticated } from "./middlewares/ensuredAuthenticated";

const app: FastifyInstance = fastify();

cookiePlugin(app);
jwtPlugin(app);
app.addHook('preHandler', ensuredAuthenticated)

app.register(routes);
app.setErrorHandler(errorHandler);

export { app };
