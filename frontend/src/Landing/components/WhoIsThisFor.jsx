import React from "react";
import Badge from "./Badge";

const forYou = [
  {
    title: "You Learn From Playlists",
    description:
      "You already use YouTube playlists to learn skills, concepts, or technologies.",
  },
  {
    title: "You Lose Focus Easily",
    description:
      "Recommendations, comments, and unrelated videos pull you off track.",
  },
  {
    title: "You Prefer Clear Structure",
    description:
      "You want a defined learning path instead of jumping between random videos.",
  },
];

const notForYou = [
  {
    title: "You Watch Mostly for Entertainment",
    description:
      "If YouTube is mainly for shorts, memes, or casual watching, this won’t help.",
  },
  {
    title: "You Like Algorithmic Feeds",
    description:
      "If you enjoy endless recommendations deciding what’s next, Simplay will feel limiting.",
  },
  {
    title: "You Don’t Care About Completion",
    description:
      "If finishing courses or tracking progress isn’t important to you, this adds friction.",
  },
];

const WhoIsThisFor = () => {
  return (
    <div>
      {/* Section label */}
      <div className=" dark:bg-zinc-950 border border-dashed border-t-0 border-b-0 py-4 px-6 flex justify-center items-center">
        <Badge label="Who is this for?" />
      </div>

      {/* Content */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full">
          {/* FOR YOU */}
          <div className="border border-dashed border-b-0 px-6 py-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-6">
              This is for you if
            </h3>

            <div className="flex flex-col gap-6">
              {forYou.map((item, index) => (
                <div key={index}>
                  <h4 className="text-sm font-mono text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h4>
                  <div className="h-px w-6 bg-zinc-300/40 dark:bg-zinc-700/40 my-2" />
                  <p className="text-xs font-spacegrotesk text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NOT FOR YOU */}
          {/* Changed border-l-0 to border-l md:border-l-0 so it has a left border on mobile when stacked */}
          <div className="border border-dashed border-b-0 border-l md:border-l-0 px-6 py-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-6">
              This is not for you if
            </h3>

            <div className="flex flex-col gap-6">
              {notForYou.map((item, index) => (
                <div key={index}>
                  <h4 className="text-sm font-mono text-zinc-800 dark:text-zinc-400">
                    {item.title}
                  </h4>
                  <div className="h-px w-6 bg-zinc-300/40 dark:bg-zinc-700/40 my-2" />
                  <p className="text-xs font-spacegrotesk text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsThisFor;
