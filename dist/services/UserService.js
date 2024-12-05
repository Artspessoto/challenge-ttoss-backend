"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AppError_1 = require("../utils/AppError");
const userSchema_1 = require("../validations/schemas/userSchema");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    async createUser(data) {
        const { success, error } = userSchema_1.userSchema.safeParse(data);
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "), 400);
        }
        const emailExists = await this.userRepository.findByEmail(data.email);
        if (emailExists) {
            throw new AppError_1.AppError("Este e-mail já está em uso");
        }
        const hashedPassword = await (0, bcrypt_1.hash)(data.password, 8);
        const { name, email } = data;
        const newUser = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return newUser;
    }
    async updateUser(data, userId) {
        const { success, error } = userSchema_1.updateUserSchema.safeParse(data);
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
        }
        const user = await this.userRepository.findByUser(userId);
        if (!user) {
            throw new AppError_1.AppError("Usuário não encontrado", 404);
        }
        const userWithUpdateEmail = await this.userRepository.findByEmail(data.email);
        if (userWithUpdateEmail && userWithUpdateEmail.id !== userId) {
            throw new AppError_1.AppError("Este e-mail já está em uso.");
        }
        user.name = data.name ?? user.name;
        user.email = data.email ?? user.email;
        if (data.password && data.old_password) {
            const checkOldPassword = await (0, bcrypt_1.compare)(data.old_password, user.password);
            if (!checkOldPassword)
                throw new AppError_1.AppError("A senha antiga não confere.");
            user.password = await (0, bcrypt_1.hash)(data.password, 8);
        }
        const updatedData = {
            name: user.name,
            email: user.email,
            password: user.password,
        };
        const updateUser = await this.userRepository.update(updatedData, userId);
        return updateUser;
    }
}
exports.default = UserService;
