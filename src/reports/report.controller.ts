import { NextFunction, Request, Response } from "express";
import { ReportService } from "./report.service";

const reportService = new ReportService();
export default {
  async submitReport(req: Request, res: Response, next: NextFunction) {
    try {
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
      } = req.body;

      await reportService.createReport({
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
      });

      res.status(201).json({ message: "Submit Successfully", status: "OK" });
    } catch (err: any) {
      next(err);
    }
  },
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reportService.getAllReports();
      res.status(200).json(result.rows);
    } catch (err: any) {
      next(err);
    }
  },
};
