import {z} from "zod";

export const loginSchema = z.object({
    nis: z.string().min(11, "NIS is Required"),
    password: z.string().min(6).max(8, "Password must be less than 20 characters")
})

export const registerSchema = z.object({
    nis: z.string().min(11, "NIS is Required"),
    name: z.string().min(1, "Name is Required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "USER"]).default("USER")
})

