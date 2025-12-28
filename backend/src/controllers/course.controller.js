import Course from '../models/Course.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fetchPlaylist,fetchPlaylistForResync } from '../services/youtube.service.js';

export const importCourse = asyncHandler(async (req, res) => {
  const { playlistUrl, title } = req.body;

  if (!playlistUrl || !title) {
    throw new ApiError(400, 'Playlist URL and title are required');
  }

  const playlistData = await fetchPlaylist(playlistUrl);

  const course = await Course.create({
    userId: req.user.id,
    title,
    playlistId: playlistData.playlistId,
    videos: playlistData.videos,
    progress: playlistData.videos.map((v) => ({
      videoId: v.videoId,
      completed: false,
    })),
    totalVideos: playlistData.videos.length,
    completedCount: 0,
  });

  res.status(201).json({
    success: true,
    courseId: course._id,
  });
});


export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ userId: req.user.id })
    .select('title completedCount totalVideos updatedAt')
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
    throw new ApiError(404, 'Course not found');
  }

  res.status(200).json({
    success: true,
    course,
  });
});


export const updateProgress = asyncHandler(async (req, res) => {
  const { videoId, completed } = req.body;

  if (!videoId || typeof completed !== 'boolean') {
    throw new ApiError(400, 'Invalid progress update');
  }

  const course = await Course.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const progressItem = course.progress.find(
    (p) => p.videoId === videoId
  );

  if (!progressItem) {
    throw new ApiError(400, 'Invalid video ID');
  }

  if (!progressItem.completed && completed) {
    progressItem.completed = true;
    progressItem.completedAt = new Date();
    course.completedCount += 1;
    course.lastWatchedVideoId = videoId;
  }

  await course.save();

  res.status(200).json({
    success: true,
  });
});


export const deleteCourse = asyncHandler(async (req, res) => {
  const deleted = await Course.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) {
    throw new ApiError(404, 'Course not found');
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
    throw new ApiError(404, 'Course not found');
  }

  // Fetch latest playlist state
  const latestVideos = await fetchPlaylistForResync(course.playlistId);

  const existingVideoMap = new Map(
    course.videos.map((v) => [v.videoId, v])
  );

  const progressMap = new Map(
    course.progress.map((p) => [p.videoId, p])
  );

  let newVideosAdded = 0;

  // --- Handle new & existing videos ---
  latestVideos.forEach((video) => {
    if (!existingVideoMap.has(video.videoId)) {
      // NEW VIDEO
      course.videos.push(video);
      course.progress.push({
        videoId: video.videoId,
        completed: false,
      });
      newVideosAdded++;
    } else {
      // EXISTING VIDEO → update availability/title if changed
      const existing = existingVideoMap.get(video.videoId);
      existing.isAvailable = video.isAvailable;
      existing.title = video.title;
      existing.position = video.position;
    }
  });

  // --- Handle removed videos ---
  const latestVideoIds = new Set(
    latestVideos.map((v) => v.videoId)
  );

  course.videos.forEach((video) => {
    if (!latestVideoIds.has(video.videoId)) {
      video.isAvailable = false;
    }
  });

  // --- Update totals ---
  course.totalVideos = course.videos.length;

  await course.save();

  res.status(200).json({
    success: true,
    addedVideos: newVideosAdded,
    totalVideos: course.totalVideos,
  });
});
