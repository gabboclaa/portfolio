import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/writing";

const BASE_URL = "https://gabboclaa.com";
const SITE_LAST_MODIFIED = new Date("2026-04-21");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: BASE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
