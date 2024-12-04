import { FastifyInstance } from "fastify";
import usersRoutes from "./users.routes";
import { AppError } from "../utils/AppError";

async function routes(fastify: FastifyInstance) {
    fastify.register(usersRoutes, { prefix: "/users" });
    fastify.get("/force-error", async () => {
        throw new AppError("Erro proposital!");
    });
}

export default routes;