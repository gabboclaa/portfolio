"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface NavProps {
  onOpenCV: () => void;
}

export default function Nav({ onOpenCV }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f3e7db] dark:bg-[#0f0f0f] border-b border-[#e5e5e5] dark:border-[#1f1f1f]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-20 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#"
            aria-label="Home"
            className="font-mono text-base font-medium tracking-[-0.03em] text-[#0f0f0f] dark:text-[#f0f0f0] transition-colors"
          >
            <span className="font-light text-[#bd864b]" aria-hidden="true">&lt;</span>
            GCDG
            <span className="text-[#bd864b]" aria-hidden="true">.dev</span>
            <span className="font-light text-[#bd864b]" aria-hidden="true">&gt;</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-[#0f0f0f] dark:text-[#f0f0f0] border border-[#e5e5e5] dark:border-[#2a2a2a] px-3.5 py-1.5 rounded-full hover:border-[#bd864b] hover:text-[#bd864b] transition-colors"
          >
            Writing ↗
          </Link>

          {/* Resume button */}
          <button
            onClick={onOpenCV}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-[#0f0f0f] dark:text-[#f0f0f0] border border-[#e5e5e5] dark:border-[#2a2a2a] px-3.5 py-1.5 rounded-full hover:border-[#bd864b] hover:text-[#bd864b] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
            </svg>
            Resume
          </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          <a
            href="mailto:gabriele.claradigioacchino@outlook.it"
            className="hidden sm:block text-sm bg-[#0f0f0f] dark:bg-[#f0f0f0] text-white dark:text-[#0f0f0f] px-4 py-1.5 rounded-full hover:bg-[#bd864b] dark:hover:bg-[#bd864b] dark:hover:text-white transition-colors"
          >
            Contact
          </a>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            className="w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] text-[#6b6b6b] dark:text-[#555] hover:border-[#0f0f0f] dark:hover:border-[#f0f0f0] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
          >
            {theme === "light" ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
