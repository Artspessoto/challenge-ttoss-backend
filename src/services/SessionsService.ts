import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { setJwtCookie } from "../plugins/cookiePlugin";
import { FastifyReply } from "fastify";
import { app } from "../app";
import SessionsRepository from "../repositories/SessionsRepository";
import { Session, sessionsSchema } from "../validations/schemas/sessionsSchema";

class SessionService {
  private sessionsRepository: SessionsRepository;

  constructor() {
    this.sessionsRepository = new SessionsRepository();
  }

  public async signIn(
    data: Session,
    reply: FastifyReply
  ): Promise<{ accessToken: string }> {
    const { success, error } = sessionsSchema.safeParse(data);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(" ,"));
    }

    const userExists = await this.sessionsRepository.findByEmail(data.email);

    if (!userExists) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(data.password, userExists.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const payload = {
      id: userExists.id,
      email: userExists.email,
    };

    const token = app.jwt.sign(payload);

    setJwtCookie(reply, token);

    return { accessToken: token };
  }
}

export default SessionService;
