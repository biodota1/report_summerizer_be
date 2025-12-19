import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }
  res.status(500).json({ error: "Internal Server Error" });
}
