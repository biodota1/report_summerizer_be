import pool from "../config/db";
import { Report } from "./report.types";

export class ReportRepository {
  async createReport(data: Report) {
    const {
      customer_name,
      account_name,
      service_type,
      reason,
      retention_strategy,
      offer_made,
      call_outcome,
      supervisor_id,
      team_id,
      submitted_by,
    } = data;
    const result = await pool.query(
      "INSERT INTO reports (customer_name, account_name, service_type ,reason ,retention_strategy ,offer_made ,call_outcome ,supervisor_id ,team_id ,submitted_by,submitted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        customer_name,
        account_name,
        service_type,
        reason,
        retention_strategy,
        offer_made,
        call_outcome,
        supervisor_id,
        team_id,
        submitted_by,
      ],
    );
    return result.rows[0];
  }
  async getAllReport() {
    const result = await pool.query(
      "SELECT id, customer_name, account_name, service_type ,reason ,retention_strategy ,offer_made ,call_outcome ,supervisor_id ,team_id ,submitted_by ,submitted_at FROM reports",
    );
    return result;
  }
}
