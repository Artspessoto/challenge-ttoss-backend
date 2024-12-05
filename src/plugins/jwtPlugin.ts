import { FastifyInstance } from "fastify";
import "dotenv/config";
import fjwt from "@fastify/jwt";
import { AppError } from "../utils/AppError";

export const jwtPlugin = async (app: FastifyInstance) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError(
      "Sou um bule de chá e não tenho acesso ao JWT_SECRET",
      418
    );
  }

  await app.register(fjwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: "8h",
    },
  });
};
