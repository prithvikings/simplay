import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./Landing/LandingPage";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CourseViewer from "./Pages/CourseViewer";
import Courses from "./Pages/Courses";
import DeveloperMsg from "./Pages/DeveloperMsg";
import Profile from "./Pages/Profile";

// 1. IMPORT THE TRACKER
import GlobalTimeTracker from "./components/GlobalTimeTracker";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  // 2. GET THE TOKEN TO DECIDE WHEN TO TRACK
  const { token } = useAuth();

  return (
    <>
      {/* 3. CONDITIONALLY RENDER THE TRACKER */}
      {/* This ensures tracking starts on Login and stops on Logout */}
      {/* It sits outside Routes, so it keeps counting while you navigate pages */}
      {token && <GlobalTimeTracker />}

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseViewer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer"
          element={
            <ProtectedRoute>
              <DeveloperMsg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
