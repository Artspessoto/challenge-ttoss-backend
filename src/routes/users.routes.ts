import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/UserController";
import { ensuredAuthenticated } from "../middlewares/ensuredAuthenticated";

const userController = new UserController();

async function usersRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return userController.create(req, reply);
  });
  fastify.put(
    "/",
    { preHandler: [ensuredAuthenticated] },
    (req: FastifyRequest, reply: FastifyReply) => {
      return userController.update(req, reply);
    }
  );
}

export default usersRoutes;
