"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("./AppError");
const env_1 = require("../validations/env");
const errorHandler = (error, request, reply) => {
    const isDevelopment = env_1.env.NODE_ENV === "development";
    if (error instanceof AppError_1.AppError) {
        reply.status(error.statusCode).send({
            status: "Error",
            message: isDevelopment
                ? error.message
                : "Ocorreu um erro na sua solicitação.",
        });
    }
    else {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        reply.status(500).send({
            status: "Error",
            message: isDevelopment
                ? errorMessage
                : "Ocorreu um erro interno. Tente novamente mais tarde",
        });
    }
};
exports.errorHandler = errorHandler;
