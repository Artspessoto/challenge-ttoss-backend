"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const userSchema_1 = require("../validations/schemas/userSchema");
const AppError_1 = require("../utils/AppError");
class UserController {
    constructor() {
        this.userService = new UserService_1.default();
    }
    async create(req, reply) {
        const { success, error, data } = userSchema_1.userSchema.safeParse(req.body);
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
        }
        const { name, email, password } = data;
        await this.userService.createUser({ name, email, password });
        return reply.status(201).send({ message: "Usuário criado 😎👍" });
    }
    async update(req, reply) {
        const { success, error, data } = userSchema_1.updateUserSchema.safeParse(req.body);
        const { id } = req.user;
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
        }
        const { name, email, old_password, password } = data;
        const updatedUser = await this.userService.updateUser({ name, email, old_password, password }, id);
        return reply.status(200).send({ User: updatedUser });
    }
}
exports.default = UserController;
