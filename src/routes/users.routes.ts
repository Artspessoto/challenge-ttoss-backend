import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/UserController";

const userController = new UserController();

async function usersRoutes(fastify: FastifyInstance) {
  fastify.post("/", (req: FastifyRequest, reply: FastifyReply) => {
    userController.create(req, reply);
  });
}

export default usersRoutes;
