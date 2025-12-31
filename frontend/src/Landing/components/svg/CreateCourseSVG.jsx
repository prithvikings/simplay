import React from "react";
import { motion } from "motion/react";

const CreateCourseSVG = () => {
  // Master loop settings
  const transition = {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
      <svg
        viewBox="0 0 300 200"
        className="w-full h-full text-zinc-800 dark:text-zinc-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="sky-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>

        {/* --- 1. Main Card Frame --- */}
        {/* Enters at 0%, Exits at 90% */}
        <motion.rect
          x="50"
          y="30"
          width="200"
          height="140"
          rx="16"
          className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1, 1, 0.95],
            y: [10, 0, 0, 5],
          }}
          transition={{
            ...transition,
            times: [0, 0.1, 0.9, 1],
          }}
        />

        {/* --- 2. Card Title Skeleton --- */}
        <motion.rect
          x="75"
          y="55"
          width="100"
          height="10"
          rx="5"
          className="fill-zinc-200 dark:fill-zinc-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            ...transition,
            times: [0.1, 0.2, 0.85, 1],
          }}
        />

        {/* --- 3. Empty Slots (The Background Lines) --- */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={`slot-${i}`}
            x="75"
            y={85 + i * 22}
            width="150"
            height="12"
            rx="4"
            className="fill-zinc-100 dark:fill-zinc-800/50"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              ...transition,
              times: [0.15 + i * 0.05, 0.25 + i * 0.05, 0.85, 1],
            }}
          />
        ))}

        {/* --- 4. Flying Content Blocks --- */}
        {/* Block 1: Blue Gradient Block */}
        <motion.rect
          width="30"
          height="12"
          rx="4"
          fill="url(#sky-gradient)"
          initial={{ x: 20, y: 60, opacity: 0 }}
          animate={{
            x: [20, 75, 75, 20],
            y: [60, 85, 85, 60],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            ...transition,
            times: [0.25, 0.35, 0.85, 1], // Flies in early
          }}
        />

        {/* Block 2: Long Grey Block */}
        <motion.rect
          width="80"
          height="12"
          rx="4"
          className="fill-zinc-300 dark:fill-zinc-600"
          initial={{ x: 260, y: 90, opacity: 0 }}
          animate={{
            x: [260, 115, 115, 260], // Target x: 115
            y: [90, 107, 107, 90], // Target y: 85 + 22 = 107
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            ...transition,
            times: [0.3, 0.4, 0.85, 1], // Flies in second
          }}
        />

        {/* Block 3: Short Grey Block */}
        <motion.rect
          width="60"
          height="12"
          rx="4"
          className="fill-zinc-300 dark:fill-zinc-600"
          initial={{ x: 180, y: 180, opacity: 0 }}
          animate={{
            x: [180, 75, 75, 180], // Target x: 75
            y: [180, 129, 129, 180], // Target y: 85 + 44 = 129
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            ...transition,
            times: [0.35, 0.45, 0.85, 1], // Flies in last
          }}
        />

        {/* --- 5. Success Checkmark --- */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.1, 1, 1, 0], // Scale 1.1 adds a small "pop" effect
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            ...transition,
            times: [0.6, 0.65, 0.7, 0.9, 1], // Appears late in the sequence
          }}
        >
          <circle cx="230" cy="50" r="18" fill="url(#sky-gradient)" />
          <path
            d="M220 50 L227 57 L240 42"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default CreateCourseSVG;
