// src/components/GlobalTimeTracker.jsx
import { useDailyTimeTracker } from "../hooks/useDailyTimeTracker";

const GlobalTimeTracker = () => {
  // This hook handles all the logic (interval, syncing, localstorage)
  // It returns data, but we don't need to render it here.
  useDailyTimeTracker();

  // This component is "headless" - it renders nothing to the UI
  return null;
};

export default GlobalTimeTracker;
