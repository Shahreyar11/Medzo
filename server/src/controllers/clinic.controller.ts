import config from '../config/config'
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import { Request, Response } from "express"
import prisma from "../lib/prisma";

// Helper function to generate REG- number
const generateRegistrationNumber = () => {
    return `REG-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const handleClinicRegsiter = async (req: Request, res: Response) => {
    try {
        // Notice: registrationNumber is removed from req.body
        const {
            clinicName,
            clinicOwnerName,
            address,
            phone,
            password,
            email
        } = req.body

        const isEmailPhoneTaken = await prisma.clinic.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (isEmailPhoneTaken) {
            if (isEmailPhoneTaken.email === email) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                })
            }
            if (isEmailPhoneTaken.phone === phone) {
                return res.status(400).json({
                    success: false,
                    message: "Mobile Number already registered"
                })
            }
        }

        // Generate a unique registration number
        let registrationNumber = generateRegistrationNumber();
        let isUnique = false;
        
        while (!isUnique) {
            const existingReg = await prisma.clinic.findFirst({ where: { registrationNumber } });
            if (!existingReg) {
                isUnique = true;
            } else {
                registrationNumber = generateRegistrationNumber();
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newClinic = await prisma.clinic.create({
            data: {
                registrationNumber, // Injected here
                clinicName,
                clinicOwnerName,
                address,
                phone,
                email,
                passwordHash: hashedPassword
            }
        })

        return res.status(201).json({
            success: true,
            message: "Registration successful. Your clinic will be verified by our admin team shortly.",
            registrationNumber: newClinic.registrationNumber, // Sent to frontend for the toast!
            email: newClinic.email,
        })

    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const handleClinicLogin = async (req: Request, res: Response) => {
    try {
        // Accept both from the frontend
        const { registrationNumber, email, password } = req.body

        if (!password || (!registrationNumber && !email)) {
            return res.status(400).json({
                success: false,
                message: "Identifier (Email/Reg Number) and password are required"
            })
        }

        // Search by whichever one the user provided
        const clinic = await prisma.clinic.findFirst({
            where: {
                OR: [
                    { registrationNumber: registrationNumber || undefined },
                    { email: email || undefined }
                ]
            }
        })

        if (!clinic) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isValidPassword = await bcrypt.compare(password, clinic.passwordHash)
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // if (!clinic.isVerified) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Your clinic is not verified yet, please wait!!"
        //     })
        // }

        const clinicSession = await prisma.clinicSession.create({
            data: {
                clinicId: clinic.id,
                ipAddress: req.ip || "unknown",
                userAgent: req.headers["user-agent"] as string,
                refreshTokenHash: "",
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            },
        })

        const refreshToken: string = jwt.sign(
            { id: clinic.id, sessionId: clinicSession.id },
            config.jwtRefreshSecret as string,
            { expiresIn: "7d" }
        );
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        await prisma.clinicSession.update({
            where: { id: clinicSession.id },
            data: { refreshTokenHash }
        })

        const accessToken: string = jwt.sign(
            { id: clinic.id, sessionId: clinicSession.id },
            config.jwtAccessSecret as string,
            { expiresIn: "15m" }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: config.nodeEnv === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: config.nodeEnv === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            clinic: {
                name: clinic.clinicName,
                registrationNumber: clinic.registrationNumber,
                email: clinic.email
            }
        })

    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}