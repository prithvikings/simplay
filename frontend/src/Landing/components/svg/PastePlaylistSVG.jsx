import React from "react";
import { motion } from "motion/react";

const PastePlaylistSVG = () => {
  // Master Loop Config
  const transition = {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
    times: [0, 1],
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full text-zinc-800 dark:text-zinc-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glassy Gradient for the fetched cards */}
          <linearGradient id="card-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
          </linearGradient>
          {/* Mask to hide cards before they drop */}
          <clipPath id="main-mask">
            {/* Extended height ensures cards don't get cut off during bounce */}
            <rect x="0" y="100" width="400" height="200" />
          </clipPath>
        </defs>

        {/* --- 1. THE DROPPING CARDS (With Physics Bounce & Tilt) --- */}
        <g clipPath="url(#main-mask)">
          {[0, 1, 2].map((i) => {
            // Base Y position for this card in the stack
            const baseTargetY = 175 + i * 35;

            return (
              <motion.g
                key={i}
                initial={{ y: 100, opacity: 0, rotate: -5 }}
                animate={{
                  // Logic: Start -> Deep Drop (Overshoot) -> Bounce Up -> Settle -> Hold -> Reset
                  y: [
                    100, // Start hidden
                    100, // Wait
                    baseTargetY + 25, // Big Drop (Overshoot by 25px)
                    baseTargetY - 10, // Bounce Up
                    baseTargetY, // Settle
                    baseTargetY, // Hold
                    100, // Reset
                  ],
                  opacity: [0, 0, 1, 1, 1, 1, 0],
                  // Logic: Start Rotated -> Straighten on impact
                  rotate: [-5, -5, 0, 0, 0, 0, -5],
                  scale: [0.9, 0.9, 1, 1, 1, 1, 0.9],
                }}
                transition={{
                  ...transition,
                  // Staggered drops: Card 0 drops, then Card 1, then Card 2
                  times: [
                    0,
                    0.45,
                    0.6 + i * 0.05,
                    0.7 + i * 0.05,
                    0.75 + i * 0.05,
                    0.9,
                    1,
                  ],
                }}
              >
                {/* Main Card Body - Increased RX for better rounding */}
                <rect
                  x="75"
                  y="0"
                  width="250"
                  height="28"
                  rx="8"
                  fill="url(#card-glass)"
                  className="stroke-zinc-300 dark:stroke-zinc-700"
                  strokeWidth="1"
                />
                {/* Thumbnail */}
                <rect
                  x="80"
                  y="4"
                  width="30"
                  height="20"
                  rx="4"
                  className="fill-zinc-300 dark:fill-zinc-600"
                />
                {/* Text Lines */}
                <rect
                  x="120"
                  y="8"
                  width="120"
                  height="4"
                  rx="2"
                  className="fill-zinc-400 dark:fill-zinc-500"
                />
                <rect
                  x="120"
                  y="16"
                  width="80"
                  height="4"
                  rx="2"
                  className="fill-zinc-300 dark:fill-zinc-600 opacity-50"
                />
              </motion.g>
            );
          })}
        </g>

        {/* --- 2. MAIN INPUT BAR --- */}
        <g transform="translate(50, 100)">
          {/* Input Background */}
          <rect
            width="300"
            height="60"
            rx="12"
            className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800 shadow-sm"
            strokeWidth="2"
          />

          {/* YouTube Icon */}
          <g transform="translate(20, 18)">
            <rect
              x="0"
              y="0"
              width="32"
              height="24"
              rx="6"
              className="fill-red-500"
            />
            <path d="M12 7L22 12L12 17V7Z" fill="white" />
          </g>

          {/* URL Text Animation */}
          <motion.text
            x="64"
            y="36"
            className="font-mono text-sm fill-zinc-400 dark:fill-zinc-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              clipPath: [
                "inset(0 100% 0 0)", // Hidden
                "inset(0 0% 0 0)", // Typed
                "inset(0 0% 0 0)", // Stay
                "inset(0 100% 0 0)", // Hide
              ],
            }}
            transition={{
              ...transition,
              times: [0.1, 0.25, 0.9, 1],
            }}
          >
            https://youtube.com/play
          </motion.text>

          {/* --- 3. STATUS ICONS --- */}
          <g transform="translate(260, 20)">
            {/* CHECKMARK (Success) - Pops in right before cards drop */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1.2, 1, 0] }} // 1.2 scale adds a "Pop"
              transition={{ ...transition, times: [0, 0.5, 0.55, 0.9, 1] }}
            >
              <circle cx="10" cy="10" r="10" className="fill-green-500" />
              <motion.path
                d="M6 10l3 3 5 -5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0] }}
                transition={{ ...transition, times: [0, 0.55, 0.6, 0.9, 1] }}
              />
            </motion.g>
          </g>
        </g>

        {/* --- 4. MOUSE CURSOR --- */}
        <motion.g
          initial={{ x: 300, y: 300, opacity: 0 }}
          animate={{
            x: [300, 200, 200, 300],
            y: [300, 140, 140, 300],
            opacity: [0, 1, 1, 0],
            scale: [1, 1, 0.9, 1],
          }}
          transition={{
            ...transition,
            times: [0, 0.1, 0.2, 0.3],
          }}
        >
          <path
            d="M0 0l6 18l4.5-5.5l6.5 6.5l3.5-3.5l-6.5-6.5l6-2L0 0z"
            className="fill-zinc-900 dark:fill-white stroke-white dark:stroke-zinc-900 shadow-lg"
            strokeWidth="1.5"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default PastePlaylistSVG;
