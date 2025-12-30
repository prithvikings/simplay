import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { Link } from "react-router-dom";
import { Search, Plus, Play, MoreHorizontal } from "lucide-react";

const Courses = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter logic
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      {/* Sidebar with Modal Trigger */}
      <Sidebar onOpenImportModal={() => setIsModalOpen(true)} />

      {/* Import Modal */}
      <ImportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 md:px-12 md:py-12">
          {/* --- Page Header --- */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div>
              <h1 className="text-3xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                My Courses
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Manage and track your learning progress across all playlists.
              </p>
            </div>

            {/* Search Bar */}
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

          {/* --- Course Grid --- */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Add New Trigger Card */}
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
                <Link
                  to={`/course/${course._id}`}
                  key={course._id}
                  className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Play size={20} className="fill-white ml-1" />
                      </div>
                    </div>

                    {/* Badge */}
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
                      <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>

                    <h3 className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>

                    {/* Progress Section (Pushed to bottom) */}
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
                </Link>
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
