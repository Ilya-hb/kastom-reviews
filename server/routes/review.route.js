import express from "express";

import {
  deleteReview,
  getReviews,
  postReview,
} from "../controllers/review.controller.js";
import { reviewLimiter } from "../middleware/reviewLimiter.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getReviews);

router.post("/employee/:id/review", reviewLimiter, postReview);

router.delete("/:id", verifyToken, deleteReview);

export default router;
