import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../validations/env";
import { AppError } from "./AppError";

export const errorHandler = (
  error: unknown,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const isDevelopmentMode = env.NODE_ENV === "development";

  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      status: "Error",
      message: isDevelopmentMode
        ? error.message
        : "An error occurred in your request",
      stack: isDevelopmentMode ? error.stack : undefined,
    });
  } else {
    const errorMessage =
      error instanceof Error ? error.message : "Unknow error";

    if (!isDevelopmentMode) {
      console.error(error);
    }

    reply.status(500).send({
      status: "Error",
      message: isDevelopmentMode
        ? errorMessage
        : "An internal error has occurred. Please try again later",
      stack: isDevelopmentMode
        ? error instanceof Error
          ? error.stack
          : ""
        : undefined,
    });
  }
};
