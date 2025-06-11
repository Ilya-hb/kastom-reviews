import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    clientIP: {
      type: String,
    },

    reviewText: {
      type: String,
      required: false,
    },
    reviewMark: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
