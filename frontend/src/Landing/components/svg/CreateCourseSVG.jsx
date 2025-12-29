import React from "react";

const CreateCourseSVG = () => {
  return (
    <svg
      viewBox="0 0 260 160"
      className="h-full w-full text-zinc-800 dark:text-zinc-200"
      fill="none"
    >
      {/* Card */}
      <rect
        x="40"
        y="30"
        width="180"
        height="100"
        rx="10"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Title */}
      <rect
        x="60"
        y="48"
        width="90"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.6"
      >
        <animate
          attributeName="width"
          from="0"
          to="90"
          dur="0.6s"
          fill="freeze"
        />
      </rect>

      {/* Module lines */}
      {[
        { y: 68, delay: "0.3s" },
        { y: 82, delay: "0.45s" },
        { y: 96, delay: "0.6s" },
      ].map((line, i) => (
        <rect
          key={i}
          x="60"
          y={line.y}
          width="0"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.35"
        >
          <animate
            attributeName="width"
            from="0"
            to="120"
            dur="0.4s"
            begin={line.delay}
            fill="freeze"
          />
        </rect>
      ))}

      {/* Progress bar */}
      <rect
        x="60"
        y="112"
        width="120"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="60"
        y="112"
        width="0"
        height="4"
        rx="2"
        fill="currentColor"
        className="text-sky-500"
      >
        <animate
          attributeName="width"
          from="0"
          to="120"
          dur="0.6s"
          begin="0.9s"
          fill="freeze"
        />
      </rect>

      {/* Subtle check */}
      <path
        d="M175 60 l6 6 l10 -12"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        className="text-sky-500"
        strokeDasharray="30"
        strokeDashoffset="30"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="30"
          to="0"
          dur="0.4s"
          begin="1.4s"
          fill="freeze"
        />
      </path>
    </svg>
  );
};

export default CreateCourseSVG;
