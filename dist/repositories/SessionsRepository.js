"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
class SessionsRepository {
    async findByEmail(email) {
        return prismaClient_1.default.user.findUnique({
            where: { email },
        });
    }
}
exports.default = SessionsRepository;
