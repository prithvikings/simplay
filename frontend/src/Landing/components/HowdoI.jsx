import React from "react";
import PastePlaylistSVG from "./svg/PastePlaylistSVG";
import CreateCourseSVG from "./svg/CreateCourseSVG";
import LearnSVG from "./svg/LearnSVG";
import Badge from "./Badge"
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
    <div>
      {/* Section label */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-dashed border-b-0 py-4 px-6 flex justify-center items-center">
       <Badge label="How do I get started?" />
      </div>

      {steps.map((step, index) => {
        const Visual = step.Visual;

        return (
          <div
            key={index}
            className="bg-zinc-50 dark:bg-zinc-950 border border-dashed border-b-0 flex"
          >
            {!step.reverse && (
              <div className="border border-dashed border-b-0 border-l-0 border-t-0 p-12 flex items-start">
                <div className="h-[64px] w-[120px] text-zinc-800 dark:text-zinc-200">
                  <Visual />
                </div>
              </div>
            )}

            <div className="p-12 py-8 pl-4 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <h2 className="text-xl font-poppins font-medium text-zinc-900 dark:text-zinc-200">
                  {step.title}
                </h2>
                <div
                  className="text-xs font-mono px-1.5 py-0.5 rounded-md
                  bg-zinc-200 text-zinc-700
                  dark:bg-zinc-900 dark:text-zinc-400
                "
                >
                  {step.badge}
                </div>
              </div>
              <p
                className="text-sm font-mono max-w-2xl tracking-tight leading-snug font-medium
                text-zinc-600 dark:text-zinc-400
              "
              >
                {step.description}
              </p>
            </div>

            {step.reverse && (
              <div className="border border-dashed border-b-0 border-r-0 border-t-0 p-12 flex items-start">
                <div className="h-[64px] w-[120px] text-zinc-800 dark:text-zinc-200">
                  <Visual />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom border */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed" />
    </div>
  );
};

export default HowdoI;
