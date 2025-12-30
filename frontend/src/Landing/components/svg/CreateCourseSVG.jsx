import React from "react";
import { motion } from "motion/react";

const CreateCourseSVG = () => {
  // Transition constants for consistent "feel"
  const springEase = { type: "spring", stiffness: 150, damping: 15 };
  const smoothEase = { ease: "easeInOut", duration: 0.6 };

  // Delays to choreograph the sequence
  const containerDelay = 0.2;
  const structureDelay = 0.6;
  const contentFlyInDelay = 1.4;
  const progressDelay = 2.4;
  const successDelay = 3.2;

  const variances = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 300 200"
        className="w-full h-full max-w-[500px] text-zinc-800 dark:text-zinc-200 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Modern gradient for the active elements */}
          <linearGradient id="sky-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0EA5E9" /> {/* Sky 500 */}
            <stop offset="100%" stopColor="#38BDF8" /> {/* Sky 400 */}
          </linearGradient>

          {/* Subtle glow filter for the final state */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- PHASE 1: THE STRUCTURE --- */}

        {/* Main Card Container */}
        <motion.rect
          x="50"
          y="30"
          width="200"
          height="140"
          rx="16"
          className="fill-zinc-50 dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth="2"
          initial="hidden"
          animate="visible"
          variants={variances}
          transition={{ ...springEase, delay: containerDelay }}
        />

        {/* Card Title Placeholder */}
        <motion.rect
          x="75"
          y="55"
          width="100"
          height="10"
          rx="5"
          className="fill-zinc-200 dark:fill-zinc-700"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ ...smoothEase, delay: structureDelay, originX: 0 }}
        />

        {/* Empty Module Slots (The "skeleton") */}
        <g>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={`slot-${i}`}
              x="75"
              y={85 + i * 22}
              width="150"
              height="12"
              rx="4"
              className="fill-zinc-100 dark:fill-zinc-800"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: structureDelay + 0.3 + i * 0.1,
                duration: 0.4,
              }}
            />
          ))}
        </g>

        {/* --- PHASE 2: INJECTING CONTENT --- */}
        {/* These elements float in from outside the card into the slots */}
        <g>
          {/* Content Block 1 (Video icon representation) */}
          <motion.g
            initial={{ x: 20, y: 60, opacity: 0, scale: 0.5 }}
            animate={{ x: 75, y: 85, opacity: 1, scale: 1 }}
            transition={{ ...springEase, delay: contentFlyInDelay }}
          >
            <rect width="30" height="12" rx="4" fill="url(#sky-gradient)" />
            {/* Tiny Play icon triangle */}
            <path d="M12 3L18 6L12 9V3Z" fill="white" opacity="0.9" />
          </motion.g>

          {/* Content Block 2 (Text representation) */}
          <motion.rect
            x="0"
            y="0"
            width="80"
            height="12"
            rx="4"
            className="fill-zinc-300 dark:fill-zinc-600"
            initial={{ x: 240, y: 90, opacity: 0, scale: 0.8 }}
            // Animate to final slot position
            animate={{ x: 115, y: 85 + 22, opacity: 1, scale: 1 }}
            transition={{ ...springEase, delay: contentFlyInDelay + 0.15 }}
          />

          {/* Content Block 3 (Quiz/Mixed representation) */}
          <motion.rect
            x="0"
            y="0"
            width="60"
            height="12"
            rx="4"
            className="fill-zinc-300 dark:fill-zinc-600"
            initial={{ x: 180, y: 160, opacity: 0, scale: 0.8 }}
            // Animate to final slot position
            animate={{ x: 75, y: 85 + 44, opacity: 1, scale: 1 }}
            transition={{ ...springEase, delay: contentFlyInDelay + 0.3 }}
          />
        </g>

        {/* --- PHASE 3: PROCESSING (PROGRESS BAR) --- */}
        <g transform="translate(75, 155)">
          {/* Progress Track */}
          <motion.rect
            width="150"
            height="6"
            rx="3"
            className="fill-zinc-100 dark:fill-zinc-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: progressDelay - 0.5 }}
          />
          {/* Active Progress Fill */}
          <motion.rect
            width="150"
            height="6"
            rx="3"
            fill="url(#sky-gradient)"
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            transition={{
              delay: progressDelay,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </g>

        {/* --- PHASE 4: COMPLETION (CHECKMARK & GLOW) --- */}

        {/* Subtle success glow behind the checkmark area */}
        <motion.circle
          cx="230"
          cy="50"
          r="20"
          className="fill-sky-500/20"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 1, 0] }} // Pulse effect
          transition={{ delay: successDelay, duration: 1 }}
        />

        {/* The bouncy checkmark container */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: successDelay,
          }}
        >
          {/* Checkmark background circle */}
          <circle cx="230" cy="50" r="18" fill="url(#sky-gradient)" />

          {/* Drawing the check path */}
          <motion.path
            d="M220 50 L227 57 L240 42"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: successDelay + 0.2, duration: 0.4 }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default CreateCourseSVG;
