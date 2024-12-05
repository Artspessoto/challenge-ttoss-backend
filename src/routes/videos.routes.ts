import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import VideoController from "../controllers/VideoController";
import { ensuredAuthenticated } from "../middlewares/ensuredAuthenticated";

const videoController = new VideoController();

async function videoRoutes(fastify: FastifyInstance) {
  fastify.get("/list", async (req: FastifyRequest, reply: FastifyReply) => {
    return videoController.list(req, reply);
  });
  fastify.get("/elo", async (req: FastifyRequest, reply: FastifyReply) => {
    return videoController.listByElo(req, reply);
  });
  fastify.get("/two", async (req: FastifyRequest, reply: FastifyReply) => {
    return videoController.twoVideos(req, reply);
  });
  fastify.post(
    "/",
    { preHandler: [ensuredAuthenticated] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return videoController.create(req, reply);
    }
  );
  fastify.patch("/update", async (req: FastifyRequest, reply: FastifyReply) => {
    return videoController.update(req, reply);
  });
}

export default videoRoutes;
