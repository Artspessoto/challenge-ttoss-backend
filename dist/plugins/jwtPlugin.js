"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtPlugin = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const AppError_1 = require("../utils/AppError");
const jwtPlugin = async (app) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError_1.AppError("Sou um bule de chá e não tenho acesso ao JWT_SECRET", 418);
    }
    app.register(jwt_1.default, {
        secret: process.env.JWT_SECRET,
        sign: {
            expiresIn: "8h",
        },
    });
};
exports.jwtPlugin = jwtPlugin;
