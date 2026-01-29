import pool from "../config/db";

export async function initReports() {
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
  console.log("Reports table is ready.");
}
