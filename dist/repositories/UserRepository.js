"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
class UserRepository {
    async findByEmail(email) {
        return prismaClient_1.default.user.findUnique({
            where: { email },
        });
    }
    async findByUser(userId) {
        return prismaClient_1.default.user.findUnique({
            where: { id: userId },
        });
    }
    async create(data) {
        const user = prismaClient_1.default.user.create({ data });
        return user;
    }
    async update(data, userId) {
        const user = prismaClient_1.default.user.update({
            where: { id: userId },
            data,
        });
        return user;
    }
}
exports.default = UserRepository;
