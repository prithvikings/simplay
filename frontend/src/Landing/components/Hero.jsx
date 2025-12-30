import React from "react";
import { Button } from "../../components/ui/button";

const Hero = () => {
  const ArrowCircleIcon = ({ className = "" }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={`-rotate-45 ${className}`}
      aria-hidden
    >
      <g fill="currentColor">
        {/* Background circle */}
        <path
          d="M9 1C4.589 1 1 4.589 1 9C1 13.411 4.589 17 9 17C13.411 17 17 13.411 17 9C17 4.589 13.411 1 9 1Z"
          opacity="0.4"
        />
        {/* Arrow */}
        <path d="M8.47 11.72C8.177 12.013 8.177 12.488 8.47 12.781C8.616 12.927 8.808 13.001 9 13.001C9.192 13.001 9.384 12.928 9.53 12.781L12.78 9.53103C13.073 9.23803 13.073 8.76299 12.78 8.46999L9.53 5.21999C9.237 4.92699 8.762 4.92699 8.469 5.21999C8.176 5.51299 8.176 5.98803 8.469 6.28103L10.439 8.251H1.75C1.336 8.251 1 8.587 1 9.001C1 9.415 1.336 9.751 1.75 9.751H10.439L8.469 11.721L8.47 11.72Z" />
      </g>
    </svg>
  );

  return (
    <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 min-h-[60vh] md:min-h-[70vh] px-4 md:px-8 flex items-center justify-center">
      {/* Blurry light leak */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -bottom-32 -right-32
          h-[420px] w-[420px]
          rounded-full
          bg-sky-400/10
          blur-[140px]
          dark:bg-sky-400/10
        "
      />

      {/* Grain */}
      <div aria-hidden className="grain-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-8 text-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl md:text-5xl font-spacegrotesk text-zinc-900 dark:text-zinc-200 leading-tight">
            Turn YouTube Playlists <br />
            Into{" "}
            <span className="text-sky-600 dark:text-sky-400">
              Distraction-Free
            </span>{" "}
            Courses
          </h1>

          <p className="text-xs font-spacegrotesk leading-relaxed max-w-xs md:max-w-sm text-zinc-600 dark:text-zinc-500">
            Learn from YouTube playlists without recommendations, comments, or
            distractions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
          <Button
            variant="default"
            className="
    h-7 px-3
    font-spacegrotesk text-sm leading-none
    corner-squircel
    bg-sky-500 hover:bg-sky-600
    text-white
    inline-flex items-center gap-2
    w-full sm:w-auto

    [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
    active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
    active:translate-y-[1px]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-sky-400/60
    focus-visible:ring-offset-2
    focus-visible:ring-offset-zinc-100
    dark:focus-visible:ring-offset-zinc-950

    transition-all duration-200
  "
          >
            <span>Get started</span>
            <ArrowCircleIcon className="size-4" />
          </Button>

          <button
            className="
    font-spacegrotesk text-sm font-medium
    flex items-center justify-center gap-2
    px-3 py-1 corner-squircel rounded
    cursor-pointer
    w-full sm:w-auto

    border border-zinc-200 dark:border-zinc-700
    bg-white/70 dark:bg-zinc-900/60
    backdrop-blur-sm

    text-zinc-800 dark:text-zinc-200

    shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
    hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)]
    hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70

    active:translate-y-[1px]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
    hover:text-zinc-900 dark:hover:text-zinc-100

    transition-all duration-200
  "
          >
            <span>Start Open Source</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.02c0 4.427 2.865 8.188 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.344-3.369-1.344-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.02 10.02 0 0022 12.02C22 6.484 17.523 2 12 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
