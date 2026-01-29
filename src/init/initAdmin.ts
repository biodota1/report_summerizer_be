import pool from "../config/db";
import bcrypt from "bcryptjs";

export async function initAdmin() {
  const { rows } = await pool.query(
    "SELECT id FROM users WHERE role = 'admin' LIMIT 1",
  );

  if (rows.length > 0) {
    console.log("✅ Admin already exists");
    return;
  }

  const email = process.env.ADMIN_EMAIL || process.env.DEMO_ADMIN_EMAIL;

  const password =
    process.env.ADMIN_PASSWORD || process.env.DEMO_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("❌ No admin credentials provided in env");
  }

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (name, email, password, team, role, status)
   VALUES ($1, $2, $3, $4, $5, $6)`,
    ["System Admin", email, hashed, "admin", "admin", "active"],
  );
  console.log("Admin created");
}
