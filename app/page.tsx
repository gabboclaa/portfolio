"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import CVModal from "@/components/CVModal";

export default function Home() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3e7db] dark:bg-[#0f0f0f]">
      <Nav onOpenCV={() => setCvOpen(true)} />
      <Hero onOpenCV={() => setCvOpen(true)} />
      <Projects />
      <Skills />
      <Footer />
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </main>
  );
}
