import express from "express";
import {
  getEmployee,
  deleteEmployee,
  postEmployee,
  getEmployeeByID,
} from "../controllers/employee.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/employee", getEmployee);

router.get("/employee/:id", getEmployeeByID);

router.post("/employee", postEmployee);

router.post("/employee", verifyToken, postEmployee);

router.delete("/employee/:id", deleteEmployee);

export default router;
