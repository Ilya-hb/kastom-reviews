import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ succes: true, data: reviews });
  } catch (error) {
    console.log("Error in fetchin reviews: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server GET method error" });
  }
};

export const postReview = async (req, res) => {
  const review = req.body; // user will send this data
  if (!review.reviewText || !review.reviewMark) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, оставьте отзыв, спасибо!" });
  }

  const newReview = new Review(review);
  try {
    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error in create Review:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log("Error in deleting review: ", error.message);
    res.status(404).json({ succes: false, message: "Отзыв не найден..." });
  }
};
