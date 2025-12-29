import React from "react";

const Badge = ({ label }) => {
  return (
    <div className="flex items-center gap-2 px-6 w-full justify-center">
      {/* Left rail */}
      <div className="flex items-center">
        <div className="h-px w-20 sm:w-40 bg-gradient-to-l from-zinc-300 dark:from-zinc-700 to-transparent" />
        <div className="h-1.5 w-1.5 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600" />
      </div>

      {/* Badge */}
      <div
        className="relative flex h-7 items-center whitespace-nowrap gap-2 rounded-md border px-4 text-sm font-spacegrotesk
        bg-zinc-200/60 text-zinc-800
        dark:bg-zinc-800/60 dark:text-zinc-200
        border-zinc-300 dark:border-zinc-700
        backdrop-blur-sm
      "
      >
        <span>{label}</span>
      </div>

      {/* Right rail */}
      <div className="flex items-center">
        <div className="h-1.5 w-1.5 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600" />
        <div className="h-px w-20 sm:w-40 bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent" />
      </div>
    </div>
  );
};

export default Badge;

// "bg-zinc-900 text-white dark:bg-zinc-800 dark:border-zinc-700 border border-zinc-300 text-sm font-spacegrotesk px-3 py-1 rounded-md"
