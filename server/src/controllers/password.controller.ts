import bcrypt from "bcryptjs"
import crypto from "crypto"
import { Request, Response } from "express"
import { sendResetPasswordEmail } from "../utils/sendPassReset"
import prisma from "../lib/prisma";



export const handleForgotPassword = async (req : Request, res : Response) => {
    try {
        const { email, mobileNumber } = req.body

        if (!email && !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: "Email or mobile number is required"
            })
        }

        const user = await prisma.user.findFirst({where : {
            OR: [
                ...(email ? [{ email }] : []),
                ...(mobileNumber ? [{ mobileNumber }] : [])
            ]
        }})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email or Mobile number is not registered"
            })
        }

        const resetPasswordToken = crypto.randomBytes(32).toString('hex')
        const resetPasswordTokenHash = crypto.createHash("sha256").update(resetPasswordToken).digest("hex")

        await prisma.user.update({
            where: { id: user.id },
            data :  {
                resetPasswordToken : resetPasswordTokenHash,
                resetPasswordExpiresAt : new Date(Date.now() + 15 * 60 * 1000)
            }
        })


        const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`
        await sendResetPasswordEmail(user.email, user.firstName, user.lastName, resetPasswordLink)

        return res.status(200).json({
            success: true,
            message: "Sent password reset link on Email"
        })

    } catch (err) {
        console.error("forgotPassword error:", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "An error occurred" 

        })
    }
}

export const handleResetPassword = async (req : Request, res : Response) => {
    try {
        const resetToken = req.query.token as string
        const { password: newPassword } = req.body

        if (!resetToken) {
        return res.status(400).json({
        success: false,
        message: "Reset token is required"
        })
    }
        const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex")

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: resetTokenHash,
                resetPasswordExpiresAt: { gt: new Date() }
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        const salt = await bcrypt.genSalt(10)
         const Password = await bcrypt.hash(newPassword, salt)
        

        await prisma.user.update({
            where: { id: user.id },
            data : {
                password : Password,
                resetPasswordToken : null,
                resetPasswordExpiresAt : null
            }       
        })


        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        })

    } catch (err) {
        console.error("resetPassword error:", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

