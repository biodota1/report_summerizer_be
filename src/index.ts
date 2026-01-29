import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { testConnection } from "./config/test-db";
import { initDb } from "./init/initDb";

import errorHandler from "./middlewares/errorHandler";
import logger from "./middlewares/logger";

import userRoutes from "./users/user.routes";
import authRoutes from "./auth/auth.routes";
import reportRoutes from "./reports/report.routes";
import { corsOptions } from "./config/corsConfig";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(errorHandler);

// testConnection();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
