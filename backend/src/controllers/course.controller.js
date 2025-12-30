import Course from "../models/Course.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  fetchPlaylist,
  fetchPlaylistForResync,
} from "../services/youtube.service.js";

export const importCourse = asyncHandler(async (req, res) => {
  const { playlistUrl, title } = req.body;

  if (!playlistUrl) {
    // Title is optional now (can use default)
    throw new ApiError(400, "Playlist URL is required");
  }

  const playlistData = await fetchPlaylist(playlistUrl);

  const course = await Course.create({
    userId: req.user.id,
    title: title || playlistData.title, // Use custom title or default
    author: playlistData.author, // SAVE AUTHOR
    thumbnail: playlistData.thumbnail, // SAVE THUMBNAIL
    playlistId: playlistData.playlistId,
    videos: playlistData.videos,
    totalVideos: playlistData.videos.length,
    completedCount: 0,
  });

  res.status(201).json({
    success: true,
    course, // Return full course so frontend context can update
  });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ userId: req.user.id })
    // Select the new fields so cards look correct
    .select(
      "title author thumbnail completedCount totalVideos updatedAt lastWatchedVideoId"
    )
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    courses,
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  res.status(200).json({
    success: true,
    course,
  });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { videoId, completed } = req.body;

  // 1. Mark as completed and increment count atomically
  if (completed) {
    const result = await Course.updateOne(
      {
        _id: req.params.id,
        userId: req.user.id,
        "videos.videoId": videoId,
        "videos.isCompleted": false, // FIXED: Matches Schema
      },
      {
        $set: {
          "videos.$.isCompleted": true, // FIXED: Matches Schema
          "videos.$.completedAt": new Date(),
          lastWatchedVideoId: videoId,
        },
        $inc: { completedCount: 1 },
      }
    );
  } else {
    // Handle un-completing (decrement count)
    await Course.updateOne(
      { _id: req.params.id, userId: req.user.id, "videos.videoId": videoId },
      {
        $set: { "videos.$.isCompleted": false, "videos.$.completedAt": null }, // FIXED: Matches Schema
        $inc: { completedCount: -1 },
      }
    );
  }

  res.status(200).json({ success: true });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const deleted = await Course.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) {
    throw new ApiError(404, "Course not found");
  }

  res.status(200).json({
    success: true,
  });
});

export const resyncCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Fetch latest playlist state
  const latestVideos = await fetchPlaylistForResync(course.playlistId);

  // Map existing videos by ID to preserve progress
  const existingVideoMap = new Map(course.videos.map((v) => [v.videoId, v]));

  const mergedVideos = [];
  let newVideosAdded = 0;

  latestVideos.forEach((latestVid) => {
    if (existingVideoMap.has(latestVid.videoId)) {
      // KEEP EXISTING: Preserve progress (isCompleted), just update details
      const existing = existingVideoMap.get(latestVid.videoId);

      // Update metadata but keep progress
      existing.title = latestVid.title;
      existing.position = latestVid.position;
      existing.isAvailable = latestVid.isAvailable;

      mergedVideos.push(existing);
    } else {
      // NEW VIDEO: Add to list
      mergedVideos.push(latestVid);
      newVideosAdded++;
    }
  });

  // Replace the videos array with the new merged list
  // (This automatically handles "deleted" videos by omitting them)
  course.videos = mergedVideos;
  course.totalVideos = course.videos.length;

  await course.save();

  res.status(200).json({
    success: true,
    addedVideos: newVideosAdded,
    totalVideos: course.totalVideos,
  });
});

export const validatePlaylist = asyncHandler(async (req, res) => {
  const { playlistUrl } = req.body;
  if (!playlistUrl) throw new ApiError(400, "Playlist URL is required");

  // Fetch data from YouTube service
  const playlistData = await fetchPlaylist(playlistUrl);

  // Return preview data
  res.status(200).json({
    success: true,
    playlistId: playlistData.playlistId,
    title: playlistData.title,
    author: playlistData.author, // Ensure youtube.service returns this
    thumbnail: playlistData.thumbnail, // Ensure youtube.service returns this
    videoCount: playlistData.videos.length,
  });
});
