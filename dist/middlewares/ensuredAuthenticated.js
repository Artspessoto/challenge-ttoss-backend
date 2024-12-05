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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensuredAuthenticated = void 0;
const AppError_1 = require("../utils/AppError");
const ensuredAuthenticated = (req, _reply) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        throw new AppError_1.AppError("Usuário não autenticado", 401);
    }
    try {
        const decoded = req.server.jwt.verify(token);
        req.user = { id: decoded.id, email: decoded.email };
    }
    catch (error) {
        throw new AppError_1.AppError("Token inválido!", 400);
    }
});
exports.ensuredAuthenticated = ensuredAuthenticated;
