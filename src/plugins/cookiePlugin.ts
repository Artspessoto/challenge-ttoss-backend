import fCookie from "@fastify/cookie";
import { FastifyInstance, FastifyReply } from "fastify";
import { env } from "../validations/env";

export const cookiePlugin = async (app: FastifyInstance) => {
  app.register(fCookie);
};

export const setJwtCookie = (reply: FastifyReply, token: string) => {
  reply.setCookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: 'none',
  });
};
