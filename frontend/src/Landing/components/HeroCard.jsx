import React from "react";

const HeroCard = () => {
  const Data = [
    {
      title: "Distraction-Free Learning",
      description:
        "No recommendations, no comments, no autoplay. Just the content you came to learn.",
    },
    {
      title: "Turn Playlists Into Courses",
      description:
        "Import any public YouTube playlist and consume it like a structured online course.",
    },
    {
      title: "Private & Progress-Tracked",
      description:
        "Your courses are private by default, with progress saved so you can resume anytime.",
    },
  ];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 min-h-[21vh] flex justify-center">
      {/* Changed grid-cols-3 to grid-cols-1 md:grid-cols-3 
         grid-cols-1: Applies to mobile (stacks items vertically).
         md:grid-cols-3: Applies to Tablet/Desktop (restores original 3 columns).
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl w-full">
        {Data.map((item, index) => (
          <div
            key={index}
            className="border border-dashed border-b-0 px-4 py-4 pb-1"
          >
            <h2 className="text-md font-mono text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h2>
            <p className="mt-2 text-xs font-spacegrotesk leading-snug text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCard;
