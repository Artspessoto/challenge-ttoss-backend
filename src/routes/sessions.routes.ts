import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SessionsController from "../controllers/SessionsController";

const sessionsController = new SessionsController();

async function sessionsRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return sessionsController.create(req, reply);
  });
}

export default sessionsRoutes;
