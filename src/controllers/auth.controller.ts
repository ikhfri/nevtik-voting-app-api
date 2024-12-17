import { Request, Response } from "express";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validation/userSchema";
import { generateToken } from "../libs/jwt";


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { nis, name, password, role } = registerSchema.parse(req.body);

        const exists = await prisma.user.findUnique({
            where: {
                nis
            }
        });
        if (exists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                nis,
                name,
                password: hash,
                role
            }
        });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        });
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
}


export const loginUser = async (req: Request, res: Response) => {
    const { nis, password } = loginSchema.parse(req.body);
    
    try {
        const user = await prisma.user.findUnique({
            where:{nis}
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid NIS or Password" });
        }


        const token = generateToken({
            nis: user.nis,
            name: user.name,
            role: user.role
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000
        })

        const redirectPath = user.role === "ADMIN" ? "/dashboard" : "/vote";
        res.redirect(redirectPath);

        res.status(200).json({ message: "Login successful", user:{
            nis: user.nis,
            name: user.name,
            role: user.role
        },
        redirect : redirectPath
     });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}