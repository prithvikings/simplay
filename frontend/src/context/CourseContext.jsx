import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Python for Beginners - Full Course",
      author: "TechWithTim",
      thumbnail: "https://i.ytimg.com/vi/sxTmJE4k0bc/maxresdefault.jpg",
      progress: 10, // Overall course progress calculated from videos
      totalVideos: 5,
      // ADD THIS VIDEOS ARRAY
      videos: [
        {
          id: "sxTmJE4k0bc",
          title: "Introduction to Python",
          duration: "10:24",
          completed: true,
        },
        {
          id: "8DvywoWv6fI",
          title: "Variables & Data Types",
          duration: "15:30",
          completed: false,
        },
        {
          id: "kqtD5dpn9C8",
          title: "Loops and Logic",
          duration: "22:15",
          completed: false,
        },
        {
          id: "4_99c2B9F5I",
          title: "Functions and Scope",
          duration: "18:45",
          completed: false,
        },
        {
          id: "JeznW_7dlB0",
          title: "Data Structures",
          duration: "35:10",
          completed: false,
        },
      ],
    },
    // ... other courses (they don't strictly need the videos array for this demo to work,
    // but the viewer won't load for them if clicked)
    {
      id: 2,
      title: "React JS Masterclass 2024",
      // ... rest of course 2
      videos: [], // empty for now
    },
    // ... course 3
  ]);

  const addCourse = (newCourse) => {
    // In a real app, the backend would fetch the videos array here.
    // For now, we just add the basic info.
    setCourses((prev) => [...prev, { ...newCourse, videos: [], progress: 0 }]);
  };

  // NEW FUNCTION: Mark a specific video as complete
  const markVideoComplete = (courseId, videoId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === parseInt(courseId)) {
          const updatedVideos = course.videos.map((video) =>
            video.id === videoId ? { ...video, completed: true } : video
          );

          // Recalculate overall progress
          const completedCount = updatedVideos.filter(
            (v) => v.completed
          ).length;
          const newProgress = Math.round(
            (completedCount / updatedVideos.length) * 100
          );

          return {
            ...course,
            videos: updatedVideos,
            progress: newProgress,
            completedVideos: completedCount,
          };
        }
        return course;
      })
    );
  };

  // NEW HELPER: Get a single course by ID
  const getCourse = (id) => {
    return courses.find((c) => c.id === parseInt(id));
  };

  return (
    // Add new functions to the provider value
    <CourseContext.Provider
      value={{ courses, addCourse, getCourse, markVideoComplete }}
    >
      {children}
    </CourseContext.Provider>
  );
};
