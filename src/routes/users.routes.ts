import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/UserController";

const userController = new UserController();

async function usersRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
      return userController.create(req, reply);
  });
}

export default usersRoutes;
