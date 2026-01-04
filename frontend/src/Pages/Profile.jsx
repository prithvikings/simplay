import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Clock,
  BookOpen,
  Calendar,
  LogOut,
  Layers,
  Play,
  Activity,
  Loader2,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  AlertTriangle,
  Menu,
} from "lucide-react";
import api from "../api/axios"; // OPTIMIZATION: Use your custom axios instance
import { TextLoopBasic } from "../components/Textloader";

// --- REUSABLE COMPONENTS ---

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
      <div className="absolute right-0 top-8 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
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

const Profile = () => {
  const { user, logout } = useAuth();
  const { courses, deleteCourse } = useCourses();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // -- MENU & MODAL STATE --
  const [activeGridMenuId, setActiveGridMenuId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    course: null,
  });

  // -- HANDLERS --
  const openDeleteModal = (course) => {
    setActiveGridMenuId(null);
    setDeleteModal({ isOpen: true, course });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.course) {
      await deleteCourse(deleteModal.course._id);
      setDeleteModal({ isOpen: false, course: null });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // OPTIMIZATION: Using 'api' instance handles token automatically
        const res = await api.get("/user/profile");
        setProfileData(res.data.user);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- DERIVED METRICS ---
  const totalCourses = courses.length;
  const inProgressCourses = courses.filter(
    (c) => c.progress > 0 && c.progress < 100
  ).length;

  const currentStreak =
    profileData?.streak?.current ?? user?.streak?.current ?? user?.streak ?? 0;

  const totalSeconds = profileData?.totalSeconds || 0;
  const totalHours = (totalSeconds / 3600).toFixed(1);

  const rawDate = profileData?.createdAt || user?.createdAt;
  const joinDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  // --- SUB-COMPONENTS ---
  const StatCard = ({ icon: Icon, label, value, subtext, colorClass }) => (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-full">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2.5 rounded-lg ${colorClass} bg-opacity-10 dark:bg-opacity-10`}
        >
          <Icon size={20} className={colorClass.replace("bg-", "text-")} />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div>
        <h3 className="text-2xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          {value}
        </h3>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 font-mono">
          {subtext}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onOpenImportModal={() => setIsImportModalOpen(true)}
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
        {/* --- MOBILE HEADER (Identical to Dashboard) --- */}
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
          {isLoading ? (
            <div className="h-[60vh] flex items-center justify-center">
              <Loader2 className="animate-spin text-sky-500" size={32} />
              <TextLoopBasic />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              {/* --- HEADER --- */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <img
                        src={profileData?.avatar || user?.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-3xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                      {profileData?.name || user?.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-zinc-500 dark:text-zinc-400 text-sm">
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <Calendar size={12} />
                        <span>Joined {joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <Activity size={12} />
                        <span>Free Plan</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full md:w-auto px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>

              {/* --- METRICS GRID --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={Flame}
                  label="Current Streak"
                  value={currentStreak}
                  subtext="Daily consistency"
                  colorClass="bg-orange-500 text-orange-500"
                />
                <StatCard
                  icon={Clock}
                  label="Hours Focused"
                  value={totalHours}
                  subtext="Total study time"
                  colorClass="bg-sky-500 text-sky-500"
                />
                <StatCard
                  icon={BookOpen}
                  label="In Progress"
                  value={inProgressCourses}
                  subtext="Active courses"
                  colorClass="bg-purple-500 text-purple-500"
                />
                <StatCard
                  icon={Layers}
                  label="Total Courses"
                  value={totalCourses}
                  subtext="Library size"
                  colorClass="bg-indigo-500 text-indigo-500"
                />
              </div>

              {/* --- MY LIBRARY (ALL COURSES) --- */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50">
                    My Library
                  </h2>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
                    {courses.length} Items
                  </span>
                </div>

                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        // FIX: Removed overflow-hidden here so the dropdown can spill out
                        // FIX: Added conditional z-index so open menu sits on top of other cards
                        className={`group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 ${
                          activeGridMenuId === course._id ? "z-50" : "z-0"
                        }`}
                      >
                        {/* Thumbnail - Added rounded-t-2xl manually */}
                        <div
                          className="aspect-video relative bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer rounded-t-2xl"
                          onClick={() => navigate(`/course/${course._id}`)}
                        >
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                              <Play
                                size={20}
                                className="fill-zinc-900 text-zinc-900 ml-1"
                              />
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3
                              onClick={() => navigate(`/course/${course._id}`)}
                              className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100 line-clamp-1 cursor-pointer hover:text-sky-500 transition-colors flex-1 mr-2"
                            >
                              {course.title}
                            </h3>

                            {/* 3-DOT MENU */}
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
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <MoreHorizontal size={16} />
                              </button>

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

                          <div className="mt-auto pt-4 space-y-3">
                            <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              <span>{course.progress}% Complete</span>
                              <span>{course.totalVideos} Videos</span>
                            </div>

                            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  course.progress === 100
                                    ? "bg-emerald-500"
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
                  <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                      <Layers size={32} className="text-zinc-400" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      No courses yet
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 max-w-sm text-center">
                      Import a YouTube playlist to get started with your
                      distraction-free learning journey.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
