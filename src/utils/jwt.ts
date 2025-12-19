import jwt from "jsonwebtoken";
import getEnv from "../config/env";
import { Payload } from "../auth/auth.types";

export const generateAccessToken = (payload: Payload) => {
  return jwt.sign(
    { id: payload.id, role: payload.role },
    getEnv("ACCESS_SECRET"),
    {
      expiresIn: "30m",
    }
  );
};

export const generateRefreshToken = (payload: Payload) => {
  return jwt.sign({ id: payload.id, role: payload.role }, "secret", {
    expiresIn: "30m",
  });
};

export let refreshTokens: string[] = [];

// save token
export const storeRefreshToken = (token: string) => {
  refreshTokens.push(token);
};

// remove token
export const removeRefreshToken = (token: string) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
};

// check if token exists
export const tokenExists = (token: string) => {
  return refreshTokens.includes(token);
};
