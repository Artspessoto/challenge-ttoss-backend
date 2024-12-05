import { FastifyInstance } from "fastify";
import { UpdateUser } from "../../src/validations/schemas/userSchema";

export const getTestJwt = (user: UpdateUser, app: FastifyInstance): string => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = app.jwt.sign(payload);

  return token;
};
