import React from "react";

const PastePlaylistSVG = () => {
  return (
    <svg
      viewBox="0 0 260 160"
      className="h-full w-full text-zinc-800 dark:text-zinc-200"
      fill="none"
    >
      {/* Input box */}
      <rect
        x="20"
        y="50"
        width="220"
        height="40"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* URL text */}
      <text x="32" y="75" className="fill-current text-xs font-mono opacity-70">
        youtube.com/playlist…
      </text>

      {/* Caret */}
      <rect x="185" y="62" width="2" height="16" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Playlist icon */}
      <g
        transform="translate(200 58)"
        className="text-sky-500"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="0" y1="0" x2="18" y2="0" />
        <line x1="0" y1="6" x2="18" y2="6" />
        <line x1="0" y1="12" x2="12" y2="12" />
      </g>
    </svg>
  );
};

export default PastePlaylistSVG;
