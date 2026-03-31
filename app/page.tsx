import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Gabriele Clara Di Gioacchino — Software Developer",
  description:
    "Portfolio of Gabriele Clara Di Gioacchino — software developer based in Milan. Building clean, thoughtful products from architecture to interface.",
  openGraph: {
    title: "Gabriele Clara Di Gioacchino — Software Developer",
    description:
      "Software developer based in Milan. Building clean, thoughtful products from architecture to interface.",
    url: "https://gabboclaa.vercel.app/",
    siteName: "Gabriele Clara Di Gioacchino",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriele Clara Di Gioacchino — Software Developer",
    description:
      "Software developer based in Milan. Building clean, thoughtful products from architecture to interface.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const postCount = getAllPosts().length;
  return <HomeClient postCount={postCount} />;
}
