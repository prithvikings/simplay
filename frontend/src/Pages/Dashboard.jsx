import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { Play, Clock, MoreHorizontal, Plus, Flame, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Get the most recent course (just picking first one for demo)
  const featuredCourse = courses[0];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      <Sidebar />
      {/* NEW: Render Modal */}
      <ImportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
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

            {/* Stats Pills */}
            <div className="flex items-center gap-3">
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

          {/* Featured / Jump Back In Section */}
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Jump Back In
            </h2>

            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail Side */}
                <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={featuredCourse.thumbnail}
                    alt="Course"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play size={20} className="fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                      In Progress
                    </span>
                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <h3 className="text-2xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                    {featuredCourse.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    Up Next: {featuredCourse.lastWatched}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {featuredCourse.progress}% Complete
                      </span>
                      <span className="text-zinc-400">
                        {featuredCourse.completedVideos}/
                        {featuredCourse.totalVideos} Videos
                      </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${featuredCourse.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/course/${featuredCourse.id}`)} // Add navigation handler
                      className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={16} className="fill-current" />
                      Resume Learning
                    </button>
                    <button className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                      View Syllabus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All Courses Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-100">
                Your Courses
              </h2>
              {/* Search Bar */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Filter courses..."
                  className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 w-[200px] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add New Course Card */}
              <button
                className="group flex flex-col items-center justify-center h-[280px] rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-sky-500/50 bg-transparent hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-all duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
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
                <Link
                  to={`/course/${course.id}`}
                  key={course.id}
                  className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-100 truncate mb-1">
                      {course.title}
                    </h3>
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
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
