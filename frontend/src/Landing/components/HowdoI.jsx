import React from "react";
import PastePlaylistSVG from "./svg/PastePlaylistSVG";
import CreateCourseSVG from "./svg/CreateCourseSVG";
import LearnSVG from "./svg/LearnSVG";
import Badge from "./Badge";

const steps = [
  {
    title: "Paste a YouTube Playlist",
    badge: "Step 1",
    description:
      "Copy any public YouTube playlist link and paste it into Simplay. We validate the playlist and fetch all videos in the correct order automatically.",
    reverse: false,
    Visual: PastePlaylistSVG,
  },
  {
    title: "Create Your Course",
    badge: "Step 2",
    description:
      "Give your course a name and save it privately to your account. The playlist is instantly converted into a structured course layout.",
    reverse: true,
    Visual: CreateCourseSVG,
  },
  {
    title: "Learn Without Distractions",
    badge: "Step 3",
    description:
      "Watch videos in a clean interface with no recommendations or comments. Track progress, mark videos complete, and resume anytime.",
    reverse: false,
    Visual: LearnSVG,
  },
];

const HowdoI = () => {
  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Section label */}
      <div className="dark:bg-zinc-950 border border-dashed border-b-0 py-4 px-6 flex justify-center items-center">
        <Badge label="How do I get started?" />
      </div>

      {steps.map((step, index) => {
        const Visual = step.Visual;

        return (
          <div
            key={index}
            className={`
              bg-zinc-100 dark:bg-zinc-950 border border-dashed border-b-0 flex 
              
              /* RESPONSIVE LAYOUT FIX: */
              /* Mobile: Always stack vertically (Visual on top, Text on bottom) */
              flex-col
              
              /* Desktop: Alternating Row/Row-Reverse based on prop */
              ${step.reverse ? "md:flex-row-reverse" : "md:flex-row"} 
            `}
          >
            {/* --- THE VISUAL CARD SECTION --- */}
            <div
              className={`
                p-6 md:p-8 flex justify-center items-center
                border-dashed border-zinc-200 dark:border-zinc-800
                
                /* BORDER LOGIC FIX: */
                /* Mobile: Always border-bottom (to separate Visual from Text below) */
                border-b md:border-b-0
                
                /* Desktop: Switch border side based on layout */
                ${step.reverse ? "md:border-l" : "md:border-r"}
              `}
            >
              <div className="w-full max-w-[320px] md:w-[280px] aspect-[4/3] shadow-sm rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <Visual />
              </div>
            </div>

            {/* --- THE TEXT SECTION --- */}
            <div className="p-6 md:p-12 flex flex-col justify-center gap-3 w-full">
              <div className="flex gap-3 items-center">
                <h2 className="text-xl md:text-2xl font-poppins font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h2>
                <div
                  className="text-xs font-mono px-2 py-1 rounded-md
                  bg-zinc-200 text-zinc-700
                  dark:bg-zinc-800 dark:text-zinc-300
                "
                >
                  {step.badge}
                </div>
              </div>
              <p
                className="text-sm md:text-base font-sans leading-relaxed
                text-zinc-600 dark:text-zinc-400
              "
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Bottom border */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed h-px w-full" />
    </div>
  );
};

export default HowdoI;
