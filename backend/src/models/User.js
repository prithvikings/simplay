// backend/src/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
    },
    avatar: String,
    streak: {
      current: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: null },
    },
    usageHistory: [
      {
        date: { type: String, required: true }, // Format: "YYYY-MM-DD"
        seconds: { type: Number, default: 0 },
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
