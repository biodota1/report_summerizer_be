import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthError } from "../errors/AuthError";
import getEnv from "../config/env";

export default function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new AuthError("Missing authentication token");
  const accessToken = getEnv("ACCESS_SECRET");

  if (!accessToken) throw new Error("JWT_SECRET not defined");

  try {
    const decoded = jwt.verify(token, accessToken);
    if (typeof decoded !== "object" && decoded === null && !("id" in decoded)) {
      throw new AuthError("Invalid token payload");
    }
    const payload = decoded as { id: string; role?: string };
    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError")
      throw new AuthError("Token has expired");
    throw new AuthError("Invalid token");
  }
}
