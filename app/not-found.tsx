import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="font-mono text-8xl font-medium tracking-[0.08em] text-[#6b6b6b] dark:text-[#9a9a9a] mb-4">
        404
      </p>
      <p className="text-sm text-[#6b6b6b] dark:text-[#9a9a9a] mb-8">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="font-mono text-xs text-[#6b6b6b] dark:text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
      >
        ← Home
      </Link>
    </main>
  );
}
