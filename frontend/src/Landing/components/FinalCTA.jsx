import React from "react";
import { Button } from "../../components/ui/button";

const FinalCTA = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 border border-dashed mb-4 relative overflow-hidden">
      {/* Adjusted padding for mobile vs desktop */}
      <div className="px-6 py-10 md:px-12 md:py-16 flex flex-col items-center text-center gap-6 relative">
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -bottom-32 -left-32
            h-[420px] w-[420px]
            rounded-full
            bg-sky-400/10
            blur-[140px]
            dark:bg-sky-400/10
          "
        />

        {/* Grain */}
        <div aria-hidden className="grain-overlay" />

        {/* Responsive Heading Size and Break */}
        <h2 className="text-xl md:text-3xl font-poppins text-zinc-900 dark:text-zinc-200 max-w-3xl leading-tight">
          Turn YouTube playlists into focused,
          <br className="hidden md:inline" />
          distraction-free courses.
        </h2>

        <p className="text-xs md:text-sm font-spacegrotesk text-zinc-500 dark:text-zinc-400 max-w-xl">
          Import a playlist, remove the noise, and learn at your own pace.
        </p>

        <Button
          variant="default"
          className="
            h-9 px-6
            font-spacegrotesk text-sm
            corner-squircel
            bg-sky-500 hover:bg-sky-600
            text-white
            w-full sm:w-auto

            [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
            hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
            active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
            active:translate-y-[1px]
            
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-sky-400/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-zinc-100
            dark:focus-visible:ring-offset-zinc-950
            
            transition-all duration-200
          "
        >
          Create Your First Course
        </Button>
      </div>
    </div>
  );
};

export default FinalCTA;
