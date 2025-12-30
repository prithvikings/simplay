import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import this
import { CourseProvider } from "./context/CourseContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {/* AuthProvider must be inside Router if it uses navigation, 
            but ours doesn't, so this placement is fine. */}
        <AuthProvider>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <CourseProvider>
              <App />
            </CourseProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
