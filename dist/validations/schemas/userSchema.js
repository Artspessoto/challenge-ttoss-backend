"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
    email: zod_1.z
        .string()
        .email("O formato do e-mail é inválido")
        .max(256, "O e-mail pode conter no máximo 256 caracteres"),
    password: zod_1.z
        .string()
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .max(256, "A senha pode conter no máximo 256 caracteres"),
});
exports.updateUserSchema = exports.userSchema
    .pick({
    id: true,
    name: true,
    email: true,
})
    .extend({
    old_password: zod_1.z.string().optional(),
    password: zod_1.z
        .string()
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .max(256, "A senha pode conter no máximo 256 caracteres")
        .optional(),
})
    .refine((data) => {
    if (data.password && !data.old_password) {
        return false;
    }
    return true;
}, {
    message: "A senha antiga é obrigatória quando a nova senha é fornecida",
    path: ["password"],
});
