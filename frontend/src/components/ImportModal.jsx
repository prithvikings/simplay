import React, { useState } from "react";
import {
  X,
  Link,
  Loader2,
  CheckCircle2,
  Youtube,
  ArrowRight,
  LayoutList,
} from "lucide-react";
import { useCourses } from "../context/CourseContext";
import api from "../api/axios"; // Import our API client

const ImportModal = ({ isOpen, onClose }) => {
  const { addCourse } = useCourses();

  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [playlistData, setPlaylistData] = useState(null);
  const [customTitle, setCustomTitle] = useState("");

  if (!isOpen) return null;

  // --- 1. Validate Playlist with Backend ---
  const handleValidate = async () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Calls your new /validate endpoint
      const { data } = await api.post("/courses/validate", {
        playlistUrl: url,
      });

      setPlaylistData(data); // Backend returns { title, author, thumbnail, etc }
      setCustomTitle(data.title);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to validate playlist. Is it public?"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. Create Course on Backend ---
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/courses/import", {
        playlistUrl: url,
        title: customTitle,
      });

      if (data.success) {
        // Add the new full course object to context so it appears instantly
        addCourse(data.course);
        handleClose();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setUrl("");
    setPlaylistData(null);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className="
        relative w-full max-w-lg 
        bg-white dark:bg-zinc-950 
        border border-zinc-200 dark:border-zinc-800 
        rounded-2xl shadow-2xl 
        overflow-hidden
        animate-in zoom-in-95 duration-200
      "
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-50">
            Import Playlist
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* STEP 1: INPUT URL */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Paste a public YouTube playlist link below to automatically
                generate your distraction-free course.
              </p>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Link size={16} />
                </div>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/playlist?list=..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500" /> {error}
                </p>
              )}

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleValidate}
                  disabled={isLoading || !url}
                  className="
                    flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-zinc-900 dark:bg-zinc-100 
                    text-white dark:text-zinc-900 
                    font-medium text-sm
                    hover:bg-zinc-800 dark:hover:bg-zinc-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all active:scale-95
                  "
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  <span>{isLoading ? "Validating..." : "Import Playlist"}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PREVIEW & CONFIRM */}
          {step === 2 && playlistData && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
              {/* Success Badge */}
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full w-fit">
                <CheckCircle2 size={14} />
                <span>Playlist validated successfully</span>
              </div>

              {/* Preview Card */}
              <div className="flex gap-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={playlistData.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                    {playlistData.videoCount} videos
                  </div>
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate pr-4">
                    {playlistData.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                    <Youtube size={12} />
                    <span>{playlistData.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                    <LayoutList size={12} />
                    <span>{playlistData.duration} total</span>
                  </div>
                </div>
              </div>

              {/* Custom Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Course Name
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none text-sm text-zinc-900 dark:text-zinc-100 font-medium"
                />
                <p className="text-[10px] text-zinc-500">
                  This will be the public title of your course on the dashboard.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isLoading}
                  className="
                    flex-[2] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                    bg-sky-500 hover:bg-sky-600
                    text-white
                    font-medium text-sm
                    shadow-sm shadow-sky-500/20
                    transition-all active:scale-95
                  "
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : null}
                  <span>{isLoading ? "Creating..." : "Generate Course"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
