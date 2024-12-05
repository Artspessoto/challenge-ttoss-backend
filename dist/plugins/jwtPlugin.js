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
exports.jwtPlugin = void 0;
require("dotenv/config");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const AppError_1 = require("../utils/AppError");
const jwtPlugin = (app) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET) {
        throw new AppError_1.AppError("Sou um bule de chá e não tenho acesso ao JWT_SECRET", 418);
    }
    app.register(jwt_1.default, {
        secret: process.env.JWT_SECRET,
        sign: {
            expiresIn: "8h",
        },
    });
});
exports.jwtPlugin = jwtPlugin;
