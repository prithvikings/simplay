import User from "../models/User.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";
import { verifyGoogleToken } from "../services/googleAuth.service.js";

export const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    throw new ApiError(400, "Google ID token is required");
  }

  // 1. Verify Google Token
  const googleUser = await verifyGoogleToken(idToken);

  if (!googleUser) {
    throw new ApiError(401, "Invalid Google token");
  }

  // 2. Find User in DB
  let user = await User.findOne({ googleId: googleUser.googleId });

  // 3. Streak Logic Configuration
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize 'today' to midnight

  let newStreakVal = 1;
  let streakUpdated = false; // Flag to tell frontend to show the popup

  if (!user) {
    // --- SCENARIO A: NEW USER ---
    // Create new user with initial streak of 1
    user = await User.create({
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.avatar,
      streak: {
        current: 1,
        lastActiveDate: new Date(),
      },
    });
    streakUpdated = true; // New users get the popup
  } else {
    // --- SCENARIO B: EXISTING USER ---

    // Check if user has previous streak data
    if (user.streak && user.streak.lastActiveDate) {
      const lastActive = new Date(user.streak.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0); // Normalize last active date to midnight

      // Calculate difference in milliseconds, then convert to days
      const diffTime = Math.abs(today - lastActive);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // 1. Logged in multiple times on the SAME day
        newStreakVal = user.streak.current;
        streakUpdated = false; // Don't show popup again today
      } else if (diffDays === 1) {
        // 2. Logged in on CONSECUTIVE day
        newStreakVal = user.streak.current + 1;
        streakUpdated = true; // Show popup (Streak increased!)
      } else {
        // 3. Missed one or more days (Streak Broken)
        newStreakVal = 1;
        streakUpdated = true; // Show popup (Streak reset/started over)
      }
    } else {
      // User exists but has no streak data yet (Legacy user)
      newStreakVal = 1;
      streakUpdated = true;
    }

    // Update User Fields
    user.streak = {
      current: newStreakVal,
      lastActiveDate: new Date(), // Set exact login time
    };

    // Sync Google Profile Data (in case name/avatar changed)
    user.name = googleUser.name;
    user.avatar = googleUser.avatar;

    await user.save();
  }

  // 4. Generate JWT
  const token = generateToken({ userId: user._id });

  // 5. Send Response
  res.status(200).json({
    success: true,
    token,
    streakUpdated, // Frontend uses this to trigger the confetti modal
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      streak: user.streak.current,
    },
  });
});
