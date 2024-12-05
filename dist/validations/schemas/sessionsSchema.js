"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsSchema = void 0;
const zod_1 = require("zod");
exports.sessionsSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("O formato do e-mail é inválido")
        .max(256, "O e-mail pode conter no máximo 256 caracteres"),
    password: zod_1.z
        .string()
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .max(256, "A senha pode conter no máximo 256 caracteres"),
});
