import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),

  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),

  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password harus mengandung huruf besar, kecil, dan angka"
    ),

  notelp: z
    .string()
    .min(1, "Nomor telepon harus diisi")
    .regex(/^\d+$/, "Nomor telepon harus angka"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
