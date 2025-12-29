import React from "react";
import Badge from "./Badge";
const comparisons = [
  { youtube: "Endless recommendations", simplay: "Zero distractions" },
  { youtube: "Comments and noise", simplay: "Clean learning interface" },
  {
    youtube: "No progress tracking",
    simplay: "Resume exactly where you left off",
  },
  {
    youtube: "Algorithm decides what’s next",
    simplay: "You control the learning order",
  },
  { youtube: "Built for engagement", simplay: "Built for completion" },
];

const WhyNotYouTube = () => {
  return (
    <div>
      {/* Section label */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 py-4 px-6 flex justify-center items-center">
        <Badge label="Why not just use YouTube?" />
      </div>

      {/* Headline */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed border-b-0 px-12 py-10">
        <h2 className="text-3xl font-poppins text-zinc-900 dark:text-zinc-200 max-w-3xl leading-tight">
          YouTube is built to keep you watching.
          <br />
          Simplay is built to help you finish.
        </h2>
      </div>

      {/* Comparison table */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed">
        {comparisons.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto_1fr] border-b border-dashed last:border-b-0"
          >
            {/* YouTube */}
            <div className="p-6 text-sm font-inter text-zinc-600 dark:text-zinc-400">
              {row.youtube}
            </div>

            {/* Center divider */}
            <div className="w-px bg-zinc-400/40 dark:bg-zinc-700/60" />

            {/* Simplay */}
            <div className="p-6 text-sm font-inter text-zinc-900 dark:text-zinc-200">
              {row.simplay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyNotYouTube;
