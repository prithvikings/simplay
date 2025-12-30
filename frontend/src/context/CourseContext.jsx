import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fetch Courses (Summaries only) when user logs in
  useEffect(() => {
    if (user) {
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [user]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/courses");
      setCourses(data.courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  // 3. Get Single Course (Secure & Complete)
  const getCourse = async (courseId) => {
    // Check local state
    const existing = courses.find(
      (c) => c._id === courseId || c.id === courseId
    );

    // If it exists AND has videos, return it
    if (existing && existing.videos && existing.videos.length > 0) {
      return existing;
    }

    // Otherwise fetch full details
    try {
      const { data } = await api.get(`/courses/${courseId}`);

      // Update global state with the FULL course object (including videos)
      setCourses((prev) =>
        prev.map((c) => (c._id === courseId ? data.course : c))
      );

      return data.course;
    } catch (error) {
      console.error("Error fetching single course", error);
      return null;
    }
  };

  // 4. Mark Video Complete (FIXED)
  const markVideoComplete = async (courseId, videoId) => {
    // Optimistic Update
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        // Find the matching course
        if (course._id === courseId || course.id === courseId) {
          // --- THE FIX: SAFETY CHECK ---
          // If this course object doesn't have videos loaded yet (it's a summary),
          // we can't map over them. Just return the course as is.
          if (!course.videos || !Array.isArray(course.videos)) {
            return course;
          }
          // -----------------------------

          const updatedVideos = course.videos.map((video) =>
            video.videoId === videoId
              ? { ...video, completed: true, isCompleted: true }
              : video
          );

          // Recalculate progress locally
          const completedCount = updatedVideos.filter(
            (v) => v.completed || v.isCompleted
          ).length;

          const newProgress = Math.round(
            (completedCount / updatedVideos.length) * 100
          );

          return {
            ...course,
            videos: updatedVideos,
            progress: newProgress,
            completedCount: completedCount,
          };
        }
        return course;
      })
    );

    // Send to Backend
    try {
      await api.patch(`/courses/${courseId}/progress`, {
        videoId: videoId,
        completed: true,
      });
    } catch (error) {
      console.error("Failed to save progress", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{ courses, addCourse, getCourse, markVideoComplete, isLoading }}
    >
      {children}
    </CourseContext.Provider>
  );
};
