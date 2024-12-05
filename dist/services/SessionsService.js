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
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = require("bcrypt");
const cookiePlugin_1 = require("../plugins/cookiePlugin");
const app_1 = require("../app");
const SessionsRepository_1 = __importDefault(require("../repositories/SessionsRepository"));
const sessionsSchema_1 = require("../validations/schemas/sessionsSchema");
class SessionService {
    constructor() {
        this.sessionsRepository = new SessionsRepository_1.default();
    }
    signIn(data, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error } = sessionsSchema_1.sessionsSchema.safeParse(data);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(" ,"));
            }
            const userExists = yield this.sessionsRepository.findByEmail(data.email);
            if (!userExists) {
                throw new AppError_1.AppError("E-mail e/ou senha incorreta.", 401);
            }
            const passwordMatched = yield (0, bcrypt_1.compare)(data.password, userExists.password);
            if (!passwordMatched) {
                throw new AppError_1.AppError("E-mail e/ou senha incorreta.", 401);
            }
            const payload = {
                id: userExists.id,
                email: userExists.email,
            };
            const token = app_1.app.jwt.sign(payload);
            (0, cookiePlugin_1.setJwtCookie)(reply, token);
            return { accessToken: token };
        });
    }
}
exports.default = SessionService;
