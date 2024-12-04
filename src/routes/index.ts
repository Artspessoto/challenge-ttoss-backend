import { FastifyInstance } from "fastify";
import usersRoutes from "./users.routes";

async function routes(fastify: FastifyInstance) {
    fastify.register(usersRoutes, { prefix: "/users" });
}

export default routes;