import config from '../config/config'
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import { sendEmailVerificationOtp } from "../utils/sendEmailOtp"
import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import prisma from "../lib/prisma";


export const handleClinicRegsiter = async (req : Request, res : Response) =>  {
    try {
        const {registrationNumber,
                clinicName,
                clinicOwnerName,
                address,
                phone,
                password,
                email} = req.body

        const isAlreadyRegistered =  await prisma.clinic.findFirst({where : {registrationNumber}})
        if (isAlreadyRegistered)    {
            return res.status(403).json({
                success : false,
                message : "This registration number is already in use. Please check and try again, or contact support if this is a mistake."
            }) 
        }  
        const isEmailPhoneTaken = await prisma.clinic.findFirst({
            where : {
                OR : [
                    {email},
                    {phone}
                ]
            }
            })  
        if (isEmailPhoneTaken){
            if (isEmailPhoneTaken.email === email){
                return res.status(400).json({
                    success : false,
                    message : "Email already registered"
                })
            }
                
            if (isEmailPhoneTaken.phone === phone){
                return res.status(400).json({
                    success : false,
                    message : "Mobile Number already registered"
                })
            }            
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newClinic = await prisma.clinic.create({
        data: {
            registrationNumber,
            clinicName,
            clinicOwnerName,
            address,
            phone,
            email,
            passwordHash : hashedPassword  
        }
        })
        return res.status(201).json({
            success : true,
            message : "Registration successful. Your clinic will be verified by our admin team shortly.",
            email : newClinic.email,
            redirectTo : '/verifyClinicPage'
        })


    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
} 

export const handleClinicLogin = async (req: Request, res: Response) => {
    try {
        const { registrationNumber, password } = req.body
        if (!registrationNumber || !password) {
            return res.status(400).json({
                success: false,
                message: "Registration number and password are required"
            })
        }

        const clinic = await prisma.clinic.findFirst({ where: { registrationNumber } })
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

        if (!clinic.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Your clinic is not verified yet, please wait!!"
            })
        }

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
                registrationNumber: clinic.registrationNumber
            }
        })

    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}