import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";

export interface AuthUser {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const ensuredAuthenticated = (app: FastifyInstance) => {
  app.addHook(
    "preHandler",
    (req: FastifyRequest, _reply: FastifyReply, done: () => void) => {
      const token = req.cookies.token;

      if (!token) {
        throw new AppError("Usuário não autenticado", 401);
      }

      try {
        const decoded: AuthUser = app.jwt.verify(token);
        req.user = { id: decoded.id, email: decoded.email };
      } catch (error) {
        throw new AppError("Token inválido!", 400);
      }

      done();
    }
  );
};
