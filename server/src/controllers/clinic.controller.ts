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
            message : "Registered successfully. OTP sent to your email.",
            email : newClinic.email,
            redirectTo : '/verifyClinicPage'
        })


    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
} 

export const handleClinicLogin = async (req : Request, res : Response) =>   {
    try {

    } catch (err)   {


    }
}