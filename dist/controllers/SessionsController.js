"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionsService_1 = __importDefault(require("../services/SessionsService"));
class SessionsController {
    constructor() {
        this.sessionsService = new SessionsService_1.default();
    }
    async create(req, reply) {
        const { email, password } = req.body;
        const { accessToken } = await this.sessionsService.signIn({ email, password }, reply);
        reply.status(200).send({ accessToken });
    }
}
exports.default = SessionsController;
