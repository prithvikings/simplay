//src/controllers/auth.controller.js

import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateToken } from '../utils/jwt.js';
import { verifyGoogleToken } from '../services/googleAuth.service.js';

export const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    throw new ApiError(400, 'Google ID token is required');
  }

  const googleUser = await verifyGoogleToken(idToken);

  if (!googleUser) {
    throw new ApiError(401, 'Invalid Google token');
  }

  let user = await User.findOne({ googleId: googleUser.googleId });

  if (!user) {
    user = await User.create({
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.avatar,
    });
  }

  const token = generateToken({ userId: user._id });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
});
