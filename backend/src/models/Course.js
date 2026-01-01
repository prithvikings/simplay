// backend/src/models/Course.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },
    description: { type: String, default: "" },
    title: { type: String, required: true },
    duration: { type: String, default: "00:00" },
    position: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    note: { type: String, default: "" },
    aiSummary: { type: String, default: null },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },

    // ADDED: Needed for Course Cards
    author: { type: String, default: "Unknown Channel" },
    thumbnail: { type: String, default: "" },

    playlistId: { type: String, required: true, index: true },
    videos: { type: [videoSchema], required: true },
    lastWatchedVideoId: { type: String, default: null },
    completedCount: { type: Number, default: 0 },
    totalVideos: { type: Number, required: true },
  },
  { timestamps: true }
);

// ADDED: Calculate progress percentage automatically
courseSchema.virtual("progress").get(function () {
  if (this.totalVideos === 0) return 0;
  return Math.round((this.completedCount / this.totalVideos) * 100);
});

// Ensure virtuals are sent in JSON responses
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

courseSchema.index({ userId: 1, playlistId: 1 }, { unique: true });

export default mongoose.model("Course", courseSchema);
