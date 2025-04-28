import express from "express";
import {
  getEmployee,
  deleteEmployee,
  postEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/employee", getEmployee);

router.post("/employee", postEmployee);

router.delete("/employee/:id", deleteEmployee);

export default router;
