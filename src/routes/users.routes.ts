import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

async function usersRoutes(fastify: FastifyInstance) {
    fastify.post("/", (req: FastifyRequest, reply: FastifyReply) => {
        console.log("...");
    })
}

export default usersRoutes;