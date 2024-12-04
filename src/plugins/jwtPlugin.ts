import { FastifyInstance } from "fastify";
import fjwt from "@fastify/jwt";

export const jwtPlugin = async (app: FastifyInstance) => {
  app.register(fjwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: "8h",
    },
  });
};
