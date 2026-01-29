import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.types";

const authService = new AuthService();

export default {
  logout(_req: Request, res: Response) {
    return res
      .cookie("accessToken", "", { maxAge: 0, httpOnly: true, path: "/" })
      .cookie("refreshToken", "", { maxAge: 0, httpOnly: true, path: "/" })
      .json({ message: "Log out successfully" });
  },
  // refreshToken(req: Request, res: Response) {
  //   const { refreshToken } = req.body;

  //   if (!refreshToken)
  //     return res.status(400).json({ message: "Refresh token required" });

  //   if (!tokenExists(refreshToken))
  //     return res.status(403).json({ message: "Refresh token not found" });

  //   // Verify the refresh token
  //   jwt.verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
  //     if (err)
  //       return res.status(403).json({ message: "Invalid refresh token" });

  //     const userId = decoded.id;

  //     // Optionally rotate refresh token
  //     removeRefreshToken(refreshToken);
  //     const newRefreshToken = generateRefreshToken(userId);
  //     storeRefreshToken(newRefreshToken);

  //     // Generate new access token
  //     const newAccessToken = generateAccessToken(userId);

  //     return res.json({
  //       message: "Token refreshed",
  //       accessToken: newAccessToken,
  //       refreshToken: newRefreshToken,
  //     });
  //   });
  // },
  async register(
    req: Request<{}, {}, RegisterInput>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, email, password } = req.body;

      const safeUser = await authService.register({ name, email, password });

      res.status(201).json({
        message: "User successfully registered",
        name: safeUser.name,
        email: safeUser.email,
      });
    } catch (err: any) {
      next(err);
    }
  },
  async login(
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login({
        email,
        password,
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true, // use true in production (HTTPS)
          sameSite: "strict",
          path: "/", // cookie available everywhere
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({ user });
    } catch (err: any) {
      next(err);
    }
  },
};
