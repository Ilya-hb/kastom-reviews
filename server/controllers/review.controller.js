import Review from "../models/review.model.js";
import Employee from "../models/employee.model.js";
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
  const employeeId = req.params.id;

  const { reviewText, reviewMark } = req.body;

  if (!reviewText || !reviewMark)
    return res.status(400).json({ message: "Будь ласка, заповніть усі поля!" });

  try {
    const newReview = new Review({
      employee: employeeId,
      reviewText,
      reviewMark,
    });
    const savedReview = await newReview.save();

    await Employee.findByIdAndUpdate(employeeId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ success: true, data: savedReview });
  } catch (error) {
    console.log("Error in post Review:", error.message);
    res.status(500).json({ success: false, message: "Помилка сервера" });
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
