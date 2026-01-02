import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// POST /api/user/track-time
export const trackTime = asyncHandler(async (req, res) => {
  const { seconds } = req.body;

  // CHANGE: Use .id because your middleware sets req.user = { id: ... }
  const userId = req.user.id;

  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Try to increment existing record for today
  let user = await User.findOneAndUpdate(
    { _id: userId, "usageHistory.date": todayStr },
    { $inc: { "usageHistory.$.seconds": seconds } },
    { new: true }
  );

  // 2. If no record for today exists, push a new one
  if (!user) {
    user = await User.findByIdAndUpdate(
      userId,
      { $push: { usageHistory: { date: todayStr, seconds: seconds } } },
      { new: true }
    );
  }

  res.status(200).json({ success: true });
});

// GET /api/user/today-usage
export const getTodayUsage = asyncHandler(async (req, res) => {
  // CHANGE: Use .id here too
  const userId = req.user.id;
  const todayStr = new Date().toISOString().split("T")[0];

  const user = await User.findById(userId).select("usageHistory");

  const todayEntry = user?.usageHistory?.find(
    (entry) => entry.date === todayStr
  );
  const seconds = todayEntry ? todayEntry.seconds : 0;

  res.status(200).json({ seconds });
});

// GET /api/user/profile
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Fetch user with usageHistory (needed for Heatmap)
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Calculate total seconds studied globally
  const totalSeconds = user.usageHistory.reduce(
    (acc, curr) => acc + curr.seconds,
    0
  );

  res.status(200).json({
    success: true,
    user: {
      ...user.toObject(),
      totalSeconds, // Send pre-calculated total
    },
  });
});
