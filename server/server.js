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
// app.use(cors({ origin: "https://kastom-reviews.vercel.app" }));
app.use(cors());
app.use("/api/", reviewRoutes);
app.use("/api/", employeeRoute);
app.use("/api/", authRoute);

app.listen(process.env.PORT, () => {
  connectDB();
});
