import getEnv from "../config/env";
import bcrypt from "bcryptjs";
import { pool } from "../db/db";

export async function createAdmin() {
  const adminPassword = getEnv("ADMIN_PASSWORD");
  if (!adminPassword) throw new Error("Admin password was not set");

  const hashed = await bcrypt.hash(adminPassword, 10);

  const existing = await pool.query(
    "SELECT * FROM users WHERE role = 'admin' LIMIT 1"
  );

  if (existing.rows.length > 0) {
    console.log("Admin already exists");
    return;
  }

  await pool.query(
    `INSERT INTO users (name, email, password, role, created_at) VALUES ($1, $2, $3, 'admin', NOW())`,
    ["Admin", "admin@gmail.com", hashed]
  );

  console.log("Admin user created successfully");
  process.exit(0);
}

// call the function
createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
