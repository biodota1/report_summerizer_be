import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

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
