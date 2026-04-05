"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import CVModal from "@/components/CVModal";
import { useTheme } from "@/components/ThemeProvider";

function MusicPlayerSkeleton() {
  const { theme } = useTheme();

  return (
    <div
      className="flex items-center gap-[2px] px-3 py-1 rounded-full border h-[34px] w-[120px] shadow-[0_10px_30px_rgba(15,15,15,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      style={{
        backgroundColor: theme === "dark" ? "#111111" : "#f3e7db",
        borderColor: theme === "dark" ? "#2a2a2a" : "#e5e5e5",
      }}
    >
      <span className="w-[2px] h-[4px] rounded-sm bg-[#bd864b]" />
      <span className="w-[2px] h-[4px] rounded-sm bg-[#bd864b]" />
      <span className="w-[2px] h-[4px] rounded-sm bg-[#bd864b]" />
    </div>
  );
}

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
  loading: () => <MusicPlayerSkeleton />,
});

export default function HomeClient({ postCount }: { postCount: number }) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3e7db] dark:bg-[#0f0f0f] pb-24">
      <Nav onOpenCV={() => setCvOpen(true)} />
      <Hero onOpenCV={() => setCvOpen(true)} />
      <Projects />
      <Skills />
      <Footer postCount={postCount} />
      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <MusicPlayer />
      </div>
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </main>
  );
}
