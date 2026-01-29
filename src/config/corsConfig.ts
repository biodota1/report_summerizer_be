import { CorsOptions } from "cors";
import getEnv from "./env";

const allowedOrigins = [
  getEnv("FRONTEND_URL_DEVELOPMENT"),
  getEnv("FRONTEND_URL_STAGING"),
  getEnv("FRONTEND_URL_PRODUCTION"),
];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
