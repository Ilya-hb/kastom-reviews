import Employee from "../models/employee.model.js";

export const countAverageRating = async (employeeId) => {
  const employee = await Employee.findById(employeeId).populate("reviews");

  if (!employee || !employee.reviews.length) {
    employee.averageRating = 0;
  } else {
    // Get all marks from reviews array
    const allRating = employee.reviews.length
      ? employee.reviews.map((el) => el.reviewMark)
      : 0;

    // Count average rating
    const averageRating = allRating.length
      ? allRating.reduce((prev, curr) => prev + curr / allRating.length, 0)
      : 0;

    // Insert new average rating with .0 nums after coma
    employee.averageRating = Number(averageRating.toFixed(1));
  }

  // Update employee reviews
  await employee.save();

  // Return calculated number
  return employee.averageRating;
};
