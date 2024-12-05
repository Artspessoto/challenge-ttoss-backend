"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionsController_1 = __importDefault(require("../controllers/SessionsController"));
const sessionsController = new SessionsController_1.default();
async function sessionsRoutes(fastify) {
    fastify.post("/", async (req, reply) => {
        return sessionsController.create(req, reply);
    });
}
exports.default = sessionsRoutes;
