"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
const zod_1 = require("zod");
exports.videoSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z
        .string()
        .min(6, "O video deve conter pelo menos 6 caracteres")
        .max(256, "O video pode conter no máximo 256 caracteres"),
    url: zod_1.z.string().url("URL inválida"),
    src: zod_1.z.string().url("Source inválido"),
    rating: zod_1.z.number(),
});
