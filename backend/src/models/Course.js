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
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: Date,
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

    progress: {
      type: [progressSchema],
      required: true,
    },

    lastWatchedVideoId: {
      type: String,
      index: true,
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
