import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";

export default function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.role)
        throw new ForbiddenError("Missing user role.");
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole))
        throw new ForbiddenError("Access denied.");
      next();
    } catch (err) {
      next(err);
    }
  };
}
