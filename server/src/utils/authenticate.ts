
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken"


export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!, { algorithms: ["HS256"] }) as JwtPayload;

    if (!decoded.id || typeof decoded.id !== "number") {
        return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id.toString(), role: user.role };

    next();
  }  catch (err) {
  if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
    }
}