import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import reviewRoutes from "./routes/review.route.js";
import employeeRoute from "./routes/employee.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/", reviewRoutes);
app.use("/api/", employeeRoute);
app.use("/api/", authRoute);

app.listen(3000, () => {
  connectDB();
  console.log("Server started at http://localhost:3000 hello");
});
