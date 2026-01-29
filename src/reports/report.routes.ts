import { Router } from "express";
import reportController from "./report.controller";
import authenticate from "../middlewares/authenticate";
import authorizeRoles from "../middlewares/authorizeRole";

const router = Router();

router.post("/send", reportController.submitReport);
router.get(
  "/all",
  authenticate,
  authorizeRoles("admin"),
  reportController.getAllUsers,
);
export default router;
