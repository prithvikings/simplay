import React from "react";
import Badge from "./Badge";

const trustData = [
  {
    title: "Google Sign-In",
    description:
      "Secure authentication via Google OAuth. No passwords to remember or manage.",
  },
  {
    title: "Private by Default",
    description:
      "Imported playlists are saved as private courses under your account.",
  },
  {
    title: "No Ads or Tracking",
    description:
      "Simplay doesn’t track behavior, sell data, or inject ads into your learning.",
  },
];

const Trust = () => {
  return (
    <div>
      {/* Section label */}
      <div className=" dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 py-4 px-6 flex justify-center items-center">
        <Badge label="Trust & privacy" />
      </div>

      {/* Cards */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed min-h-[21vh] flex justify-center">
        {/* Changed to grid-cols-1 for mobile, md:grid-cols-3 for tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl w-full">
          {trustData.map((item, index) => (
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
    </div>
  );
};

export default Trust;
