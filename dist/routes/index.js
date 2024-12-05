"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_routes_1 = __importDefault(require("./users.routes"));
const AppError_1 = require("../utils/AppError");
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const videos_routes_1 = __importDefault(require("./videos.routes"));
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.register(users_routes_1.default, { prefix: "/users" });
        fastify.register(sessions_routes_1.default, { prefix: "/sessions" });
        fastify.register(videos_routes_1.default, { prefix: "/videos" });
        fastify.get("/force-error", () => __awaiter(this, void 0, void 0, function* () {
            throw new AppError_1.AppError("Erro proposital!");
        }));
        fastify.get("/", () => __awaiter(this, void 0, void 0, function* () {
            return { message: "ttoss API" };
        }));
    });
}
exports.default = routes;
