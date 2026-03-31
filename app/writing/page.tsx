import { getAllPosts } from "@/lib/writing";
import PostCard from "@/components/writing/PostCard";
import Link from "next/link";

export const metadata = { title: "Writing — Gabriele" };

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
