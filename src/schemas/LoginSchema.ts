import { z } from "zod";

export const loginSchema = z.object({
    login: z.string().min(3, "O login deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;