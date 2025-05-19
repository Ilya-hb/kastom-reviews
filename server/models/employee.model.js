import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    employeeImage: {
      type: String,
      required: false,
    },
    averageRating: {
      type: Number,
      required: false,
      default: 0,
    },
    employeeImagePublicId: {
      type: String,
      required: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
