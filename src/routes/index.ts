import { FastifyInstance } from "fastify";
import usersRoutes from "./users.routes";
import { AppError } from "../utils/AppError";
import sessionsRoutes from "./sessions.routes";
import videoRoutes from "./videos.routes";

async function routes(fastify: FastifyInstance) {
  fastify.register(usersRoutes, { prefix: "/users" });
  fastify.register(sessionsRoutes, { prefix: "/sessions" });
  fastify.register(videoRoutes, { prefix: "/videos" });
  fastify.get("/force-error", async () => {
    throw new AppError("Erro proposital!");
  });
  fastify.get("/", async () => {
    return { message: "ttoss API" };
  });
}

export default routes;
