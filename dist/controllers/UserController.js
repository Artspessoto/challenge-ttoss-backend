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
const UserService_1 = __importDefault(require("../services/UserService"));
const userSchema_1 = require("../validations/schemas/userSchema");
const AppError_1 = require("../utils/AppError");
class UserController {
    constructor() {
        this.userService = new UserService_1.default();
    }
    create(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error, data } = userSchema_1.userSchema.safeParse(req.body);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
            }
            const { name, email, password } = data;
            yield this.userService.createUser({ name, email, password });
            return reply.status(201).send({ message: "Usuário criado 😎👍" });
        });
    }
    update(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error, data } = userSchema_1.updateUserSchema.safeParse(req.body);
            const { id } = req.user;
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
            }
            const { name, email, old_password, password } = data;
            const updatedUser = yield this.userService.updateUser({ name, email, old_password, password }, id);
            return reply.status(200).send({ User: updatedUser });
        });
    }
    list(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUsers = yield this.userService.listAll();
            return reply.status(200).send({ list: listUsers });
        });
    }
}
exports.default = UserController;
