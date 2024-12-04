import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
  email: z
    .string()
    .email("O formato do e-mail é inválido")
    .max(256, "O e-mail pode conter no máximo 256 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .max(256, "A senha pode conter no máximo 256 caracteres"),
});

export const updateUserSchema = userSchema
  .pick({
    id: true,
    name: true,
    email: true,
  })
  .extend({
    old_password: z.string().optional(),

    password: z
      .string()
      .min(6, "A senha deve conter pelo menos 6 caracteres")
      .max(256, "A senha pode conter no máximo 256 caracteres")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.old_password) {
        return false;
      }
      return true;
    },
    {
      message: "A senha antiga é obrigatória quando a nova senha é fornecida",
      path: ["password"],
    }
  );

export type User = z.infer<typeof userSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
