import dotenv from "dotenv";
import getEnv from "./env";
import pool from "./db";
dotenv.config();

export async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected! Current time:", res.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await pool.end();
  }
}
