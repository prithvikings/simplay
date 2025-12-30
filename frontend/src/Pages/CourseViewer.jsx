import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronLeft,
  ChevronRight,
  Check,
  SidebarClose,
  SidebarOpen,
  Loader2,
} from "lucide-react";

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourse, markVideoComplete } = useCourses();

  // 1. Get the Course Data
  const course = getCourse(courseId);

  // State for UI
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  // Initialize active video when course loads
  useEffect(() => {
    if (course && course.videos?.length > 0 && !activeVideoId) {
      // Find first uncompleted video, or default to the first one
      const firstUncompleted = course.videos.find((v) => !v.completed);
      setActiveVideoId(
        firstUncompleted ? firstUncompleted.id : course.videos[0].id
      );
    }
  }, [course, activeVideoId]);

  // Early exit if course not found
  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        Course not found.
      </div>
    );
  }

  // Active video calculation
  const activeVideoIndex = course.videos.findIndex(
    (v) => v.id === activeVideoId
  );
  const activeVideo = course.videos[activeVideoIndex];

  // GUARD CLAUSE
  if (!activeVideo) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-sky-500" size={32} />
      </div>
    );
  }

  const isLastVideo = activeVideoIndex === course.videos.length - 1;
  const isFirstVideo = activeVideoIndex === 0;

  // --- HANDLERS ---

  const handleNext = () => {
    if (!isLastVideo) {
      setActiveVideoId(course.videos[activeVideoIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstVideo) {
      setActiveVideoId(course.videos[activeVideoIndex - 1].id);
    }
  };

  const handleMarkComplete = () => {
    markVideoComplete(course.id, activeVideoId);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-inter">
      {/* --- SIDEBAR (Left Panel) --- */}
      <aside
        className={`
            ${isSidebarOpen ? "w-80 border-r" : "w-0 border-none"} 
            transition-all duration-300 ease-in-out
            flex flex-col h-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden relative shrink-0
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </Link>
          <h1 className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-50 leading-tight mb-3">
            {course.title}
          </h1>
          {/* Overall Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-500 dark:text-zinc-400">
                Course Progress
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">
                {course.progress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Video List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {course.videos.map((video, index) => {
            const isActive = video.id === activeVideoId;
            const isLocked = false;

            return (
              <button
                key={video.id}
                onClick={() => !isLocked && setActiveVideoId(video.id)}
                disabled={isLocked}
                className={`
                    w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-sky-50 dark:bg-sky-900/20"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }
                    ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="shrink-0 mt-0.5">
                  {video.completed ? (
                    <CheckCircle2
                      size={18}
                      className="text-green-500 fill-green-500/10"
                    />
                  ) : isActive ? (
                    <PlayCircle
                      size={18}
                      className="text-sky-500 fill-sky-500/10"
                    />
                  ) : isLocked ? (
                    <Lock size={18} className="text-zinc-400" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400 transition-colors" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium mb-0.5 ${
                      isActive
                        ? "text-sky-700 dark:text-sky-400"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {index + 1}. {video.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {video.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer (Collapse Toggle) */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <SidebarClose size={16} />
            <span>Collapse Sidebar</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Right Panel) --- */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Top Navigation / Breadcrumbs */}
        <header className="h-16 shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 text-sm">
            {/* Sidebar Toggle Button (Inside Header now for better layout) */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Expand Sidebar"
              >
                <SidebarOpen size={20} />
              </button>
            )}

            {/* Breadcrumb Links */}
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors font-medium"
              >
                My Courses
              </Link>
              <ChevronRight size={14} className="text-zinc-400" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[200px] md:max-w-md">
                {course.title}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full relative">
          {/* --- VIDEO PLAYER CONTAINER --- */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl relative z-0">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>

          {/* --- LESSON HEADER & CONTROLS --- */}
          <div className="mt-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50">
                {activeVideoIndex + 1}. {activeVideo.title}
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handlePrevious}
                disabled={isFirstVideo}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={handleMarkComplete}
                className={`
                    flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95
                    ${
                      activeVideo.completed
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/50"
                        : "bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-500/20"
                    }
                `}
              >
                {activeVideo.completed ? <Check size={16} /> : null}
                <span>
                  {activeVideo.completed ? "Completed" : "Mark as Complete"}
                </span>
              </button>

              <button
                onClick={handleNext}
                disabled={isLastVideo}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* --- TABS & DETAILS --- */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex gap-6">
              {["Description", "Notes", "Resources"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`
                        pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px]
                        ${
                          activeTab === tab.toLowerCase()
                            ? "border-sky-500 text-sky-600 dark:text-sky-400"
                            : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        }
                    `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Placeholder */}
          <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {activeTab === "description" && (
              <p>
                In this lesson, we dive into {activeVideo.title}. We'll explore
                the core concepts and how to apply them in real-world scenarios.
              </p>
            )}
            {activeTab === "notes" && (
              <div className="p-6 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center text-zinc-500">
                <span>No notes taken yet.</span>
                <button className="mt-2 text-sky-500 hover:underline font-medium">
                  + Add Note
                </button>
              </div>
            )}
            {activeTab === "resources" && (
              <p>No external resources linked for this lesson.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseViewer;
