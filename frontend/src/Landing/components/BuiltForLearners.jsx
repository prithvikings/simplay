import React from "react";
import Badge from "./Badge";

const principles = [
  {
    title: "No Algorithm Control",
    description:
      "Nothing is pushed. Nothing is recommended. You decide what to learn and in what order.",
  },
  {
    title: "No Engagement Traps",
    description:
      "No infinite scroll, no autoplay, no tricks designed to keep you watching longer than needed.",
  },
  {
    title: "Built to Finish",
    description:
      "Progress tracking and structure help you complete playlists instead of abandoning them.",
  },
];

const BuiltForLearners = () => {
  return (
    <div>
      {/* Section label */}
      <div className=" dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 py-4 px-6 flex justify-center items-center">
        <Badge label="Built for learners" />
      </div>

      {/* Statement */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed border-b-0 px-6 py-8 md:px-12 md:py-10">
        <h2 className="text-xl md:text-3xl font-poppins text-zinc-900 dark:text-zinc-200 max-w-4xl leading-tight">
          YouTube optimizes for watch time.
          <br />
          Simplay optimizes for understanding and completion.
        </h2>
      </div>

      {/* Cards */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed min-h-[21vh] flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl w-full">
          {principles.map((item, index) => (
            <div
              key={index}
              className="border border-dashed border-b-0 px-4 py-4 pb-1"
            >
              <h3 className="text-md font-mono text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-2 text-xs font-spacegrotesk leading-snug text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuiltForLearners;
