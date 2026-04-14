import type { Metadata } from "next";
import { getAllPosts } from "@/lib/writing";
import PostCard from "@/components/writing/PostCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Gabriele Clara Di Gioacchino on software engineering, technology, and building things.",
  alternates: {
    canonical: "https://gabboclaa.com/writing",
  },
  openGraph: {
    title: "Writing — Gabriele Clara Di Gioacchino",
    description:
      "Essays and notes on software engineering, technology, and building things.",
    url: "https://gabboclaa.com/writing",
    siteName: "Gabriele Clara Di Gioacchino",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gabriele Clara Di Gioacchino — Writing" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Gabriele Clara Di Gioacchino",
    description:
      "Essays and notes on software engineering, technology, and building things.",
    images: ["/og-image.png"],
  },
};

export default function WritingPage() {
  const posts = getAllPosts();
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <div className="mb-12">
        <Link
          href="/"
          className="font-mono text-xs text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
        >
          ← Back
        </Link>
      </div>
      <h1 className="font-mono text-xs uppercase tracking-widest text-[#6b6b6b] mb-12">
        Writing
      </h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
