"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensuredAuthenticated = void 0;
const AppError_1 = require("../utils/AppError");
const ensuredAuthenticated = async (req, _reply) => {
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
};
exports.ensuredAuthenticated = ensuredAuthenticated;
