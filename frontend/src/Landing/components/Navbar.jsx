import React from "react";
import { AnimatedThemeToggle } from "../../components/animated-theme-toggle";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 border border-dashed border-t-0 pt-4 pb-4 px-4 md:px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="logo flex items-center gap-1 group cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 96 96"
          xmlns="http://www.w3.org/2000/svg"
          className="text-zinc-900 dark:text-zinc-50 transition-transform duration-300 group-hover:scale-[1.06]"
        >
          <rect
            x="16"
            y="16"
            width="64"
            height="12"
            rx="6"
            fill="currentColor"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
          <rect
            x="28"
            y="32"
            width="64"
            height="12"
            rx="6"
            fill="currentColor"
            className="transition-transform duration-300 delay-75 group-hover:-translate-x-1"
          />
          <rect
            x="16"
            y="48"
            width="64"
            height="12"
            rx="6"
            fill="currentColor"
            className="transition-transform duration-300 delay-150 group-hover:translate-x-1"
          />
          <rect
            x="28"
            y="64"
            width="64"
            height="12"
            rx="6"
            fill="currentColor"
            className="transition-transform duration-300 delay-200 group-hover:-translate-x-1"
          />
        </svg>

        <h2 className="text-xl font-spacegrotesk text-zinc-900 dark:text-zinc-50">
          Simplay
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <AnimatedThemeToggle className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700" />

        <button
          onClick={handleClick}
          className="
            hidden md:inline-flex 
            group items-center gap-1.5
            rounded-md px-2 py-1.5
            bg-transparent
            border border-zinc-300/70 dark:border-zinc-700/70
            font-inter text-xs font-medium
            text-zinc-700 dark:text-zinc-300
            cursor-pointer
            transition-all duration-200

            hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60
            hover:text-zinc-900 dark:hover:text-zinc-50

            active:translate-y-[1px]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-zinc-400/40
            dark:focus-visible:ring-zinc-600/40
          "
        >
          Get Started
          <ArrowRight
            size={12}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
