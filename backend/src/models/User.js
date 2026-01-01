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
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
