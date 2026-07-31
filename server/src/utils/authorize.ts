import { Request, Response, NextFunction } from "express";
import { hasPermission, Permission, Role, rolePermissions } from "./permissions";



export function authorize(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const role = req.user.role;

    if (!(role in rolePermissions)) {
    return res.status(403).json({ message: "Forbidden — unknown role" });
    }

    if (!hasPermission(role as Role, permission)) {
    return res.status(403).json({ message: "Forbidden — insufficient permission" });
    }

    next();
  };
}