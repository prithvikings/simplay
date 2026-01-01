import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { AnimatedThemeToggle } from "../components/animated-theme-toggle";
import Linkify from "linkify-react";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  SidebarClose,
  SidebarOpen,
  Loader2,
  Save,
  Sparkles,
  RefreshCw,
  Copy,
  FileText,
  StickyNote,
} from "lucide-react";

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourse, markVideoComplete, saveNote, generateSummary } =
    useCourses();

  // --- STATE ---
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  // --- NOTES STATE ---
  const [currentNote, setCurrentNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteStatus, setNoteStatus] = useState(""); // "saved", "unsaved", "error"

  // --- AI SUMMARY STATE ---
  const [aiSummary, setAiSummary] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // --- 1. FETCH COURSE DATA ---
  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const data = await getCourse(courseId);

      if (data) {
        setCourse(data);
        // Initialize active video to first uncompleted, or just the first one
        if (data.videos && data.videos.length > 0) {
          const firstUncompleted = data.videos.find((v) => !v.isCompleted);
          setActiveVideoId(
            firstUncompleted ? firstUncompleted.videoId : data.videos[0].videoId
          );
        }
      }
      setLoading(false);
    };

    loadCourse();
  }, [courseId]);

  // --- 2. SYNC DATA WHEN VIDEO CHANGES ---
  useEffect(() => {
    if (course && activeVideoId) {
      const video = course.videos.find((v) => v.videoId === activeVideoId);

      // Load Note
      setCurrentNote(video?.note || "");
      setNoteStatus("saved");

      // Load AI Summary (if it exists in local state)
      setAiSummary(video?.aiSummary || "");
    }
  }, [activeVideoId, course]);

  const handleCopySummary = async () => {
    if (!aiSummary) return;
    try {
      await navigator.clipboard.writeText(aiSummary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-sky-500" size={32} />
      </div>
    );
  }

  // --- ERROR STATE ---
  if (!course || !course.videos || course.videos.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        Course not found or has no videos.
        <button
          onClick={() => navigate("/dashboard")}
          className="ml-4 text-sky-500 hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  // --- CALCULATE ACTIVE VIDEO ---
  const activeVideoIndex = course.videos.findIndex(
    (v) => v.videoId === activeVideoId
  );

  const activeVideo = course.videos[activeVideoIndex];

  if (!activeVideo) return <div className="p-10">Loading video...</div>;

  const isLastVideo = activeVideoIndex === course.videos.length - 1;
  const isFirstVideo = activeVideoIndex === 0;

  // --- HANDLERS ---
  const handleNext = () => {
    if (!isLastVideo) {
      setActiveVideoId(course.videos[activeVideoIndex + 1].videoId);
    }
  };

  const handlePrevious = () => {
    if (!isFirstVideo) {
      setActiveVideoId(course.videos[activeVideoIndex - 1].videoId);
    }
  };

  const handleMarkComplete = async () => {
    await markVideoComplete(course._id, activeVideo.videoId);
    setCourse((prev) => ({
      ...prev,
      videos: prev.videos.map((v) =>
        v.videoId === activeVideo.videoId ? { ...v, isCompleted: true } : v
      ),
      completedCount: (prev.completedCount || 0) + 1,
      progress: Math.round(
        ((prev.completedCount + 1) / prev.totalVideos) * 100
      ),
    }));
  };

  // --- NOTE HANDLERS ---
  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
    setNoteStatus("unsaved");
  };

  const handleSaveNote = async () => {
    setIsSavingNote(true);
    const success = await saveNote(course._id, activeVideoId, currentNote);
    setIsSavingNote(false);

    if (success) {
      setNoteStatus("saved");
      setCourse((prev) => ({
        ...prev,
        videos: prev.videos.map((v) =>
          v.videoId === activeVideoId ? { ...v, note: currentNote } : v
        ),
      }));
    } else {
      setNoteStatus("error");
    }
  };

  // --- AI HANDLER ---
  const handleGenerateAiSummary = async () => {
    setIsGeneratingAi(true);
    const summary = await generateSummary(course._id, activeVideoId);
    setIsGeneratingAi(false);

    if (summary) {
      setAiSummary(summary);
      setCourse((prev) => ({
        ...prev,
        videos: prev.videos.map((v) =>
          v.videoId === activeVideoId ? { ...v, aiSummary: summary } : v
        ),
      }));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-inter text-zinc-900 dark:text-zinc-50">
      {/* --- MOBILE BACKDROP --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`
            // Base Styles
            flex flex-col h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 
            transition-all duration-300 ease-in-out shrink-0 overflow-hidden
            
            // Mobile Styles (Drawer)
            fixed inset-y-0 left-0 z-50 w-72 shadow-2xl md:shadow-none
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

            // Desktop Styles (Relative + Width Transition)
            md:relative md:transform-none md:z-0
            ${
              isSidebarOpen
                ? "md:w-80 md:border-r md:translate-x-0"
                : "md:w-0 md:border-none"
            }
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
          <h1 className="font-spacegrotesk font-bold text-lg leading-tight mb-3 line-clamp-2">
            {course.title}
          </h1>
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

        {/* Video List */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {course.videos.map((video, index) => {
            const isActive = video.videoId === activeVideoId;
            const isCompleted = video.isCompleted || video.completed;

            return (
              <button
                key={video.videoId}
                onClick={() => {
                  setActiveVideoId(video.videoId);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-sky-50 dark:bg-sky-900/20"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  }
                `}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2
                      size={18}
                      className="text-green-500 fill-green-500/10"
                    />
                  ) : isActive ? (
                    <PlayCircle
                      size={18}
                      className="text-sky-500 fill-sky-500/10"
                    />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400 transition-colors" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium mb-0.5 line-clamp-2 ${
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

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AnimatedThemeToggle className="size-9 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                Appearance
              </span>
              <span className="text-[10px] text-zinc-500">Switch theme</span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Collapse Sidebar"
          >
            <SidebarClose size={18} />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative w-full">
        <header className="h-16 shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 text-sm w-full">
            {/* Desktop Expand Button */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:block p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Expand Sidebar"
              >
                <SidebarOpen size={20} />
              </button>
            )}

            {/* Mobile-Only Open Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              title="Open Menu"
            >
              <SidebarOpen size={20} />
            </button>

            <div className="flex items-center gap-2 overflow-hidden">
              <Link
                to="/dashboard"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium whitespace-nowrap"
              >
                My Courses
              </Link>
              <ChevronRight size={14} className="text-zinc-400 shrink-0" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {course.title}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl relative z-0">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>

          {/* Controls Section */}
          <div className="mt-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2 md:line-clamp-1">
                {activeVideoIndex + 1}. {activeVideo.title}
              </h2>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handlePrevious}
                disabled={isFirstVideo}
                className="flex-1 md:flex-none justify-center flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleMarkComplete}
                className={`
                    flex-1 md:flex-none justify-center flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 whitespace-nowrap
                    ${
                      activeVideo.isCompleted || activeVideo.completed
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/50"
                        : "bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-500/20"
                    }
                `}
              >
                {activeVideo.isCompleted || activeVideo.completed ? (
                  <Check size={16} />
                ) : null}
                <span>
                  {activeVideo.isCompleted || activeVideo.completed
                    ? "Completed"
                    : "Mark Complete"}
                </span>
              </button>

              <button
                onClick={handleNext}
                disabled={isLastVideo}
                className="flex-1 md:flex-none justify-center flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none">
              {["Description", "Notes", "AI Summary"].map((tab) => {
                const tabKey = tab.toLowerCase().replace(" ", "_"); // "ai_summary"
                const isActive = activeTab === tabKey;

                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`
                        pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] whitespace-nowrap flex items-center gap-2
                        ${
                          isActive
                            ? "border-sky-500 text-sky-600 dark:text-sky-400"
                            : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        }
                    `}
                  >
                    {tab === "Description" && <FileText size={16} />}
                    {tab === "Notes" && <StickyNote size={16} />}
                    {tab === "AI Summary" && <Sparkles size={16} />}
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pb-10">
            {/* TAB: DESCRIPTION */}
            {activeTab === "description" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    About this lesson
                  </h3>
                </div>

                <Linkify
                  options={{
                    target: "_blank",
                    className: "text-sky-600 dark:text-sky-400 hover:underline",
                  }}
                >
                  <div className="whitespace-pre-wrap break-words font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {activeVideo.description || (
                      <span className="italic text-zinc-500">
                        No description available.
                      </span>
                    )}
                  </div>
                </Linkify>
              </div>
            )}

            {/* TAB: NOTES */}
            {activeTab === "notes" && (
              <div className="animate-in fade-in duration-300 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    Your Personal Notes
                  </h3>
                  <span
                    className={`text-xs ${
                      noteStatus === "unsaved"
                        ? "text-amber-500"
                        : noteStatus === "saved"
                        ? "text-green-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {noteStatus === "unsaved"
                      ? "Unsaved changes"
                      : noteStatus === "saved"
                      ? "Saved"
                      : ""}
                  </span>
                </div>

                <textarea
                  value={currentNote}
                  onChange={handleNoteChange}
                  placeholder="Type your notes here... (e.g. key takeaways, timestamps, formulas)"
                  className="w-full h-64 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 resize-none text-zinc-700 dark:text-zinc-300 transition-colors"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    disabled={isSavingNote || noteStatus === "saved"}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${
                        noteStatus === "saved"
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                          : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95"
                      }
                    `}
                  >
                    {isSavingNote ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {isSavingNote ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: AI SUMMARY */}
            {activeTab === "ai_summary" && (
              <div className="animate-in fade-in duration-300">
                {!aiSummary ? (
                  // EMPTY STATE
                  <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 text-center">
                    <div className="size-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                      <Sparkles
                        size={20}
                        className="text-zinc-500 dark:text-zinc-400"
                      />
                    </div>
                    <h3 className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">
                      Generate AI Summary
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-xs mb-6 leading-relaxed">
                      Get a concise summary of this video's key takeaways using
                      Gemini AI.
                    </p>
                    <button
                      onClick={handleGenerateAiSummary}
                      disabled={isGeneratingAi}
                      className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-all shadow-sm shadow-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGeneratingAi ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Generate Summary
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  // FILLED STATE
                  <div className="relative group">
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 selection:bg-sky-500 selection:text-white">
                      <ReactMarkdown
                        components={{
                          // 1. Fix Headings: Add explicit top/bottom margins & bold font
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-zinc-100"
                              {...props}
                            />
                          ),

                          // 2. Fix Paragraphs: Add bottom margin to create gaps between text blocks
                          p: ({ node, ...props }) => (
                            <p className="mb-4 leading-relaxed" {...props} />
                          ),

                          // 3. Fix Bold: Switch to 'font-bold' (700) instead of 'semibold' (600)
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-black dark:text-white"
                              {...props}
                            />
                          ),

                          // Lists: Keep your existing styling but add 'mb-4' for spacing
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-5 mb-4 space-y-2"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li
                              className="pl-1 marker:text-sky-500"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {aiSummary}
                      </ReactMarkdown>
                    </div>

                    {/* Button Footer Section */}
                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      {/* NEW: Copy Button (Bottom Left) */}
                      <button
                        onClick={handleCopySummary}
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1.5 transition-colors"
                      >
                        {isCopied ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                        {isCopied ? "Copied to clipboard!" : "Copy Summary"}
                      </button>

                      {/* EXISTING: Regenerate Button (Bottom Right) */}
                      <button
                        onClick={handleGenerateAiSummary}
                        disabled={isGeneratingAi}
                        className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw
                          size={12}
                          className={isGeneratingAi ? "animate-spin" : ""}
                        />
                        {isGeneratingAi ? "Regenerating..." : "Regenerate"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseViewer;
