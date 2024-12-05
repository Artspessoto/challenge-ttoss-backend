import { z } from "zod";

export const videoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(6, "O video deve conter pelo menos 6 caracteres")
    .max(256, "O video pode conter no máximo 256 caracteres"),
  url: z.string().url("URL inválida"),
  src: z.string().url("Source inválido"),
  rating: z.number(),
});

export type Video = z.infer<typeof videoSchema>;
