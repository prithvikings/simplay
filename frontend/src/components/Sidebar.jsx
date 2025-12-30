import React, { useState } from "react";
import {
  LayoutDashboard,
  Compass,
  Library,
  Settings,
  LogOut,
  PlusCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AnimatedThemeToggle } from "./animated-theme-toggle";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Library, label: "My Library", path: "/library" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={`
        hidden md:flex flex-col h-screen sticky top-0 
        border-r border-dashed border-zinc-200 dark:border-zinc-800 
        bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* --- Logo Area --- */}
      <div
        className={`p-6 flex items-center h-20 ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-1.5 rounded-lg shrink-0 transition-transform hover:scale-105">
          <svg width="20" height="20" viewBox="0 0 96 96" fill="currentColor">
            <rect x="16" y="16" width="64" height="12" rx="6" />
            <rect x="28" y="32" width="64" height="12" rx="6" />
            <rect x="16" y="48" width="64" height="12" rx="6" />
            <rect x="28" y="64" width="64" height="12" rx="6" />
          </svg>
        </div>

        {/* Title */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <span className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
            Simplay
          </span>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-none">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center p-2.5 rounded-xl transition-all duration-200 group relative
                ${isCollapsed ? "justify-center" : "gap-3"}
                ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                }
              `}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-sky-500"
                    : "group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                }`}
              />

              <span
                className={`
                    font-inter text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300
                    ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                `}
              >
                {item.label}
              </span>

              {/* Active Indicator Dot (Optional aesthetic touch) */}
              {isActive && !isCollapsed && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-sky-500" />
              )}
            </button>
          );
        })}

        {/* Quick Add Button */}
        <div
          className={`pt-4 mt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <button
            className={`
                group flex items-center rounded-xl text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300
                border border-transparent hover:border-sky-200 dark:hover:border-sky-800
                ${
                  isCollapsed
                    ? "p-2.5 justify-center"
                    : "w-full gap-3 px-3 py-2.5"
                }
            `}
            title="Create New Course"
          >
            <PlusCircle
              size={20}
              className="transition-transform group-hover:rotate-90"
            />
            <span
              className={`font-inter text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              New Course
            </span>
          </button>
        </div>
      </nav>

      {/* --- Footer Area --- */}
      <div className="p-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col gap-4 bg-zinc-50/80 dark:bg-zinc-950/80">
        {/* Theme & Collapse Controls */}
        <div
          className={`flex items-center ${
            isCollapsed ? "flex-col gap-4" : "justify-between"
          }`}
        >
          {/* Theme Toggle Container */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3 w-full"
            }`}
          >
            <AnimatedThemeToggle className="size-9 shrink-0" />

            {/* Label for Theme Toggle (Only visible when Expanded) */}
            <div
              className={`
                    flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${
                      isCollapsed
                        ? "w-0 opacity-0 hidden"
                        : "w-auto opacity-100"
                    }
               `}
            >
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                Appearance
              </span>
              <span className="text-[10px] text-zinc-500">Switch theme</span>
            </div>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
                p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors
                ${
                  isCollapsed
                    ? ""
                    : "hover:bg-white dark:hover:bg-zinc-900 shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                }
            `}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* User Profile */}
        <div
          className={`
              flex items-center rounded-xl transition-all duration-200
              ${
                isCollapsed
                  ? "justify-center p-0"
                  : "gap-3 p-2 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer shadow-sm"
              }
          `}
        >
          <img
            src={
              user?.avatar ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            }
            alt="User"
            className="w-8 h-8 rounded-full bg-zinc-200 shrink-0 border border-zinc-200 dark:border-zinc-700"
          />

          <div
            className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            }`}
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {user?.name || "Learner"}
            </p>
            <p className="text-xs text-zinc-500 truncate">Free Plan</p>
          </div>

          <button
            onClick={logout}
            className={`
                text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-md transition-all
                ${isCollapsed ? "hidden" : "block"}
            `}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
