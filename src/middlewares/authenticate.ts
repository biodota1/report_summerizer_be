import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthError } from "../errors/AuthError";
import getEnv from "../config/env";

export default function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new AuthError("Missing authentication token");
  const token = getEnv("ACCESS_SECRET");

  if (!token) throw new Error("JWT_SECRET not defined");

  try {
    const decoded = jwt.verify(accessToken, token) as JwtPayload;
    if (typeof decoded !== "object" && decoded === null && !("id" in decoded)) {
      throw new AuthError("Invalid token payload");
    }
    const payload = decoded as { id: string; role?: string };
    req.user = { id: decoded.id, role: decoded.role };
    console.log(req.user.id);
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError")
      throw new AuthError("Token has expired");
    throw new AuthError("Invalid token");
  }
}
