import { useState, useEffect, useRef } from "react";
import axios from "../api/axios"; // Use your configured axios instance

export const useDailyTimeTracker = () => {
  const [secondsToday, setSecondsToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Ref acts as a "bucket" for seconds that haven't been sent to DB yet
  const unsavedSecondsRef = useRef(0);

  // 1. Fetch initial time from backend on mount
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await axios.get("/user/today-usage");
        setSecondsToday(res.data.seconds);
      } catch (error) {
        console.error("Failed to fetch time", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTime();
  }, []);

  // 2. Logic to Sync Data
  const syncTime = async () => {
    const secondsToSync = unsavedSecondsRef.current;
    if (secondsToSync > 0) {
      try {
        await axios.post("/user/track-time", { seconds: secondsToSync });
        // Only decrement if successful to prevent data loss
        unsavedSecondsRef.current -= secondsToSync;
      } catch (error) {
        console.error("Sync failed, retrying next cycle");
      }
    }
  };

  // 3. Counting & Interval Logic
  useEffect(() => {
    // TIMER: Increment local state every second if tab is visible
    const timerInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setSecondsToday((prev) => prev + 1);
        unsavedSecondsRef.current += 1;
      }
    }, 1000);

    // SYNCER: Send data to backend every 30 seconds
    const syncInterval = setInterval(() => {
      syncTime();
    }, 30000);

    // SAVE ON CLOSE: Handle tab close / refresh
    const handleBeforeUnload = () => {
      if (unsavedSecondsRef.current > 0) {
        // We use pure fetch with keepalive: true because axios can be cancelled on tab close
        const token = localStorage.getItem("token");
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

        fetch(`${backendUrl}/user/track-time`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ seconds: unsavedSecondsRef.current }),
          keepalive: true, // Critical: keeps request alive after tab closes
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(timerInterval);
      clearInterval(syncInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Optional: Try to sync on component unmount
      syncTime();
    };
  }, []);

  // Helper to format seconds nicely
  const formatTime = () => {
    if (isLoading) return "...";
    const hours = Math.floor(secondsToday / 3600);
    const minutes = Math.floor((secondsToday % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return { secondsToday, formatTime };
};
