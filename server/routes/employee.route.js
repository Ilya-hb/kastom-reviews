import express from "express";
import {
  getEmployee,
  deleteEmployee,
  postEmployee,
  getEmployeeByID,
  updateEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/upload.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/employee", getEmployee);

router.get("/employee/:id", getEmployeeByID);

router.put(
  "/employee/:id",
  verifyToken,
  upload.single("employeeImage"),
  updateEmployee
);

router.post(
  "/employee",
  verifyToken,
  upload.single("employeeImage"),
  postEmployee
);

router.delete("/employee/:id", verifyToken, deleteEmployee);

export default router;
