import React from "react";
import { motion } from "motion/react";

const LearnSVG = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ================= VIDEO SURFACE ================= */}
        <rect
          x="24"
          y="28"
          width="184"
          height="112"
          rx="10"
          className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800"
          strokeWidth="1"
        />

        {/* Content placeholder */}
        <rect
          x="40"
          y="50"
          width="120"
          height="8"
          rx="4"
          className="fill-zinc-200 dark:fill-zinc-800"
        />
        <rect
          x="40"
          y="66"
          width="90"
          height="8"
          rx="4"
          className="fill-zinc-200 dark:fill-zinc-800"
        />

        {/* ================= PROGRESS ================= */}
        <g transform="translate(40, 124)">
          <rect
            width="140"
            height="3"
            rx="1.5"
            className="fill-zinc-200 dark:fill-zinc-800"
          />
          <motion.rect
            height="3"
            rx="1.5"
            className="fill-sky-500"
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{
              duration: 4,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </g>

        {/* ================= SIDEBAR ================= */}
        <g transform="translate(228, 32)">
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: i === 1 ? 1 : 0.4,
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              transform={`translate(0 ${i * 28})`}
            >
              {/* Status dot */}
              <motion.circle
                cx="6"
                cy="6"
                r="4"
                className="fill-sky-600"
                animate={{
                  fill: i === 0 ? "#16a34a" : i === 1 ? "#18181b" : "#a1a1aa",
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              {/* Title */}
              <rect
                x="16"
                y="2"
                width="52"
                height="8"
                rx="4"
                className="fill-zinc-200 dark:fill-zinc-800"
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LearnSVG;
