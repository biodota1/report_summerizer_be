import pool from "../config/db";
import { initAdmin } from "./initAdmin";

export async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          team TEXT DEFAULT 'trainee',
          role TEXT DEFAULT 'agent',
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        customer_name TEXT NOT NULL,
        account_name TEXT NOT NULL,
        service_type TEXT NOT NULL,
        reason TEXT NOT NULL,
        retention_strategy TEXT NOT NULL,
        offer_made TEXT NOT NULL,
        call_outcome TEXT NOT NULL,
        supervisor_id TEXT NOT NULL,
        team_id TEXT NOT NULL,
        submitted_by TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS team TEXT DEFAULT 'trainee';
    `);

    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'agent';
    `);

    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
    `);

    await initAdmin();
    console.log("Users table is ready.");
  } catch (err) {
    console.error("Error creating users table:", err);
  }
}
