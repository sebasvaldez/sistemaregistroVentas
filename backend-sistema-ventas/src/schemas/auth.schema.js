import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es requerido" })
    .min(8)
    .max(50),
    
  email: z.string({ required_error: "El email es requerido" }).email({
    message: "Email inválido",
  }),
  rol: z.string({ required_error: "El rol es requerido" }),
  password: z
    .string({ required_error: "El password es requerido" })
    .min(8, { message: "El password debe tener al menos 8 caracteres" }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "El email es requerido" }).email({
    message: "Email inválido",
  }),
  password: z
    .string({ required_error: "El password es requerido" })
    .min(8, { message: "El password debe tener al menos 8 caracteres" }),
});


