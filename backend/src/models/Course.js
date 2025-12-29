// backend/src/models/Course.js

import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    // --- Merged Progress Fields ---
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    playlistId: {
      type: String,
      required: true,
      index: true,
    },
    videos: {
      type: [videoSchema],
      required: true,
    },
    // removed: progress array
    lastWatchedVideoId: {
      type: String,
      default: null,
    },
    completedCount: {
      type: Number,
      default: 0,
    },
    totalVideos: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate playlist imports per user
courseSchema.index({ userId: 1, playlistId: 1 }, { unique: true });

export default mongoose.model('Course', courseSchema);