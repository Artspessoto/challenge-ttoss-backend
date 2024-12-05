import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";

export interface AuthUser {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const ensuredAuthenticated = async (
  req: FastifyRequest,
  _reply: FastifyReply
) => {
  const token = req.cookies.token;

  if (!token || token == '') {
    throw new AppError("Usuário não autenticado", 401);
  }

  try {
    const decoded: AuthUser = req.server.jwt.verify(token);
    req.user = { id: decoded.id, email: decoded.email };
  } catch (error) {
    throw new AppError("Token inválido!", 400);
  }
};
