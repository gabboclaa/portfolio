import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

const WRITING_DIR = path.join(process.cwd(), "content/writing");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(WRITING_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(WRITING_DIR, f), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostContent(slug: string): { meta: Post; content: string } {
  const raw = fs.readFileSync(
    path.join(WRITING_DIR, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(raw);
  return { meta: data as Post, content };
}
