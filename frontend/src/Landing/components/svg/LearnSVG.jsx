import React from "react";

const LearnSVG = () => {
  return (
    <svg
      viewBox="0 0 260 160"
      className="h-full w-full text-zinc-800 dark:text-zinc-200"
      fill="none"
    >
      {/* Player */}
      <rect
        x="30"
        y="30"
        width="200"
        height="100"
        rx="10"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Play triangle */}
      <polygon
        points="115,60 115,100 145,80"
        className="fill-current opacity-70"
      />

      {/* Progress bar */}
      <rect
        x="50"
        y="120"
        width="160"
        height="4"
        rx="2"
        className="fill-current opacity-20"
      />
      <rect
        x="50"
        y="120"
        width="0"
        height="4"
        rx="2"
        className="fill-current text-sky-500"
      >
        <animate
          attributeName="width"
          from="0"
          to="160"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export default LearnSVG;
