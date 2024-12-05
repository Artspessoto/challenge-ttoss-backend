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
const bcrypt_1 = require("bcrypt");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AppError_1 = require("../utils/AppError");
const userSchema_1 = require("../validations/schemas/userSchema");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error } = userSchema_1.userSchema.safeParse(data);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "), 400);
            }
            const emailExists = yield this.userRepository.findByEmail(data.email);
            if (emailExists) {
                throw new AppError_1.AppError("Este e-mail já está em uso");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(data.password, 8);
            const { name, email } = data;
            const newUser = yield this.userRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            return newUser;
        });
    }
    updateUser(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { success, error } = userSchema_1.updateUserSchema.safeParse(data);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
            }
            const user = yield this.userRepository.findByUser(userId);
            if (!user) {
                throw new AppError_1.AppError("Usuário não encontrado", 404);
            }
            const userWithUpdateEmail = yield this.userRepository.findByEmail(data.email);
            if (userWithUpdateEmail && userWithUpdateEmail.id !== userId) {
                throw new AppError_1.AppError("Este e-mail já está em uso.");
            }
            user.name = (_a = data.name) !== null && _a !== void 0 ? _a : user.name;
            user.email = (_b = data.email) !== null && _b !== void 0 ? _b : user.email;
            if (data.password && data.old_password) {
                const checkOldPassword = yield (0, bcrypt_1.compare)(data.old_password, user.password);
                if (!checkOldPassword)
                    throw new AppError_1.AppError("A senha antiga não confere.");
                user.password = yield (0, bcrypt_1.hash)(data.password, 8);
            }
            const updatedData = {
                name: user.name,
                email: user.email,
                password: user.password,
            };
            const updateUser = yield this.userRepository.update(updatedData, userId);
            return updateUser;
        });
    }
}
exports.default = UserService;
