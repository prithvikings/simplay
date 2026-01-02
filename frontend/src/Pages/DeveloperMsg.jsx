import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImportModal from "../components/ImportModal";
import {
  Menu,
  Github,
  ArrowUpRight,
  Send,
  Loader2,
  Check,
  Terminal,
  Sparkles,
  Focus,
  Zap,
  Linkedin,
  Hammer, // For construction
  ShieldAlert, // For privacy
  Lock, // Added Lock
  Cone, // Added Cone
  X,
} from "lucide-react";

// --- REUSABLE INFO MODAL ---
const InfoModal = ({
  isOpen,
  onClose,
  title,
  message,
  icon: Icon,
  colorClass,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/20 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          <div
            className={`w-14 h-14 ${colorClass} bg-opacity-10 border border-current border-opacity-10 rounded-md flex items-center justify-center mb-5 shadow-sm`}
          >
            <Icon size={28} className={colorClass.replace("bg-", "text-")} />
          </div>

          <h3 className="text-xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {title}
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const DeveloperMsg = () => {
  // Sidebar & Modal States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Info Modal State
  const [activeModal, setActiveModal] = useState(null); // 'portfolio' | 'code' | null

  // Feedback Form States
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrebeknj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: feedback,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setFeedback("");
        setTimeout(() => setIsSent(false), 3000);
      } else {
        alert("Oops! Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0C0C0C] font-inter text-zinc-900 dark:text-zinc-100 relative selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* --- Sidebar --- */}
      <Sidebar
        onOpenImportModal={() => setIsImportModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* --- PORTFOLIO MODAL --- */}
      <InfoModal
        isOpen={activeModal === "portfolio"}
        onClose={() => setActiveModal(null)}
        icon={Cone}
        colorClass="bg-amber-500 text-amber-500"
        title="Under Construction"
        message="This corner of the internet is currently being crafted. I'm polishing the pixels and refining the copy. Check back soon for the launch."
      />

      {/* --- CODE MODAL --- */}
      <InfoModal
        isOpen={activeModal === "code"}
        onClose={() => setActiveModal(null)}
        icon={Lock}
        colorClass="bg-zinc-500 text-zinc-500"
        title="Source Restricted"
        message="Due to security and privacy protocols, the source code is currently private. We plan to open-source specific modules in the future once they are fully audited."
      />

      <main className="flex-1 overflow-y-auto relative h-screen">
        {/* --- Mobile Header --- */}
        <div className="md:hidden sticky top-0 z-30 bg-white/80 dark:bg-[#0C0C0C]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <span className="font-spacegrotesk font-bold text-lg">Simplay</span>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* --- Main Content Container --- */}
        <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              About
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 text-sm">/</span>
            <span className="text-sm text-zinc-500">The Story</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-spacegrotesk font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-[1.1]">
            A quieter way to learn.
          </h1>

          {/* Intro */}
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-10">
              Hi, I'm Prithvi. 👋
              <br />
              <br />I built Simplay because I was frustrated. I found myself
              constantly starting tutorials but rarely finishing them.
            </p>

            <p className="text-zinc-700 dark:text-zinc-300 leading-7 text-[15px]">
              We've all been there. You open a platform to learn a specific
              skill, and 10 minutes later, the algorithm has pulled you into a
              rabbit hole of unrelated content.
              <br />
              <br />
              Most modern tools are designed to keep you <em>watching</em>, not{" "}
              <em>learning</em>. They optimize for "time on screen" by
              bombarding you with recommendations, notifications, and noise.
            </p>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    The Problem
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Confusing motion with progress. Endless feeds that make
                  starting easy, but finishing optional.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <Focus size={16} className="text-green-500" />
                  <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    The Simplay Goal
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A digital "clean desk." No algorithms, no clutter. Just you
                  and the course you want to finish.
                </p>
              </div>
            </div>

            {/* Feature List (Humanized) */}
            <h3 className="text-lg font-bold font-spacegrotesk mb-4 text-zinc-900 dark:text-zinc-100">
              Built for deep work
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-[15px] leading-7">
              Simplay is intentionally quiet. I stripped away everything that
              doesn't help you focus. There is no feed. There is no "Up Next"
              autoplay. There is no social pressure.
            </p>

            <div className="my-8 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
              <p className="italic text-zinc-500 dark:text-zinc-400 text-sm">
                "I wanted a tool that respects your attention span rather than
                trying to steal it. This is for people who want fewer tabs open
                and more things actually done."
              </p>
            </div>

            {/* Links / Footer Actions */}
            <div className="flex flex-wrap items-center gap-4 my-12">
              <button
                onClick={() => setActiveModal("portfolio")}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium rounded hover:opacity-90 transition-opacity"
              >
                <span>My Portfolio</span>
                <ArrowUpRight size={14} />
              </button>

              <a
                href="https://www.linkedin.com/in/prithvi312/"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={14} />
                <span>Support the build</span>
              </a>

              <button
                onClick={() => setActiveModal("code")}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded transition-colors"
              >
                <Github size={14} />
                <span>View Code</span>
              </button>
            </div>

            {/* Separator */}
            <hr className="border-zinc-100 dark:border-zinc-800 my-16" />

            {/* Minimal Linear-style Feedback Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-amber-400" />
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Help shape Simplay
                </h4>
              </div>
              <p className="text-xs text-zinc-500 mb-4">
                I'm actively building this. If something is broken, or if you
                have a "wouldn't it be cool if..." idea, let me know below.
              </p>

              <form onSubmit={handleSubmit} className="relative group">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Type your feedback here..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 placeholder:text-zinc-400 transition-all"
                />
                <div className="absolute bottom-3 right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    type="submit"
                    disabled={!feedback.trim() || isSubmitting}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all shadow-sm
                        ${
                          isSent
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        }
                      `}
                  >
                    {isSubmitting ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : isSent ? (
                      <>
                        <Check size={12} />
                        <span>Sent</span>
                      </>
                    ) : (
                      <>
                        <span>Send note</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Tagline */}
            <div className="mt-20 text-center flex flex-col items-center gap-3">
              <Terminal
                size={16}
                className="text-zinc-300 dark:text-zinc-700"
              />
              <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase">
                Crafted by Prithvi Raj
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperMsg;
