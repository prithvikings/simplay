import Course from "../models/Course.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  fetchPlaylist,
  fetchPlaylistForResync,
} from "../services/youtube.service.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";

export const importCourse = asyncHandler(async (req, res) => {
  const { playlistUrl, title } = req.body;

  if (!playlistUrl) {
    throw new ApiError(400, "Playlist URL is required");
  }

  // 1. Fetch Playlist Data
  let playlistData;
  try {
    playlistData = await fetchPlaylist(playlistUrl);
  } catch (error) {
    console.error("YouTube Fetch Error:", error);
    throw new ApiError(
      400,
      "Failed to fetch playlist. Is the URL correct and public?"
    );
  }

  if (!playlistData || !playlistData.playlistId) {
    throw new ApiError(400, "Invalid playlist data received from YouTube.");
  }

  // 2. CHECK FOR DUPLICATES (Prevents 500 Error)
  // Use req.user._id or req.user.id depending on your auth middleware
  const userId = req.user._id || req.user.id;

  const existingCourse = await Course.findOne({
    userId: userId,
    playlistId: playlistData.playlistId,
  });

  if (existingCourse) {
    throw new ApiError(409, "You have already imported this course.");
  }

  // 3. Create Course
  try {
    const course = await Course.create({
      userId: userId,
      title: title || playlistData.title,
      author: playlistData.author,
      thumbnail: playlistData.thumbnail,
      playlistId: playlistData.playlistId,
      videos: playlistData.videos,
      totalVideos: playlistData.videos.length,
      completedCount: 0,
    });

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    // Log the EXACT Mongoose error to the console for debugging
    console.error("Database Save Error:", error);

    // Throw a readable error to the frontend
    throw new ApiError(500, `Database Error: ${error.message}`);
  }
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

// ... existing imports

export const saveVideoNote = asyncHandler(async (req, res) => {
  const { videoId, note } = req.body;
  const { id } = req.params; // Course ID

  // Validate input
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  // Find course and update the specific video's note
  const updatedCourse = await Course.findOneAndUpdate(
    {
      _id: id,
      userId: req.user.id,
      "videos.videoId": videoId,
    },
    {
      $set: {
        "videos.$.note": note, // Update the note field of the matched video
      },
    },
    { new: true } // Return updated document
  );

  if (!updatedCourse) {
    throw new ApiError(404, "Course or Video not found");
  }

  res.status(200).json({
    success: true,
    message: "Note saved successfully",
  });
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getVideoSummary = asyncHandler(async (req, res) => {
  const { id } = req.params; // Course ID
  const { videoId } = req.body;

  if (!videoId) throw new ApiError(400, "Video ID is required");

  // --- FIX STARTS HERE ---
  // 1. Check if summary already exists in DB
  // We MUST query "videos.videoId" so the projection "videos.$" knows which index to return
  const course = await Course.findOne(
    {
      _id: id,
      userId: req.user.id,
      "videos.videoId": videoId, // <--- ADD THIS LINE
    },
    { "videos.$": 1 }
  );
  // --- FIX ENDS HERE ---

  if (!course || !course.videos || !course.videos[0]) {
    // If course exists but video not found in it, or course doesn't exist
    throw new ApiError(404, "Course or video not found");
  }

  const video = course.videos[0];

  // If we already have a summary, return it immediately
  if (video.aiSummary) {
    return res.status(200).json({ success: true, summary: video.aiSummary });
  }

  // 2. Prepare content for AI
  let transcriptText = "";
  try {
    // Attempt to fetch transcript
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    // Combine text and clean it up slightly
    transcriptText = transcriptItems.map((item) => item.text).join(" ");
  } catch (error) {
    console.log(
      `No transcript found for ${videoId}, falling back to description.`
    );
  }

  // 3. Generate Summary with Gemini
  try {
    // Ensure API Key exists
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";
    if (transcriptText) {
      // Limit transcript length to approx 15k characters to be safe with tokens
      const safeTranscript = transcriptText.substring(0, 15000);
      prompt = `You are an expert tutor. Summarize the following YouTube video transcript into 5-7 concise, actionable bullet points. Focus purely on the educational value and key concepts. Do not mention "the speaker" or "the video", just state the facts.\n\n Video Title: ${video.title} \n\n Transcript: ${safeTranscript}`;
    } else {
      prompt = `You are an expert tutor. Summarize this video based on its title and description. Provide 3-5 key takeaways.\n\n Title: ${video.title} \n\n Description: ${video.description}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summaryText = response.text();

    // 4. Save to Database
    await Course.updateOne(
      {
        _id: id,
        userId: req.user.id,
        "videos.videoId": videoId,
      },
      {
        $set: { "videos.$.aiSummary": summaryText },
      }
    );

    res.status(200).json({ success: true, summary: summaryText });
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Return a 500 but with a specific message so we know what broke
    throw new ApiError(500, `Failed to generate AI summary: ${error.message}`);
  }
});
