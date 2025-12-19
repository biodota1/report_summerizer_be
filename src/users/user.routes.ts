import { Router } from "express";
import userController from "./user.controller";
import authenticate from "../middlewares/authenticate";
import authorizeRoles from "../middlewares/authorizeRole";

const router = Router();

router.get(
  "/all",
  authenticate,
  authorizeRoles("admin"),
  userController.getAllUsers
);
router
  .route("/user")
  .get(userController.getUser)
  .post(userController.createUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

router.delete("/deleteAll", userController.deleteAll);

router.put("/change-role", userController.changeRole);

export default router;
