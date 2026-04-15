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
  let files: string[];
  try {
    files = fs.readdirSync(WRITING_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(WRITING_DIR, f), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        ...data,
      } as Post;
    })
    .sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      if (isNaN(ta) || isNaN(tb)) return 0;
      return tb - ta;
    });
}

export function getPostContent(slug: string): { meta: Post; content: string } {
  const filePath = path.join(WRITING_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      ...data,
    } as Post,
    content,
  };
}
