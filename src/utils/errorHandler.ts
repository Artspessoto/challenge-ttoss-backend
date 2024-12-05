import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "./AppError";
import { env } from "../validations/env";

export const errorHandler = (
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const isDevelopment = env.NODE_ENV === "development" || "test";

  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      status: "Error",
      message: isDevelopment
        ? error.message
        : "Ocorreu um erro na sua solicitação.",
    });
  } else {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    reply.status(500).send({
      status: "Error",
      message: isDevelopment
        ? errorMessage
        : "Ocorreu um erro interno. Tente novamente mais tarde",
    });
  }
};
