import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import {
  Play,
  Clock,
  MoreHorizontal,
  Plus,
  Flame,
  Search,
  Loader2,
  Menu,
  Trash2,
  ArrowRight,
  AlertTriangle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DELETE CONFIRMATION MODAL COMPONENT ---
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  courseTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
            <AlertTriangle size={24} />
          </div>

          <h3 className="text-lg font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Delete Course?
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              "{courseTitle}"
            </span>
            ? This action cannot be undone and all progress will be lost.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DROPDOWN MENU COMPONENT (Reusable) ---
const CourseMenu = ({ isOpen, onClose, onContinue, onDelete }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 top-8 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
        <div className="p-1.5 flex flex-col gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowRight size={14} className="text-sky-500" />
            Continue
          </button>

          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-0.5 mx-2" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Course
          </button>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const { courses, isLoading, deleteCourse } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Modals & Menus States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Featured Menu State
  const [showFeaturedMenu, setShowFeaturedMenu] = useState(false);

  // Grid Menu State (Stores the ID of the course whose menu is open)
  const [activeGridMenuId, setActiveGridMenuId] = useState(null);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    course: null,
  });

  const featuredCourse = courses && courses.length > 0 ? courses[0] : null;

  // --- Handlers ---

  const openDeleteModal = (course) => {
    setShowFeaturedMenu(false);
    setActiveGridMenuId(null);
    setDeleteModal({ isOpen: true, course });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.course) {
      await deleteCourse(deleteModal.course._id);
      setDeleteModal({ isOpen: false, course: null });
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      <Sidebar
        onOpenImportModal={() => setIsImportModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        onConfirm={handleConfirmDelete}
        courseTitle={deleteModal.course?.title}
      />

      <main className="flex-1 overflow-y-auto">
        {/* --- MOBILE HEADER --- */}
        <div className="md:hidden sticky top-0 z-30 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-1.5 rounded-lg shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 96 96"
                fill="currentColor"
              >
                <rect x="16" y="16" width="64" height="12" rx="6" />
                <rect x="28" y="32" width="64" height="12" rx="6" />
                <rect x="16" y="48" width="64" height="12" rx="6" />
                <rect x="28" y="64" width="64" height="12" rx="6" />
              </svg>
            </div>
            <span className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100">
              Simplay
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8 md:px-12 md:py-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50">
                Dashboard
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                Welcome back, {user?.name?.split(" ")[0]}. Ready to focus?
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm">
                <Flame size={16} className="text-orange-500 fill-orange-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  12 Day Streak
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm">
                <Clock size={16} className="text-sky-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  48m Today
                </span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-sky-500" size={32} />
            </div>
          ) : (
            <>
              {/* Featured / Jump Back In Section */}
              {featuredCourse && (
                <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    Jump Back In
                  </h2>

                  {/* REMOVED overflow-hidden from here so menu doesn't get clipped */}
                  <div className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      {/* Thumbnail Side - Added specific rounding to mask corners */}
                      <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                        <img
                          src={featuredCourse.thumbnail}
                          alt="Course"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Play
                              size={20}
                              className="fill-white text-white ml-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                            In Progress
                          </span>

                          {/* Featured 3-Dot Menu */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowFeaturedMenu(!showFeaturedMenu)
                              }
                              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                            >
                              <MoreHorizontal size={20} />
                            </button>

                            <CourseMenu
                              isOpen={showFeaturedMenu}
                              onClose={() => setShowFeaturedMenu(false)}
                              onContinue={() => {
                                navigate(`/course/${featuredCourse._id}`);
                                setShowFeaturedMenu(false);
                              }}
                              onDelete={() => openDeleteModal(featuredCourse)}
                            />
                          </div>
                        </div>

                        <h3 className="text-2xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-1 line-clamp-1">
                          {featuredCourse.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                          Continue where you left off
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-zinc-600 dark:text-zinc-400">
                              {featuredCourse.progress || 0}% Complete
                            </span>
                            <span className="text-zinc-400">
                              {featuredCourse.completedCount || 0}/
                              {featuredCourse.totalVideos} Videos
                            </span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sky-500 rounded-full"
                              style={{
                                width: `${featuredCourse.progress || 0}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              navigate(`/course/${featuredCourse._id}`)
                            }
                            className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-zinc-200/50 dark:shadow-none"
                          >
                            <Play size={16} className="fill-current" />
                            Resume Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* All Courses Grid */}
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-100">
                    Your Courses
                  </h2>
                  <div className="relative w-full sm:w-auto">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      type="text"
                      placeholder="Filter courses..."
                      className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 w-full sm:w-[200px] transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Add New Course Card */}
                  <button
                    className="group flex flex-col items-center justify-center h-[280px] rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-sky-500/50 bg-transparent hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-all duration-300 cursor-pointer"
                    onClick={() => setIsImportModalOpen(true)}
                  >
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 flex items-center justify-center mb-3 transition-colors">
                      <Plus
                        size={24}
                        className="text-zinc-400 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Import Playlist
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Paste a YouTube URL
                    </p>
                  </button>

                  {/* Render Course List */}
                  {courses.map((course) => (
                    // REMOVED overflow-hidden from here
                    <div
                      key={course._id}
                      className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Clickable Area for Navigation */}
                      <div
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="cursor-pointer"
                      >
                        {/* Added rounded-t-3xl to image container to mask top corners manually */}
                        <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-t-3xl">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          {/* Clickable Title */}
                          <h3
                            onClick={() => navigate(`/course/${course._id}`)}
                            className="font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-100 truncate cursor-pointer hover:text-sky-500 transition-colors flex-1"
                          >
                            {course.title}
                          </h3>

                          {/* 3-DOT MENU FOR GRID ITEM */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveGridMenuId(
                                  activeGridMenuId === course._id
                                    ? null
                                    : course._id
                                );
                              }}
                              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                            >
                              <MoreHorizontal size={18} />
                            </button>

                            {/* Dropdown */}
                            <CourseMenu
                              isOpen={activeGridMenuId === course._id}
                              onClose={(e) => {
                                if (e) e.stopPropagation();
                                setActiveGridMenuId(null);
                              }}
                              onContinue={() =>
                                navigate(`/course/${course._id}`)
                              }
                              onDelete={() => openDeleteModal(course)}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-zinc-500 mb-4">
                          {course.totalVideos} Videos • By {course.author}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                course.progress === 100
                                  ? "bg-green-500"
                                  : "bg-sky-500"
                              }`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
