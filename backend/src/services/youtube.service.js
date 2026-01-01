import axios from "axios";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// Helper: Convert YouTube Duration (PT1H2M10S) to "1:02:10"
const parseDuration = (duration) => {
  if (!duration) return "00:00";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  let str = "";
  if (hours > 0) str += `${hours}:`;
  str += `${minutes.toString().padStart(hours > 0 ? 2 : 1, "0")}:`;
  str += seconds.toString().padStart(2, "0");
  return str;
};

const extractPlaylistId = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("list");
  } catch {
    return null;
  }
};

export const fetchPlaylist = async (playlistUrl) => {
  const playlistId = extractPlaylistId(playlistUrl);
  if (!playlistId) throw new ApiError(400, "Invalid YouTube playlist URL");

  try {
    // 1. Fetch Playlist Metadata (Title, Author, Thumbnail)
    const playlistResponse = await axios.get(`${YOUTUBE_API_BASE}/playlists`, {
      params: {
        part: "snippet",
        id: playlistId,
        key: env.youtubeApiKey,
      },
    });

    if (!playlistResponse.data.items?.length) {
      throw new ApiError(404, "Playlist not found or private");
    }

    const playlistSnippet = playlistResponse.data.items[0].snippet;

    // 2. Fetch Playlist Items (Video IDs)
    let videos = [];
    let nextPageToken = null;

    // Safety limit to prevent quota drain
    let pageCount = 0;

    do {
      const { data } = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
        params: {
          part: "snippet",
          playlistId,
          maxResults: 50,
          pageToken: nextPageToken,
          key: env.youtubeApiKey,
        },
      });

      if (!data.items) break;

      // Extract IDs to fetch durations
      const videoIds = data.items
        .map((item) => item.snippet?.resourceId?.videoId)
        .filter((id) => id)
        .join(",");

      // 3. Fetch Video Details (Duration)
      if (videoIds) {
        const videoDetailsResponse = await axios.get(
          `${YOUTUBE_API_BASE}/videos`,
          {
            params: {
              part: "contentDetails,snippet",
              id: videoIds,
              key: env.youtubeApiKey,
            },
          }
        );

        // Map details by ID for easy lookup
        const detailsMap = new Map(
          videoDetailsResponse.data.items.map((v) => [v.id, v])
        );

        data.items.forEach((item) => {
          const snippet = item.snippet;
          const videoId = snippet?.resourceId?.videoId;
          if (!videoId) return;

          const detail = detailsMap.get(videoId);
          // If detail missing (deleted video), skip or handle gracefully

          videos.push({
            videoId: videoId,
            title: snippet.title,
            description:
              detail?.snippet?.description || snippet.description || "",
            // Use high res thumbnail if available
            thumbnail:
              snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url,
            position: snippet.position,
            duration: detail
              ? parseDuration(detail.contentDetails.duration)
              : "00:00",
            isAvailable:
              snippet.title !== "Private video" &&
              snippet.title !== "Deleted video",
          });
        });
      }

      nextPageToken = data.nextPageToken;
      pageCount++;
    } while (nextPageToken && pageCount < 5); // Limit to 250 videos for now

    // Sort by position
    videos.sort((a, b) => a.position - b.position);

    return {
      playlistId,
      title: playlistSnippet.title,
      author: playlistSnippet.channelTitle,
      thumbnail:
        playlistSnippet.thumbnails?.maxres?.url ||
        playlistSnippet.thumbnails?.high?.url,
      videos,
    };
  } catch (error) {
    console.error(
      "YouTube Service Error:",
      error.response?.data || error.message
    );
    if (error.response?.status === 403) {
      throw new ApiError(429, "YouTube API quota exceeded");
    }
    throw error instanceof ApiError
      ? error
      : new ApiError(500, "Failed to fetch YouTube playlist");
  }
};

// Resync remains mostly same, just ensure it includes duration if you want it updated
export const fetchPlaylistForResync = async (playlistId) => {
  // Implementation would be similar to above loop logic to get fresh durations
  // For MVP, you can leave your existing implementation or copy the logic above.
  return [];
};
