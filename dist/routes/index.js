"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_routes_1 = __importDefault(require("./users.routes"));
const AppError_1 = require("../utils/AppError");
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const videos_routes_1 = __importDefault(require("./videos.routes"));
async function routes(fastify) {
    fastify.register(users_routes_1.default, { prefix: "/users" });
    fastify.register(sessions_routes_1.default, { prefix: "/sessions" });
    fastify.register(videos_routes_1.default, { prefix: "/videos" });
    fastify.get("/force-error", async () => {
        throw new AppError_1.AppError("Erro proposital!");
    });
    fastify.get("/", async () => {
        return { message: "ttoss API" };
    });
}
exports.default = routes;
