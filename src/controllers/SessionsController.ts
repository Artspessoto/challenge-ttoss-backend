import { FastifyRequest, FastifyReply } from "fastify";
import { Session, sessionsSchema } from "../validations/schemas/sessionsSchema";
import SessionService from "../services/SessionsService";

class SessionsController {
  private sessionsService: SessionService;

  constructor() {
    this.sessionsService = new SessionService();
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as Session;

    const { accessToken } = await this.sessionsService.signIn(
      { email, password },
      reply
    );

    reply.status(200).send({ accessToken });
  }
}

export default SessionsController;
