import React, { useEffect, useState } from "react";
import { Flame, X, Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

const QUOTES = [
  "Consistency is the key to mastery.",
  "Small steps every day add up to big results.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The secret of your future is hidden in your daily routine.",
  "You don't have to be great to start, but you have to start to be great.",
  "Focus on the process, not the outcome.",
];

const StreakModal = ({ isOpen, onClose, streak }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

      // --- Confetti Configuration ---
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 25,
        spread: 360,
        ticks: 90,
        zIndex: 150,
        colors: ["#f97316", "#fdba74", "#fbbf24", "#e2e8f0"],
      };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.2), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.8, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-200/60 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="
          relative w-full max-w-[360px] sm:max-w-[400px]
          bg-zinc-50 dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          shadow-2xl shadow-zinc-200/50 dark:shadow-black/50
          rounded-3xl overflow-hidden
          animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 cubic-bezier(0.16, 1, 0.3, 1)
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8 flex flex-col">
          {/* Header Badge */}
          <div className="self-start mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 text-[11px] sm:text-xs font-spacegrotesk font-medium uppercase tracking-wider">
              <Flame size={12} className="fill-current" />
              <span>Streak Active</span>
            </div>
          </div>

          {/* Main Typography */}
          <div className="mb-8">
            <h2 className="flex items-baseline gap-2 font-spacegrotesk font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              <span className="text-5xl sm:text-6xl">{streak}</span>
              <span className="text-xl sm:text-2xl text-zinc-400 dark:text-zinc-500 font-medium">
                days
              </span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm leading-relaxed font-inter">
              You're building momentum. Keep the flame alive.
            </p>
          </div>

          {/* Quote Section */}
          <div className="relative w-full pl-4 py-1 mb-8 border-l-2 border-zinc-200 dark:border-zinc-800">
            <Sparkles
              size={14}
              className="absolute -top-2 -left-2 text-sky-400 dark:text-sky-600 fill-current"
            />
            <p className="font-spacegrotesk text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 italic">
              "{quote}"
            </p>
          </div>

          {/* Modern Depth Button (Matching Hero Design System) */}
          <button
            onClick={onClose}
            className="
              group w-full py-3 px-4
              relative overflow-hidden
              flex items-center justify-center gap-2
              rounded-xl
              font-spacegrotesk font-medium text-sm
              transition-all duration-200
              active:scale-[0.98]
              cursor-pointer
              
              /* --- LIGHT MODE (Dark Button) --- */
              bg-zinc-900
              text-white
              border border-zinc-800
              /* Depth Shadows */
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_8px_0_rgba(0,0,0,0.1)]
              hover:bg-zinc-800
              
              /* --- DARK MODE (Light Button) --- */
              dark:bg-zinc-50
              dark:text-zinc-900
              dark:border-zinc-200
              /* Depth Shadows */
              dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_4px_8px_0_rgba(0,0,0,0.2)]
              dark:hover:bg-zinc-200
            "
          >
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="relative">Continue Learning</span>
            <ArrowRight
              size={16}
              className="relative opacity-70 group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakModal;
