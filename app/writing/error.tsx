"use client";

import Link from "next/link";

export default function WritingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#8a8178] dark:text-[#6f6f6f] mb-4">
        Failed to load
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="font-mono text-[11px] tracking-wide text-[#0f0f0f] dark:text-[#f0f0f0] border border-[#e5e5e5] dark:border-[#2a2a2a] px-4 py-2 rounded-full hover:border-[#bd864b] hover:text-[#bd864b] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/writing"
          className="font-mono text-xs text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
        >
          ← Back to writing
        </Link>
      </div>
    </main>
  );
}
