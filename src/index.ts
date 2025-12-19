import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { initializeDB } from "./db/db";
import { testConnection } from "./db/test-db";

import errorHandler from "./middlewares/errorHandler";
import logger from "./middlewares/logger";

import userRoutes from "./users/user.routes";
import authRoutes from "./auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(errorHandler);

testConnection();

// initializeDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
