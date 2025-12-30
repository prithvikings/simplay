import React from "react";
import { motion } from "motion/react";

const PastePlaylistSVG = () => {
  // Master transition settings
  const loopDuration = 6;
  const transition = {
    duration: loopDuration,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[500px] text-zinc-800 dark:text-zinc-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="card-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>

          {/* UPDATED: Increased height to 80 and radius to 40 */}
          <clipPath id="input-clip">
            <rect x="50" y="100" width="300" height="80" rx="40" />
          </clipPath>
        </defs>

        {/* --- BACKGROUND DECORATION --- */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r={1 + i}
            className="fill-zinc-300 dark:fill-zinc-700"
            initial={{ x: 50 + i * 60, y: 50 + i * 40, opacity: 0 }}
            animate={{
              y: [50 + i * 40, 40 + i * 40, 50 + i * 40],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* --- VIDEO CARDS (EXTRACTED ITEMS) --- */}
        <g transform="translate(50, 100)">
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={10 + i * 95}
              y="0"
              width="80"
              height="60"
              rx="8"
              fill="url(#card-gradient)"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, 0, 90, 90, 0], // Increased slide distance due to taller box
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                ...transition,
                times: [0, 0.5, 0.6 + i * 0.05, 0.9, 1],
              }}
            />
          ))}
        </g>

        {/* --- MAIN INPUT CONTAINER --- */}
        <g>
          {/* UPDATED: Box is now taller (height="80") and rounder (rx="40") */}
          <motion.rect
            x="50"
            y="100"
            width="300"
            height="80"
            rx="40"
            className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="2"
            animate={{
              stroke: ["#E4E4E7", "#0EA5E9", "#E4E4E7"],
              strokeWidth: [2, 3, 2],
            }}
            transition={{
              ...transition,
              times: [0, 0.3, 0.8],
            }}
          />

          {/* Scanner Line - Moved Y down to match new height */}
          <motion.rect
            x="50"
            y="176"
            width="0"
            height="4"
            className="fill-sky-500"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: [0, 0, 300, 300, 0],
              opacity: [0, 1, 1, 0, 0],
            }}
            transition={{
              ...transition,
              times: [0, 0.3, 0.5, 0.8, 1],
            }}
            clipPath="url(#input-clip)"
          />
        </g>

        {/* --- TEXT & CURSOR --- */}
        <g clipPath="url(#input-clip)">
          {/* UPDATED: Text moved down (y="145") and size increased slightly */}
          <motion.text
            x="70"
            y="145"
            className="fill-zinc-600 dark:fill-zinc-400 text-base font-mono font-medium"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              x: [70, 70, 70, 60, 70],
            }}
            transition={{
              ...transition,
              times: [0, 0.2, 0.25, 0.8, 1],
            }}
          >
            https://youtube.com/playlist...
          </motion.text>

          {/* UPDATED: Cursor moved down (y="130") to center vertically */}
          <motion.rect
            x="65"
            y="130"
            width="2"
            height="20"
            className="fill-sky-500"
            animate={{
              opacity: [1, 0, 1, 0, 1],
              x: [65, 65, 270, 270, 65],
            }}
            transition={{
              ...transition,
              times: [0, 0.2, 0.25, 0.9, 1],
            }}
          />
        </g>

        {/* --- ICONS & BADGES --- */}
        {/* UPDATED: Moved icon group down to center (translate Y to 128) */}
        <g transform="translate(310, 128)">
          <motion.path
            d="M9 2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 0V0h6v2"
            className="stroke-zinc-400 fill-none"
            strokeWidth="2"
            animate={{ scale: [1, 0, 0, 0, 1], opacity: [1, 0, 0, 0, 1] }}
            transition={transition}
          />
          <motion.path
            d="M12 2a10 10 0 0 1 10 10"
            className="stroke-sky-500 fill-none"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 0, 0],
              rotate: [0, 0, 360, 360, 0],
            }}
            transition={{
              ...transition,
              times: [0, 0.3, 0.5, 0.6, 1],
            }}
            style={{ originX: "12px", originY: "12px" }}
          />
          <motion.path
            d="M5 12l5 5l10 -10"
            className="stroke-green-500 fill-none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0, 0, 1, 1, 0],
              opacity: [0, 0, 0, 1, 1, 0],
            }}
            transition={{
              ...transition,
              times: [0, 0.5, 0.55, 0.6, 0.9, 1],
            }}
          />
        </g>

        {/* --- FLOATING MOUSE CURSOR --- */}
        <motion.g
          initial={{ x: 300, y: 250, opacity: 0 }}
          animate={{
            x: [300, 200, 200, 300],
            y: [250, 140, 140, 250], // Adjusted click target Y position
            opacity: [0, 1, 1, 0],
            scale: [1, 1, 0.9, 1],
          }}
          transition={{
            ...transition,
            times: [0, 0.15, 0.25, 0.4],
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

export default PastePlaylistSVG;
