import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import {
  MessageSquare,
  Heart,
  Send,
  Loader2,
  Menu,
  Github,
  Twitter,
  Code2,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const DeveloperMsg = () => {
  // Sidebar & Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feedback Form States
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    // Simulate Backend Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFeedback("");

      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-inter selection:bg-sky-500/20 relative overflow-hidden">
      {/* --- Background Ambient Glows --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* --- Sidebar --- */}
      <Sidebar
        onOpenImportModal={() => setIsModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <ImportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="flex-1 overflow-y-auto relative z-10">
        {/* --- Mobile Header --- */}
        <div className="md:hidden sticky top-0 z-30 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-spacegrotesk font-bold text-lg text-zinc-900 dark:text-zinc-100">
              Simplay
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8 md:px-12 md:py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-bold tracking-widest uppercase mb-4 border border-sky-200 dark:border-sky-800">
              <Sparkles size={12} />
              <span>Building in Public</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
              Developer's Note
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-light">
              Behind the scenes of Simplay. A direct line to the creator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* --- LEFT COLUMN (Message) --- */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Note Card */}
              <div className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                {/* Avatar Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 rotate-3 group-hover:rotate-6 transition-transform duration-300">
                      <span className="font-spacegrotesk font-bold text-2xl">
                        P
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-900 p-1 rounded-full">
                      <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900" />
                    </div>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-spacegrotesk">
                      Prithvi Raj
                    </h3>
                    <p className="text-xs font-medium text-sky-600 dark:text-sky-400 tracking-wide uppercase">
                      Lead Developer & Creator
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="space-y-5 text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px]">
                  <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    Hi there! 👋 Thanks for trying Simplay.
                  </p>
                  <p>
                    I built this platform because I was tired of the "YouTube
                    Loop"—you go to watch a tutorial, and 20 minutes later
                    you're watching cat videos. Simplay is my solution to
                    reclaim focus.
                  </p>
                  <div className="pl-4 border-l-2 border-sky-500/50 my-6">
                    <p className="italic text-zinc-500 dark:text-zinc-400">
                      "This project is currently in active development. I am
                      shipping code daily to make this the best distraction-free
                      learning experience."
                    </p>
                  </div>
                  <p>
                    I'm listening to every piece of feedback. If something is
                    broken, or if you have a "wouldn't it be cool if..." idea,
                    drop it in the box on the right. Your words directly shape
                    the next commit.
                  </p>
                  <p className="flex items-center gap-2 pt-4 font-medium text-zinc-900 dark:text-zinc-100">
                    Happy Learning!
                    <Heart
                      size={18}
                      className="text-red-500 fill-red-500 animate-pulse"
                    />
                  </p>
                </div>
              </div>

              {/* Social Connect */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <Github
                        size={20}
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                      GitHub
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <Twitter size={20} className="text-sky-500" />
                    </div>
                    <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                      Twitter
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                  />
                </a>
              </div>
            </div>

            {/* --- RIGHT COLUMN (Interactive) --- */}
            <div className="lg:col-span-5 space-y-6">
              {/* Roadmap Widget */}
              <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-500" />
                    Roadmap
                  </h3>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                    Live Status
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Note Taking System",
                      desc: "Markdown support for videos",
                      status: "In Progress",
                      color: "amber",
                    },
                    {
                      label: "Community Chat",
                      desc: "Discuss courses with others",
                      status: "Planning",
                      color: "zinc",
                    },
                    {
                      label: "Quiz Mode",
                      desc: "Test your knowledge",
                      status: "Backlog",
                      color: "zinc",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div
                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          item.status === "In Progress"
                            ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                            {item.label}
                          </span>
                          {item.status === "In Progress" && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold">
                              WIP
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Widget */}
              <div className="bg-gradient-to-b from-zinc-900 to-black text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-zinc-800 rounded-lg">
                      <MessageSquare size={16} className="text-sky-400" />
                    </div>
                    <h3 className="font-bold text-sm">Feature Request</h3>
                  </div>

                  <p className="text-xs text-zinc-400 mb-4">
                    What should I build next? Your vote counts.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="I wish Simplay had..."
                      className="w-full h-28 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-500 resize-none transition-all"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !feedback.trim()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-sky-900/20"
                    >
                      {isSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : isSent ? (
                        <>
                          <Sparkles size={16} className="text-yellow-300" />
                          <span>Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Request</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperMsg;
