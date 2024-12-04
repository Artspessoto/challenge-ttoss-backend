import { z } from "zod";

export const sessionsSchema = z.object({
  email: z
    .string()
    .email("O formato do e-mail é inválido")
    .max(256, "O e-mail pode conter no máximo 256 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .max(256, "A senha pode conter no máximo 256 caracteres"),
});

export type Session = z.infer<typeof sessionsSchema>;