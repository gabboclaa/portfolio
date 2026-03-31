import Link from "next/link";
import { Post } from "@/lib/writing";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/writing/${post.slug}`} className="group flex flex-col gap-1">
      <span className="font-mono text-xs text-[#6b6b6b]">{post.date}</span>
      <span className="text-base font-sans text-[#0f0f0f] dark:text-[#f0f0f0] group-hover:text-[#0066ff] transition-colors">
        {post.title}
      </span>
      <span className="text-sm text-[#6b6b6b]">{post.description}</span>
      {post.tags.length > 0 && (
        <div className="flex gap-2 mt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[#6b6b6b] border border-[#e5e5e5] dark:border-[#2a2a2a] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
