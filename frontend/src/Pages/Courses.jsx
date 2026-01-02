import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useNavigate } from "react-router-dom"; // Changed Link to useNavigate
import {
  Search,
  Plus,
  Play,
  MoreHorizontal,
  ArrowRight,
  Trash2,
  AlertTriangle,
  Menu,
} from "lucide-react";

// --- REUSED COMPONENTS (Ideally move these to separate files later) ---

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  courseTitle,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />
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
            ? This action cannot be undone.
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
            <ArrowRight size={14} className="text-sky-500" /> Continue
          </button>
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-0.5 mx-2" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} /> Delete Course
          </button>
        </div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---

const Courses = () => {
  const { user } = useAuth();
  const { courses, deleteCourse } = useCourses(); // Add deleteCourse
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Menu & Delete Logic
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    course: null,
  });

  const handleConfirmDelete = async () => {
    if (deleteModal.course) {
      await deleteCourse(deleteModal.course._id);
      setDeleteModal({ isOpen: false, course: null });
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      <Sidebar
        onOpenImportModal={() => setIsModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <ImportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        onConfirm={handleConfirmDelete}
        courseTitle={deleteModal.course?.title}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
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

        <div className="max-w-6xl mx-auto px-6 py-8 md:px-12 md:py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-200 border-dashed dark:border-zinc-800 pb-8">
            <div>
              <h1 className="text-3xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                My Courses
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Manage and track your learning progress across all playlists.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                placeholder="Search your library..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {/* Add New Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex flex-col items-center justify-center min-h-[300px] rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-sky-500/50 bg-transparent hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-all duration-300 cursor-pointer text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 flex items-center justify-center mb-4 transition-colors">
                  <Plus
                    size={28}
                    className="text-zinc-400 group-hover:text-sky-500 transition-colors"
                  />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Add New Course
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-[150px]">
                  Import a public YouTube playlist to get started.
                </p>
              </button>

              {/* Course Cards */}
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Clickable Image Area */}
                  <div
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="cursor-pointer aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-t-xl"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Play size={20} className="fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full">
                      {course.totalVideos} Videos
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 px-2 py-1 rounded-md">
                        {course.author}
                      </span>

                      {/* Menu Button */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(
                              activeMenuId === course._id ? null : course._id
                            );
                          }}
                          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        <CourseMenu
                          isOpen={activeMenuId === course._id}
                          onClose={(e) => {
                            if (e) e.stopPropagation();
                            setActiveMenuId(null);
                          }}
                          onContinue={() => navigate(`/course/${course._id}`)}
                          onDelete={() => {
                            setActiveMenuId(null);
                            setDeleteModal({ isOpen: true, course });
                          }}
                        />
                      </div>
                    </div>

                    <h3
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 leading-tight cursor-pointer hover:text-sky-500 transition-colors"
                    >
                      {course.title}
                    </h3>

                    {/* Progress Section */}
                    <div className="mt-auto pt-4">
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Progress
                        </span>
                        <span className="text-zinc-900 dark:text-zinc-200">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            course.progress === 100
                              ? "bg-green-500"
                              : "bg-sky-500"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <Search
                  size={32}
                  className="text-zinc-300 dark:text-zinc-600"
                />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                No courses found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
                We couldn't find any courses matching "{searchQuery}". Try a
                different term or create a new one.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsModalOpen(true);
                }}
                className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-colors"
              >
                Clear Search & Add Course
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
