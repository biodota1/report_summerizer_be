import { ReportRepository } from "./report.repo";
import { Report } from "./report.types";

export class ReportService {
  constructor(private reportRepo = new ReportRepository()) {}
  async createReport(data: Report) {
    const result = await this.reportRepo.createReport(data);
    return result;
  }

  async getAllReports() {
    const result = await this.reportRepo.getAllReport();
    return result;
  }
}
