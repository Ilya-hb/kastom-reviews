import rateLimit from "express-rate-limit";

export const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 1,
  keyGenerator: (req) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const employeeId = req.params.id;
    return `${ip}-${employeeId}`;
  },
  message: {
    success: false,
    message: "Вибачте, ви вже залишили відгук про цього співробітника!",
  },
});
