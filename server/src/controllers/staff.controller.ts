import { Request, Response } from "express"
import prisma from "../lib/prisma";


export const promoteReceptionist = async (req : Request, res : Response) =>  {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
        return res.status(400).json({
                        success: false,
                        message: "Valid email required"
            })
        }

        const newReceptionist = await prisma.user.findFirst({where :{email: targetEmail}})
        if (!newReceptionist) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (!newReceptionist.isVerifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified, Please verify Email"
            })
        }
        if (newReceptionist.role !== "PATIENT") {
            return res.status(400).json({
                success: false,
                message: "Only regular users can be promoted to Receptionist"
            })
        }

        await prisma.user.update({
            where : {id:newReceptionist.id},
            data : {
                role : "RECEPTIONIST"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${newReceptionist.email} promoted to Receptionist`,
            user: { id: newReceptionist.id, email: newReceptionist.email, role: newReceptionist.role }
        })
    } catch (err) {
        console.log("Promote Receptionist Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const demoteReceptionist = async (req : Request, res : Response) =>  {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
        return res.status(400).json({
                        success: false,
                        message: "Valid email required"
            })
        }

        const exReceptionist = await prisma.user.findFirst({where :{email: targetEmail}})
        if (!exReceptionist) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }

        
        if (exReceptionist.role !== "PATIENT") {
            return res.status(400).json({
                success: false,
                message: "Only regular users can be demoted to Receptionist"
            })
        }

        await prisma.user.update({
            where : {id:exReceptionist.id},
            data : {
                role : "PATIENT"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${exReceptionist.email} promoted to Receptionist`,
            user: { id: exReceptionist.id, email: exReceptionist.email, role: exReceptionist.role }
        })
    } catch (err) {
        console.log("Demote Receptionist Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const promoteDoctor = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }

        const newDoctor = await prisma.user.findFirst({ where: { email: targetEmail } })
        if (!newDoctor) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (!newDoctor.isVerifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified, Please verify Email"
            })
        }
        if (newDoctor.role !== "PATIENT") {
            return res.status(400).json({
                success: false,
                message: "Only regular users can be promoted to Doctor"
            })
        }

        await prisma.user.update({
            where: { id: newDoctor.id },
            data: {
                role: "DOCTOR"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${newDoctor.email} promoted to Doctor`,
            user: { id: newDoctor.id, email: newDoctor.email, role: newDoctor.role }
        })
    } catch (err) {
        console.log("Promote Doctor Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const demoteDoctor = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }

        const exDoctor = await prisma.user.findFirst({ where: { email: targetEmail } })
        if (!exDoctor) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }

        if (exDoctor.role !== "DOCTOR") {
            return res.status(400).json({
                success: false,
                message: "Only Doctors can be demoted"
            })
        }

        await prisma.user.update({
            where: { id: exDoctor.id },
            data: {
                role: "PATIENT"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${exDoctor.email} demoted to Patient`,
            user: { id: exDoctor.id, email: exDoctor.email, role: exDoctor.role }
        })
    } catch (err) {
        console.log("Demote Doctor Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const promoteManager = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }

        const newManager = await prisma.user.findFirst({ where: { email: targetEmail } })
        if (!newManager) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (!newManager.isVerifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified, Please verify Email"
            })
        }
        if (newManager.role !== "PATIENT") {
            return res.status(400).json({
                success: false,
                message: "Only regular users can be promoted to Manager"
            })
        }

        await prisma.user.update({
            where: { id: newManager.id },
            data: {
                role: "MANAGER"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${newManager.email} promoted to Manager`,
            user: { id: newManager.id, email: newManager.email, role: newManager.role }
        })
    } catch (err) {
        console.log("Promote Manager Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const demoteManager = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }

        const exManager = await prisma.user.findFirst({ where: { email: targetEmail } })
        if (!exManager) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }

        if (exManager.role !== "MANAGER") {
            return res.status(400).json({
                success: false,
                message: "Only Managers can be demoted"
            })
        }

        await prisma.user.update({
            where: { id: exManager.id },
            data: {
                role: "PATIENT"
            }
        })
        return res.status(200).json({
            success: true,
            message: `${exManager.email} demoted to Patient`,
            user: { id: exManager.id, email: exManager.email, role: exManager.role }
        })
    } catch (err) {
        console.log("Demote Manager Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}                