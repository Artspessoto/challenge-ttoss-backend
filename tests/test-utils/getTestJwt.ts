import { FastifyInstance } from "fastify";
import { UpdateUser } from "../../src/validations/schemas/userSchema";

export const getTestJwt = (
  user: { id: string; email: string },
  app: FastifyInstance
): string => {
  const token = app.jwt.sign(user);

  return token;
};
