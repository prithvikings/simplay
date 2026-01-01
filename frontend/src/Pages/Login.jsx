import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      authenticateWithBackend(tokenResponse.access_token),
    onError: () => setError("Login Failed"),
  });

  const authenticateWithBackend = async (credential) => {
    setIsLoading(true);
    setError("");
    try {
      const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;

      // 1. Send Request
      const { data } = await axios.post(BACKEND_URL, {
        idToken: credential,
      });

      if (data.success) {
        // --- STREAK LOGIC START ---
        // This captures the flag sent from your Backend Controller
        if (data.streakUpdated) {
          sessionStorage.setItem("showStreakModal", "true");
        }
        // --- STREAK LOGIC END ---

        // 2. Update Context & Navigate
        login(data.user, data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Backend Auth Error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20">
      {/* --- PREMIUM BACKGROUND --- */}

      {/* 1. Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
          color: "var(--grid-color, #a1a1aa)", // Zinc-400
        }}
      />

      {/* 2. Radial Gradient Mask */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/80 dark:from-zinc-950 dark:via-transparent dark:to-zinc-950/80" />

      {/* 3. Animated Light Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sky-400/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* --- NAVIGATION (Floating Pill) --- */}
      <nav className="absolute top-4 left-4 md:top-6 md:left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer
            group flex items-center gap-2 pl-2 pr-4 py-1 md:pl-3 md:px-6 
            corner-squircel
            bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md
            border border-zinc-200/60 dark:border-zinc-800/60
            shadow-sm hover:shadow-md
            transition-all duration-300 ease-out
            text-zinc-600 dark:text-zinc-400
            hover:text-zinc-900 dark:hover:text-zinc-100
            hover:border-zinc-300 dark:hover:border-zinc-700
          "
        >
          <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft size={14} />
          </div>
          <span className="font-spacegrotesk text-sm font-medium">Back</span>
        </button>
      </nav>

      {/* --- MAIN LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-[420px] px-4 animate-in fade-in zoom-in-95 duration-700 slide-in-from-bottom-4">
        {/* The Glass Container */}
        <div
          className="
          relative overflow-hidden
          rounded-3xl
          bg-white/80 dark:bg-zinc-900/60 
          backdrop-blur-xl
          border border-white/20 dark:border-zinc-700/30
          shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)]
        "
        >
          {/* Inner Highlight Border */}
          <div className="absolute inset-0 rounded-3xl border border-zinc-200/50 dark:border-zinc-700/50 pointer-events-none" />

          {/* Decor: Top gradient line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50" />

          <div className="p-6 md:p-12 flex flex-col items-center text-center">
            {/* Animated Logo Container */}
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-sky-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 p-3 md:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-zinc-900 dark:text-zinc-50 transition-transform duration-500 group-hover:scale-110"
                >
                  <rect
                    x="16"
                    y="16"
                    width="64"
                    height="12"
                    rx="6"
                    fill="currentColor"
                    className="opacity-80"
                  />
                  <rect
                    x="28"
                    y="32"
                    width="64"
                    height="12"
                    rx="6"
                    fill="currentColor"
                  />
                  <rect
                    x="16"
                    y="48"
                    width="64"
                    height="12"
                    rx="6"
                    fill="currentColor"
                    className="opacity-80"
                  />
                  <rect
                    x="28"
                    y="64"
                    width="64"
                    height="12"
                    rx="6"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Headlines */}
            <h1 className="text-2xl md:text-3xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6 md:mb-8 font-inter leading-relaxed w-full mx-auto max-w-[250px]">
              Import playlists and learn without distractions. Your focus zone
              awaits.
            </p>

            {/* Error State */}
            {error && (
              <div className="w-full mb-6 p-3 rounded-xl bg-red-500/5 border border-red-500/20 flex items-start gap-3 text-red-600 dark:text-red-400 text-xs text-left animate-in slide-in-from-top-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed opacity-70">
                <Loader2 className="animate-spin text-sky-500" size={18} />
                <span className="font-medium text-sm text-zinc-500">
                  Authenticating...
                </span>
              </div>
            ) : (
              <>
                <button
                  onClick={googleLogin}
                  className="
                    cursor-pointer
                    relative w-full h-12
                    flex items-center justify-center gap-3
                    rounded-xl
                    bg-white dark:bg-zinc-800
                    border border-zinc-200 dark:border-zinc-700
                    text-zinc-700 dark:text-zinc-200
                    font-medium text-sm font-spacegrotesk
                    shadow-sm
                    hover:bg-zinc-50 dark:hover:bg-zinc-750
                    hover:border-zinc-300 dark:hover:border-zinc-600
                    active:scale-[0.98]
                    transition-all duration-200
                    group
                  "
                >
                  {/* Google SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>

                  <span>Continue with Google</span>

                  <ArrowLeft className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-50 group-hover:ml-0 rotate-180 transition-all duration-300" />
                </button>

                <div className="relative py-2 flex items-center justify-center gap-2 opacity-50">
                  <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                  <span className="text-[10px] uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-medium">
                    Secure Access
                  </span>
                  <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                </div>
              </>
            )}

            {/* Footer / Terms */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/10 border border-sky-500/20 text-[10px] font-medium text-sky-700 dark:text-sky-300">
                <Sparkles size={10} />
                <span>Free & Open Source</span>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 text-center max-w-[250px]">
                By continuing, you acknowledge that Simplay is a personal
                project designed for educational purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Shadow underneath to ground the card */}
        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-zinc-900/20 dark:bg-black/50 blur-xl rounded-[100%] z-[-1]" />
      </div>
    </div>
  );
};

export default Login;
