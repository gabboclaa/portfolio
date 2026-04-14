import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer({ postCount }: { postCount: number }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] bg-[#f3e7db] dark:bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-6 md:px-20 py-10 flex flex-col gap-0">

        {postCount > 0 && (
          <div className="flex items-center justify-between py-4 border-b border-[#e5e5e5] dark:border-[#1a1a1a]">
            <Link href="/writing" className="flex items-center gap-1 text-sm hover:text-[#0066ff] transition-colors">
              I write things
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 8L8 2M8 2H3M8 2v5" />
              </svg>
            </Link>
            <span className="font-mono text-xs text-[#9a9a9a]">
              {postCount === 1 ? "1 post" : `${postCount} posts`}
            </span>
          </div>
        )}


<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-[#9a9a9a]">
              © {year} Gabriele Clara Di Gioacchino
            </span>
            <span className="font-mono text-xs text-[#b0b0b0] dark:text-[#3a3a3a]">
              Based in Milan · Open to opportunities
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/gabboclaa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/gabriele-clara-di-gioacchino"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:gabriele.claradigioacchino@outlook.it"
              aria-label="Email"
              className="text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
