import axios from 'axios';
import env from '../config/env.js';
import ApiError from '../utils/apiError.js';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';


const extractPlaylistId = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('list');
  } catch {
    return null;
  }
};


const fetchPlaylistItems = async (playlistId) => {
  let videos = [];
  let nextPageToken = null;

  do {
    const { data } = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults: 50,
        pageToken: nextPageToken,
        key: env.youtubeApiKey,
      },
    });

    if (!data.items) break;

    data.items.forEach((item, index) => {
      const snippet = item.snippet;

      if (!snippet?.resourceId?.videoId) return;

      videos.push({
        videoId: snippet.resourceId.videoId,
        title: snippet.title,
        position: snippet.position,
        isAvailable: snippet.title !== 'Private video' && snippet.title !== 'Deleted video',
      });
    });

    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videos.sort((a, b) => a.position - b.position);
};


export const fetchPlaylist = async (playlistUrl) => {
  const playlistId = extractPlaylistId(playlistUrl);

  if (!playlistId) {
    throw new ApiError(400, 'Invalid YouTube playlist URL');
  }

  try {
    const videos = await fetchPlaylistItems(playlistId);

    if (!videos.length) {
      throw new ApiError(404, 'Playlist is empty or unavailable');
    }

    return {
      playlistId,
      videos,
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new ApiError(429, 'YouTube API quota exceeded');
    }

    throw error instanceof ApiError
      ? error
      : new ApiError(500, 'Failed to fetch YouTube playlist');
  }
};


export const fetchPlaylistForResync = async (playlistId) => {
  const videos = await fetchPlaylistItems(playlistId);

  return videos.map((v) => ({
    videoId: v.videoId,
    title: v.title,
    position: v.position,
    isAvailable: v.isAvailable,
  }));
};
