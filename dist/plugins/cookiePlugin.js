"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJwtCookie = exports.cookiePlugin = void 0;
const cookie_1 = __importDefault(require("@fastify/cookie"));
const env_1 = require("../validations/env");
const cookiePlugin = async (app) => {
    app.register(cookie_1.default);
};
exports.cookiePlugin = cookiePlugin;
const setJwtCookie = (reply, token) => {
    reply.setCookie("token", token, {
        httpOnly: true,
        secure: env_1.env.NODE_ENV === "production",
        sameSite: 'none',
    });
};
exports.setJwtCookie = setJwtCookie;
