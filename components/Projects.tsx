"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type TagTone = "ml" | "vision" | "systems" | "java" | "nlp";

type ProjectTag = {
  label: string;
  tone: TagTone;
};

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectStat = {
  label: string;
  value: string;
};

type Project = {
  title: string;
  year: string;
  summary: string;
  description: string;
  tags: ProjectTag[];
  stats: ProjectStat[];
  links: ProjectLink[];
  key: "myshelfie" | "pathfinder" | "wordchecker" | "bloodcells" | "martian";
  latest?: boolean;
  image?: string;
};

const projects: Project[] = [
  {
    key: "martian",
    title: "Martian Terrain Segmentation",
    year: "2025",
    summary: "A U-Net pipeline for semantic segmentation of Martian terrain imagery.",
    description:
      "My latest project focuses on pixel-level classification of Martian surface imagery into five terrain classes. Built with TensorFlow and a U-Net architecture, it reached a mIoU of 0.675 on the full test set and emphasizes spatial reasoning, mask generation, and visually interpretable output.",
    stats: [
      { label: "Classes", value: "5 terrain types" },
      { label: "mIoU", value: "0.675" },
      { label: "Model", value: "U-Net" },
    ],
    tags: [
      { label: "ML/AI", tone: "ml" },
      { label: "Computer Vision", tone: "vision" },
      { label: "Semantic Segmentation", tone: "vision" },
      { label: "TensorFlow", tone: "ml" },
      { label: "Python", tone: "ml" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/gabboclaa/Martian-Terrain-Semantic-Segmentation" },
      { label: "README demo", href: "https://github.com/gabboclaa/Martian-Terrain-Semantic-Segmentation#readme" },
    ],
    image: "/projects/martianTerrainSegmentation.jpg",
    latest: true,
  },
  {
    key: "bloodcells",
    title: "Blood Cells Classifier",
    year: "2024",
    summary: "An image classifier for 8 blood cell classes trained with TensorFlow and CNNs.",
    description:
      "Developed for the Artificial Neural Networks and Deep Learning course, this model performs multiclass blood cell recognition from microscope images. The final system reached 92% accuracy on the hidden test set and focused on building a reliable image classification workflow end to end.",
    stats: [
      { label: "Classes", value: "8 cell types" },
      { label: "Accuracy", value: "0.92" },
      { label: "Framework", value: "TensorFlow" },
    ],
    tags: [
      { label: "ML/AI", tone: "ml" },
      { label: "Computer Vision", tone: "vision" },
      { label: "CNN", tone: "ml" },
      { label: "TensorFlow", tone: "ml" },
      { label: "Image Classification", tone: "vision" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/gabboclaa/Blood-Cells-Classifier" },
      { label: "README demo", href: "https://github.com/gabboclaa/Blood-Cells-Classifier#readme" },
    ],
    image: "/projects/bloodCellsClassification.jpg",
  },
  {
    key: "myshelfie",
    title: "MyShelfie Board Game",
    year: "2023",
    summary: "Java board game adaptation with both GUI and TUI clients over RMI and TCP sockets.",
    description:
      "A complete digital version of MyShelfie built as a distributed systems project at Politecnico di Milano. The game supports multiple simultaneous matches, reconnect flows after client crashes, in-game chat, and parallel GUI and terminal interfaces on top of the same networking model.",
    stats: [
      { label: "Mode", value: "GUI + TUI" },
      { label: "Network", value: "RMI / TCP" },
      { label: "Architecture", value: "Client-server" },
    ],
    tags: [
      { label: "Java", tone: "java" },
      { label: "RMI", tone: "java" },
      { label: "TCP/IP", tone: "systems" },
      { label: "GUI", tone: "java" },
      { label: "TUI", tone: "systems" },
      { label: "Maven", tone: "java" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/gabboclaa/MyShelfieBoardGame" },
      { label: "README demo", href: "https://github.com/gabboclaa/MyShelfieBoardGame#readme" },
    ],
    image: "/projects/myshelfie.jpg",
  },
  {
    key: "pathfinder",
    title: "Shortest Path Finder",
    year: "2023",
    summary: "Route planner in C that minimizes stops and resolves ties with a deterministic station order.",
    description:
      "An algorithms project modeling a highway as service stations with constrained movement between nodes. The solver computes the route with the fewest stops and applies a lexicographic tiebreaker when multiple optimal solutions exist, keeping the output stable and predictable.",
    stats: [
      { label: "Language", value: "C" },
      { label: "Focus", value: "Graph search" },
      { label: "Tie-break", value: "Lexicographic" },
    ],
    tags: [
      { label: "Algorithms", tone: "systems" },
      { label: "C", tone: "systems" },
      { label: "Graph Theory", tone: "systems" },
      { label: "Dynamic Programming", tone: "systems" },
      { label: "Visualisation", tone: "nlp" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/gabboclaa/Shortest-Path-Finder" },
      { label: "README demo", href: "https://github.com/gabboclaa/Shortest-Path-Finder#readme" },
    ],
    image: "/projects/shortestPathFinder.jpg",
  },
  {
    key: "wordchecker",
    title: "Word Checker",
    year: "2023",
    summary: "A Wordle-style evaluation engine in C with fast lookups and constraint-aware filtering.",
    description:
      "This project compares candidate words against a target by combining positional constraints, frequency checks, and persistent state across guesses. It uses hash tables for fast lookups and Quicksort for ordered output, turning a compact systems problem into a robust word-analysis pipeline.",
    stats: [
      { label: "Language", value: "C" },
      { label: "Core DS", value: "Hash tables" },
      { label: "Output", value: "Sorted matches" },
    ],
    tags: [
      { label: "NLP", tone: "nlp" },
      { label: "Algorithms", tone: "systems" },
      { label: "Hash Tables", tone: "systems" },
      { label: "Quicksort", tone: "systems" },
      { label: "Visualisation", tone: "nlp" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/gabboclaa/WordChecker" },
      { label: "README demo", href: "https://github.com/gabboclaa/WordChecker#readme" },
    ],
    image: "/projects/wordchecker.png",
  },
];

const toneClasses: Record<TagTone, string> = {
  ml: "border-[#6f4ef6]/40 bg-[#6f4ef6]/10 text-[#b8a8ff]",
  vision: "border-[#2ea89b]/40 bg-[#2ea89b]/10 text-[#7fe2d6]",
  systems: "border-[#c97a2b]/40 bg-[#c97a2b]/10 text-[#efb273]",
  java: "border-[#4d9a57]/40 bg-[#4d9a57]/10 text-[#97d0a0]",
  nlp: "border-[#3d78d8]/40 bg-[#3d78d8]/10 text-[#94bcff]",
};

function Frame({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="319" height="199" rx="12" fill="#111111" stroke="#262626" />
      <rect x="18" y="18" width="284" height="164" rx="8" fill="#141414" stroke="#232323" />
      <rect x="18" y="18" width="284" height="28" rx="8" fill="#101010" stroke="#232323" />
      <circle cx="36" cy="32" r="4" fill={accent} />
      <circle cx="50" cy="32" r="4" fill="#2c2c2c" />
      <circle cx="64" cy="32" r="4" fill="#2c2c2c" />
      {children}
    </svg>
  );
}

function ProjectArtwork({ project, variant }: { project: Project["key"]; variant: "rest" | "active" }) {
  switch (project) {
    case "myshelfie":
      return (
        <Frame accent="#4d9a57">
          {variant === "rest" ? (
            <>
              <rect x="42" y="72" width="110" height="76" rx="10" fill="#161616" stroke="#2b2b2b" />
              <rect x="168" y="72" width="110" height="76" rx="10" fill="#161616" stroke="#2b2b2b" />
              <rect x="62" y="92" width="70" height="10" rx="5" fill="#4d9a57" opacity="0.7" />
              <rect x="62" y="110" width="46" height="8" rx="4" fill="#7b7b7b" opacity="0.65" />
              <rect x="188" y="92" width="44" height="36" rx="8" fill="#233726" stroke="#4d9a57" />
              <path d="M210 88V133" stroke="#4d9a57" strokeWidth="3" strokeLinecap="round" />
              <path d="M224 88V133" stroke="#4d9a57" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <rect x="40" y="64" width="240" height="96" rx="14" fill="#171717" stroke="#2e2e2e" />
              <rect x="56" y="80" width="66" height="64" rx="8" fill="#233726" stroke="#4d9a57" />
              <rect x="130" y="80" width="66" height="64" rx="8" fill="#202c21" stroke="#3f7f48" />
              <rect x="204" y="80" width="60" height="64" rx="8" fill="#243327" stroke="#4d9a57" />
              <circle cx="89" cy="112" r="14" fill="#97d0a0" opacity="0.9" />
              <rect x="146" y="96" width="34" height="32" rx="6" fill="#97d0a0" opacity="0.85" />
              <path d="M218 120L232 94L246 120L260 102" stroke="#97d0a0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </Frame>
      );
    case "pathfinder":
      return (
        <Frame accent="#c97a2b">
          {variant === "rest" ? (
            <>
              <path d="M48 124H274" stroke="#3a3a3a" strokeWidth="16" strokeLinecap="round" />
              <circle cx="72" cy="124" r="10" fill="#1a1a1a" stroke="#c97a2b" />
              <circle cx="134" cy="124" r="10" fill="#1a1a1a" stroke="#c97a2b" />
              <circle cx="196" cy="124" r="10" fill="#1a1a1a" stroke="#c97a2b" />
              <circle cx="248" cy="124" r="10" fill="#1a1a1a" stroke="#c97a2b" />
              <path d="M72 104L134 104L196 88L248 88" stroke="#6d6d6d" strokeWidth="3" strokeDasharray="6 6" />
            </>
          ) : (
            <>
              <path d="M48 132H274" stroke="#2f2f2f" strokeWidth="18" strokeLinecap="round" />
              <path d="M72 132L126 132L176 96L226 96L248 132" stroke="#efb273" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="72" cy="132" r="12" fill="#1a1a1a" stroke="#efb273" strokeWidth="3" />
              <circle cx="126" cy="132" r="12" fill="#1a1a1a" stroke="#efb273" strokeWidth="3" />
              <circle cx="176" cy="96" r="12" fill="#1a1a1a" stroke="#efb273" strokeWidth="3" />
              <circle cx="226" cy="96" r="12" fill="#1a1a1a" stroke="#efb273" strokeWidth="3" />
              <circle cx="248" cy="132" r="12" fill="#1a1a1a" stroke="#efb273" strokeWidth="3" />
            </>
          )}
        </Frame>
      );
    case "wordchecker":
      return (
        <Frame accent="#3d78d8">
          {variant === "rest" ? (
            <>
              <rect x="48" y="72" width="42" height="42" rx="8" fill="#18263f" stroke="#3d78d8" />
              <rect x="96" y="72" width="42" height="42" rx="8" fill="#171717" stroke="#2c2c2c" />
              <rect x="144" y="72" width="42" height="42" rx="8" fill="#171717" stroke="#2c2c2c" />
              <rect x="192" y="72" width="42" height="42" rx="8" fill="#171717" stroke="#2c2c2c" />
              <rect x="240" y="72" width="32" height="42" rx="8" fill="#171717" stroke="#2c2c2c" />
              <rect x="48" y="126" width="224" height="10" rx="5" fill="#2a2a2a" />
              <rect x="48" y="144" width="168" height="8" rx="4" fill="#3d78d8" opacity="0.75" />
            </>
          ) : (
            <>
              <rect x="44" y="68" width="232" height="90" rx="12" fill="#151515" stroke="#292929" />
              <rect x="60" y="84" width="34" height="34" rx="7" fill="#18263f" stroke="#3d78d8" />
              <rect x="100" y="84" width="34" height="34" rx="7" fill="#20385f" stroke="#5f96ea" />
              <rect x="140" y="84" width="34" height="34" rx="7" fill="#132035" stroke="#3d78d8" />
              <rect x="180" y="84" width="34" height="34" rx="7" fill="#101926" stroke="#2f5ca5" />
              <rect x="220" y="84" width="40" height="34" rx="7" fill="#132035" stroke="#3d78d8" />
              <path d="M66 136H252" stroke="#2c2c2c" strokeWidth="8" strokeLinecap="round" />
              <path d="M66 136H190" stroke="#94bcff" strokeWidth="8" strokeLinecap="round" />
            </>
          )}
        </Frame>
      );
    case "bloodcells":
      return (
        <Frame accent="#6f4ef6">
          {variant === "rest" ? (
            <>
              <circle cx="90" cy="102" r="22" fill="#2ea89b" opacity="0.18" stroke="#2ea89b" />
              <circle cx="146" cy="122" r="18" fill="#6f4ef6" opacity="0.16" stroke="#6f4ef6" />
              <circle cx="198" cy="92" r="24" fill="#2ea89b" opacity="0.18" stroke="#2ea89b" />
              <circle cx="242" cy="126" r="16" fill="#6f4ef6" opacity="0.16" stroke="#6f4ef6" />
              <path d="M56 154H262" stroke="#2b2b2b" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <rect x="46" y="66" width="228" height="96" rx="14" fill="#151515" stroke="#292929" />
              <circle cx="92" cy="114" r="28" fill="#2ea89b" opacity="0.22" stroke="#7fe2d6" strokeWidth="2" />
              <circle cx="160" cy="114" r="28" fill="#6f4ef6" opacity="0.22" stroke="#b8a8ff" strokeWidth="2" />
              <circle cx="228" cy="114" r="28" fill="#2ea89b" opacity="0.22" stroke="#7fe2d6" strokeWidth="2" />
              <path d="M78 114H106" stroke="#7fe2d6" strokeWidth="4" strokeLinecap="round" />
              <path d="M146 100L160 128L174 100" stroke="#b8a8ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M214 112L228 98L242 112L228 126Z" fill="#7fe2d6" opacity="0.85" />
            </>
          )}
        </Frame>
      );
    case "martian":
      return (
        <Frame accent="#6f4ef6">
          {variant === "rest" ? (
            <>
              <rect x="48" y="72" width="224" height="88" rx="12" fill="#151515" stroke="#2b2b2b" />
              <path d="M48 122C76 96 102 108 132 94C158 82 192 94 220 84C238 78 252 84 272 72V160H48V122Z" fill="#5c4a3d" opacity="0.7" />
              <path d="M48 138C74 124 96 142 122 130C154 114 186 126 214 120C236 116 254 128 272 122V160H48V138Z" fill="#6f4ef6" opacity="0.2" />
            </>
          ) : (
            <>
              <rect x="44" y="66" width="232" height="96" rx="14" fill="#151515" stroke="#292929" />
              <rect x="58" y="80" width="146" height="68" rx="10" fill="#5c4a3d" opacity="0.86" />
              <path d="M58 126C86 102 110 116 132 102C158 86 182 102 204 92V148H58V126Z" fill="#7f6754" />
              <path d="M58 136C84 122 104 136 128 126C150 118 176 124 204 112V148H58V136Z" fill="#2ea89b" opacity="0.82" />
              <rect x="214" y="80" width="48" height="14" rx="5" fill="#6f4ef6" opacity="0.8" />
              <rect x="214" y="102" width="48" height="14" rx="5" fill="#2ea89b" opacity="0.8" />
              <rect x="214" y="124" width="48" height="14" rx="5" fill="#c97a2b" opacity="0.8" />
            </>
          )}
        </Frame>
      );
  }
}

function ProjectThumbnail({
  project,
}: {
  project: Project;
}) {
  const src = project.image;

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
    );
  }

  return <ProjectArtwork project={project.key} variant="active" />;
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number>(projects.findIndex((project) => project.latest));

  return (
    <>
      <style>{`
        .project-card {
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .project-thumb {
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }

        .project-card:hover .project-thumb,
        .project-card[data-open="true"] .project-thumb,
        .project-card:focus-within .project-thumb {
          transform: scale(1.02);
        }

        .project-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card[data-open="true"] .project-panel {
          grid-template-rows: 1fr;
        }

        .project-panel-inner {
          overflow: hidden;
        }

        .project-panel-content {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.2s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card[data-open="true"] .project-panel-content {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.08s;
        }
      `}</style>

      <section
        id="projects"
        className="border-t border-[#e5e5e5] bg-[#f3e7db] dark:border-[#1a1a1a] dark:bg-[#0f0f0f]"
      >
        <div className="px-6 py-24 md:px-20">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8a8178] dark:text-[#6f6f6f]">
                Selected Work
              </p>
              <h2 className="text-3xl font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0f0f0]">
                Projects
              </h2>
            </div>

            <a
              href="https://github.com/gabboclaa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-xs uppercase tracking-[0.18em] text-[#8a8178] transition-colors hover:text-[#0f0f0f] dark:text-[#8a8a8a] dark:hover:text-[#f0f0f0] sm:inline-flex"
            >
              All on GitHub ↗
            </a>
          </div>

          <div className="border-y border-[#e5e5e5] dark:border-[#1a1a1a]">
            {projects.map((project, index) => {
              const isOpen = openIndex === index;
              const panelId = `project-panel-${project.key}`;

              return (
                <article
                  key={project.title}
                  data-open={isOpen}
                  className="project-card border-b border-[#e5e5e5] dark:border-[#1a1a1a] last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group w-full text-left"
                  >
                    <div className="grid gap-6 px-0 py-6 md:grid-cols-[72px_minmax(0,1fr)_196px_28px] md:items-center">
                      <div className="flex items-center justify-between md:block">
                        <span className="font-mono text-xs text-[#8a8178] dark:text-[#7f7f7f]">{project.year}</span>
                        {project.latest ? (
                          <span className="inline-flex rounded-full border border-[#6f4ef6]/35 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b8a8ff] md:hidden">
                            Latest
                          </span>
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0f0f0]">
                            {project.title}
                          </h3>
                          {project.latest ? (
                            <span className="hidden rounded-full border border-[#6f4ef6]/35 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b8a8ff] md:inline-flex">
                              Latest
                            </span>
                          ) : null}
                        </div>
                        <p className="max-w-2xl text-sm leading-relaxed text-[#6b6b6b] dark:text-[#8a8a8a]">
                          {project.summary}
                        </p>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#ddd0c3] bg-[#efe3d7] dark:border-[#232323] dark:bg-[#111111]">
                        <div className="project-thumb h-full w-full">
                          <ProjectThumbnail project={project} />
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <span
                          className="font-mono text-sm text-[#8a8178] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#0f0f0f] dark:text-[#6f6f6f] dark:group-hover:text-[#f0f0f0]"
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div id={panelId} className="project-panel" aria-hidden={!isOpen}>
                    <div className="project-panel-inner">
                      <div className="project-panel-content border-t border-[#e5e5e5] pb-6 pt-6 dark:border-[#1a1a1a]">
                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                          <div className="space-y-5">
                            <div className="overflow-hidden rounded-3xl border border-[#ddd0c3] bg-[#efe3d7] dark:border-[#232323] dark:bg-[#111111]">
                              <div className="relative aspect-[16/10] w-full">
                                <ProjectThumbnail project={project} />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span
                                  key={`${project.key}-${tag.label}`}
                                  className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${toneClasses[tag.tone]}`}
                                >
                                  {tag.label}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="max-w-xl text-sm leading-7 text-[#6b6b6b] dark:text-[#9a9a9a]">
                                {project.description}
                              </p>

                              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                                {project.stats.map((stat) => (
                                  <div
                                    key={`${project.key}-${stat.label}`}
                                    className="border border-[#ddd0c3] bg-[#efe3d7] px-4 py-3 dark:border-[#202020] dark:bg-[#121212]"
                                  >
                                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8178] dark:text-[#6f6f6f]">
                                      {stat.label}
                                    </dt>
                                    <dd className="mt-2 text-sm text-[#0f0f0f] dark:text-[#f0f0f0]">{stat.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {project.links.map((link) => (
                                <a
                                  key={`${project.key}-${link.label}`}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center border border-[#d8cabd] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3d342d] transition-colors hover:border-[#0f0f0f] hover:text-[#0f0f0f] dark:border-[#2a2a2a] dark:text-[#d9d9d9] dark:hover:border-[#f0f0f0] dark:hover:text-[#f0f0f0]"
                                >
                                  {link.label} ↗
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <a
            href="https://github.com/gabboclaa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-[#8a8178] transition-colors hover:text-[#0f0f0f] dark:text-[#8a8a8a] dark:hover:text-[#f0f0f0] sm:hidden"
          >
            All on GitHub ↗
          </a>
        </div>
      </section>
    </>
  );
}
