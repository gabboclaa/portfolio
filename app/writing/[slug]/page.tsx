import { getPostContent, getAllPosts } from "@/lib/writing";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta } = getPostContent(slug);
  const url = `https://gabboclaa.com/writing/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Gabriele Clara Di Gioacchino",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.title }],
      type: "article",
      publishedTime: meta.date,
      authors: ["Gabriele Clara Di Gioacchino"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostContent(slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    author: {
      "@type": "Person",
      name: "Gabriele Clara Di Gioacchino",
      url: "https://gabboclaa.com",
    },
    datePublished: meta.date,
    url: `https://gabboclaa.com/writing/${slug}`,
  };
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mb-12">
        <Link
          href="/writing"
          className="font-mono text-xs text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
        >
          ← Writing
        </Link>
      </div>
      <p className="font-mono text-xs text-[#6b6b6b] mb-2">{meta.date}</p>
      <h1 className="text-2xl font-sans font-semibold text-[#0f0f0f] dark:text-[#f0f0f0] mb-8">
        {meta.title}
      </h1>
      {meta.tags.length > 0 && (
        <div className="flex gap-2 mb-8">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[#6b6b6b] border border-[#e5e5e5] dark:border-[#2a2a2a] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
