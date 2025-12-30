import React from "react";
import { motion } from "motion/react";

const LearnSVG = () => {
  const transition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl overflow-hidden p-4">
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-w-[500px] text-zinc-800 dark:text-zinc-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="screen-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
          </linearGradient>
          <clipPath id="screen-clip">
            <rect x="20" y="30" width="180" height="110" rx="12" />
          </clipPath>
        </defs>

        {/* --- LEFT SIDE: VIDEO PLAYER --- */}
        <g>
          {/* Player Frame */}
          <motion.rect
            x="20"
            y="30"
            width="180"
            height="110"
            rx="12"
            className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="2"
          />

          {/* Screen Background (Glows when playing) */}
          <motion.rect
            x="20"
            y="30"
            width="180"
            height="110"
            rx="12"
            fill="url(#screen-gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              ...transition,
              times: [0, 0.1, 0.9, 1], // Glows only during "play" time
            }}
          />

          {/* PLAY BUTTON (Morphs out) */}
          <motion.g
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 4,
              times: [0, 0.15], // Disappears quickly after "click"
              repeat: Infinity,
            }}
            style={{ originX: "110px", originY: "85px" }} // Center of player
          >
            <circle
              cx="110"
              cy="85"
              r="20"
              className="fill-zinc-100 dark:fill-zinc-800"
            />
            <polygon
              points="105,75 105,95 120,85"
              className="fill-zinc-400 dark:fill-zinc-500"
            />
          </motion.g>

          {/* ACTIVE CONTENT: WAVEFORMS (Appears when playing) */}
          <g clipPath="url(#screen-clip)" transform="translate(110, 85)">
            {[-20, -10, 0, 10, 20].map((offset, i) => (
              <motion.rect
                key={i}
                x={offset - 2}
                y="-10"
                width="4"
                height="20"
                rx="2"
                className="fill-sky-500"
                initial={{ height: 4, opacity: 0 }}
                animate={{
                  height: [4, 15 + Math.random() * 20, 4], // Random movement
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  times: [0.15, 0.3, 0.8, 0.9], // Sync with video play time
                  repeat: Infinity,
                }}
              />
            ))}
          </g>

          {/* PROGRESS BAR */}
          <g transform="translate(40, 125)">
            {/* Background Track */}
            <rect
              width="140"
              height="4"
              rx="2"
              className="fill-zinc-100 dark:fill-zinc-800"
            />

            {/* Moving Fill */}
            <motion.rect
              width="140"
              height="4"
              rx="2"
              className="fill-sky-500"
              initial={{ width: 0 }}
              animate={{ width: [0, 0, 140, 140] }} // Wait, start, finish, hold
              transition={{
                duration: 4,
                times: [0, 0.15, 0.85, 1],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        </g>

        {/* --- RIGHT SIDE: COURSE SYLLABUS --- */}
        <g transform="translate(220, 30)">
          {/* Header */}
          <rect
            width="80"
            height="8"
            rx="4"
            className="fill-zinc-200 dark:fill-zinc-700"
          />

          {/* Lesson Items */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0, ${25 + i * 25})`}>
              {/* Avatar/Icon Circle */}
              <motion.circle
                cx="10"
                cy="4"
                r="10"
                strokeWidth="2"
                className="fill-none"
                animate={{
                  // Logic:
                  // Item 0: Starts active, turns done.
                  // Item 1: Starts waiting, turns active.
                  stroke:
                    i === 0
                      ? ["#0EA5E9", "#0EA5E9", "#22c55e", "#22c55e"] // Sky -> Green
                      : i === 1
                      ? ["#E4E4E7", "#E4E4E7", "#E4E4E7", "#0EA5E9"] // Zinc -> Sky
                      : ["#E4E4E7", "#E4E4E7", "#E4E4E7", "#E4E4E7"], // Always Zinc
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                }}
              />

              {/* Checkmark for Item 0 (Appears at end) */}
              {i === 0 && (
                <motion.path
                  d="M6 4 L9 7 L14 2"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1] }}
                  transition={{
                    duration: 4,
                    times: [0, 0.85, 0.95, 1],
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Lesson Title Lines */}
              <rect
                x="25"
                y="0"
                width="50"
                height="8"
                rx="4"
                className="fill-zinc-100 dark:fill-zinc-800"
              />
            </g>
          ))}
        </g>

        {/* --- CURSOR INTERACTION --- */}
        <motion.g
          initial={{ x: 250, y: 150, opacity: 0 }}
          animate={{
            x: [250, 110, 110, 250], // Move to play button, then away
            y: [150, 90, 90, 150],
            opacity: [0, 1, 1, 0],
            scale: [1, 1, 0.9, 1], // Click effect
          }}
          transition={{
            duration: 4,
            times: [0, 0.1, 0.15, 0.3], // Happens very early in loop
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M0 0l6 18l4.5-5.5l6.5 6.5l3.5-3.5l-6.5-6.5l6-2L0 0z"
            className="fill-zinc-900 dark:fill-white stroke-white dark:stroke-zinc-900"
            strokeWidth="1"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default LearnSVG;
