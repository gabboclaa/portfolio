"use client";

import { useState } from "react";

const projects = [
  {
    title: "MyShelfie Board Game",
    description:
      "Digital implementation of the Cranio Games board game MyShelfie, developed as the Software Engineering final project at Politecnico di Milano. Supports both a GUI and a TUI, with Java RMI or TCP Socket networking. Features client-side reconnection after crashes, an in-game chat, and a server capable of running multiple simultaneous games.",
    tags: ["Java", "OOP", "RMI", "TCP/IP", "Socket", "GUI", "TUI", "Maven", "Client-Server"],
    href: "https://github.com/gabboclaa/MyShelfieBoardGame",
    year: "2023",
  },
  {
    title: "Shortest Path Finder",
    description:
      "Models a highway as a sequence of service stations and finds the route with the fewest stops between two stations. When multiple optimal routes tie, a lexicographic tiebreaker based on station positions is applied. Final exam project for the Algorithms and Data Structures course at Politecnico di Milano.",
    tags: ["C", "Algorithms", "Graph Theory", "Dynamic Programming", "Data Structures"],
    href: "https://github.com/gabboclaa/Shortest-Path-Finder",
    year: "2023",
  },
  {
    title: "Word Checker",
    description:
      "A Wordle-like word comparison engine implemented in C. Reads a reference word and a set of candidates, then applies positional and frequency-based constraints to evaluate matches. Uses hash tables for O(1) lookups, constraint tracking across multiple games, and Quicksort for lexicographic output filtering.",
    tags: ["C", "Hash Tables", "Quicksort", "Algorithms", "Data Structures"],
    href: "https://github.com/gabboclaa/WordChecker",
    year: "2023",
  },
  {
    title: "Blood Cells Classifier",
    description:
      "Deep learning classifier distinguishing between 8 distinct blood cell types using image classification techniques. Achieved a final accuracy of 0.92 on the hidden test set. Developed for the Artificial Neural Networks and Deep Learning course at Politecnico di Milano.",
    tags: ["Python", "Deep Learning", "CNN", "TensorFlow", "Keras", "Image Classification"],
    href: "https://github.com/gabboclaa/Blood-Cells-Classifier",
    year: "2024",
  },
  {
    title: "Martian Terrain Segmentation",
    description:
      "Semantic segmentation model for satellite images of the Martian surface. Classifies pixels into 5 terrain classes using a U-Net architecture. Achieved a mIoU of 0.675 on the full test set. Developed for the ANN2DL course at Politecnico di Milano.",
    tags: ["Python", "Deep Learning", "U-Net", "Semantic Segmentation", "TensorFlow", "Computer Vision"],
    href: "https://github.com/gabboclaa/Martian-Terrain-Semantic-Segmentation",
    year: "2025",
  },
];

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .project-row::before {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          z-index: 0;
        }
        :not(.dark) .project-row::before { background: #f3e7db; }
        .dark .project-row::before { background: #161616; }

        .project-expand {
          display: grid;
          grid-template-rows: 0fr;
        }
        .project-expand-content {
          opacity: 0;
          transform: translateY(-6px);
        }

        @media (hover: hover) {
          .project-row::before {
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .project-row:hover::before { transform: translateX(0); }

          .project-top { transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .project-row:hover .project-top { padding-left: 20px; padding-right: 20px; padding-bottom: 14px; }
          .project-row:hover .project-title { color: #bd864b; }
          .project-row:hover .project-arrow { color: #bd864b; transform: translate(3px, -3px); }

          .project-expand {
            transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .project-row:hover .project-expand { grid-template-rows: 1fr; }

          .project-expand-content {
            transition: opacity 0.3s ease 0.1s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
          }
          .project-row:hover .project-expand-content { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="projects" className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] bg-[#f3e7db] dark:bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto px-6 md:px-20 py-24">

          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs text-[#9a9a9a] uppercase tracking-widest mb-3">
                Selected work
              </p>
              <h2 className="text-3xl font-medium text-[#0f0f0f] dark:text-[#f0f0f0] tracking-tight">
                Projects
              </h2>
            </div>
            <a
              href="https://github.com/gabboclaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors hidden sm:block font-mono"
            >
              All on GitHub ↗
            </a>
          </div>

          {/* Mobile: timeline accordion */}
          <div className="md:hidden relative border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
            <div className="absolute left-[6px] top-0 bottom-0 w-px bg-[#e5e5e5] dark:bg-[#1a1a1a]" />

            <div className="flex flex-col">
              {projects.map((project, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={project.title}
                    className="border-b border-[#e5e5e5] dark:border-[#1a1a1a] last:border-none"
                  >
                    <button
                      type="button"
                      className="flex w-full items-start gap-4 py-4 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`project-mobile-panel-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                      <div
                        className={`mt-[5px] h-[13px] w-[13px] rounded-full border flex-shrink-0 relative z-10 transition-colors ${
                          isOpen
                            ? "bg-[#0f0f0f] border-[#0f0f0f] dark:bg-[#f0f0f0] dark:border-[#f0f0f0]"
                            : "bg-[#f3e7db] dark:bg-[#0f0f0f] border-[#e5e5e5] dark:border-[#2a2a2a]"
                        }`}
                      />

                      <div className="flex flex-1 min-w-0 flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-[#0f0f0f] dark:text-[#f0f0f0]">
                            {project.title}
                          </span>
                          <span className="font-mono text-xs text-[#9a9a9a] flex-shrink-0">
                            {project.year}
                            <span
                              className="inline-block ml-1 transition-transform duration-200"
                              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                            >
                              ↗
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>

                    <div
                      id={`project-mobile-panel-${i}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-80 opacity-100 pb-4 pl-[29px]" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-xs text-[#9a9a9a] leading-relaxed mb-3 pt-1">
                        {project.description}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] border border-[#e5e5e5] dark:border-[#2a2a2a] px-1.5 py-0.5 rounded text-[#9a9a9a]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#0f0f0f] dark:text-[#f0f0f0] hover:text-[#bd864b] transition-colors"
                      >
                        View project
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: hover-expand */}
          <div className="hidden md:block border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row relative block border-b border-[#e5e5e5] dark:border-[#1a1a1a] overflow-hidden"
              >
                <div className="project-top relative z-10 grid grid-cols-[48px_1fr_auto] items-center gap-6 py-6">
                  <span className="font-mono text-xs text-[#9a9a9a]">{project.year}</span>
                  <span className="project-title text-[17px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0f0f0] transition-colors duration-200">
                    {project.title}
                  </span>
                  <span className="project-arrow text-base text-[#9a9a9a] transition-all duration-300">↗</span>
                </div>

                <div className="project-expand relative z-10 overflow-hidden">
                  <div className="overflow-hidden">
                    <div className="project-expand-content flex flex-col gap-4 pb-6 pl-[72px] pr-5">
                      <p className="text-[13.5px] text-[#9a9a9a] leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-[#9a9a9a] bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e8e8e8] dark:border-[#222] px-2.5 py-1 rounded-full whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
