import Review from "../models/review.model.js";

export const reviewLimiter = async (req, res, next) => {
  const clientIp = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const employeeId = req.params.id;
  console.log(req.ip);
  const timeLimitMs = 10 * 1000;
  const timeThreshold = new Date(Date.now() - timeLimitMs);

  const recentReview = await Review.findOne({
    clientIp,
    employee: employeeId,
    createdAt: { $gt: timeThreshold },
  });

  if (recentReview) {
    return res.status(429).json({
      success: false,
      message:
        "Ви вже залишили відгук для цього співробітника. Спробуйте пізніше.",
    });
  }

  req.clientIp = clientIp;

  next();
};
