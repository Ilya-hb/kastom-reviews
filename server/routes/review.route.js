import express from "express";

import {
  deleteReview,
  getReviews,
  postReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);

router.post("/", postReview);

router.delete("/:id", deleteReview);

export default router;
