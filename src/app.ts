import fastify, { FastifyInstance } from "fastify";
import { errorHandler } from "./utils/errorHandler";
import routes from "./routes";
import { cookiePlugin } from "./plugins/cookiePlugin";
import { jwtPlugin } from "./plugins/jwtPlugin";
import cors from "@fastify/cors";

const app: FastifyInstance = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

cookiePlugin(app);
jwtPlugin(app);

app.register(routes);
app.setErrorHandler(errorHandler);

export { app };
