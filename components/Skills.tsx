"use client";

import { useState } from "react";

const skillGroups = [
  {
    category: "Languages",
    skills: ["Python", "C", "C++", "Java", "Zig", "MATLAB"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Databases",
    skills: ["SQL", "MongoDB", "Neo4j", "Cassandra", "Redis", "ElasticSearch"],
  },
  {
    category: "Libraries",
    skills: ["TensorFlow", "Keras", "NumPy", "Pandas"],
  },
  {
    category: "Tooling & Infra",
    skills: ["Git", "Linux", "Apache Kafka", "Apache Spark"],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] bg-[#f3e7db] dark:bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-6 md:px-20 py-24">
        <p className="font-mono text-xs text-[#9a9a9a] uppercase tracking-widest mb-3">
          Tech stack
        </p>
        <h2 className="text-3xl font-medium text-[#0f0f0f] dark:text-[#f0f0f0] tracking-tight mb-14">
          Skills
        </h2>

        {/* Mobile: tab layout */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {skillGroups.map((group, i) => (
              <button
                key={group.category}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 font-mono text-xs px-3 py-1 rounded-full border transition-colors ${
                  activeTab === i
                    ? "border-[#bd864b] text-[#bd864b]"
                    : "border-[#e5e5e5] dark:border-[#2a2a2a] text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0]"
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {skillGroups[activeTab].skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs border border-[#e5e5e5] dark:border-[#2a2a2a] px-2 py-1 rounded text-[#6b6b6b] dark:text-[#9a9a9a]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8">
          {skillGroups.map(({ category, skills }) => (
            <div key={category}>
              <h3 className="text-xs font-mono text-[#9a9a9a] uppercase tracking-widest mb-5 pb-3 border-b border-[#e5e5e5] dark:border-[#1a1a1a]">
                {category}
              </h3>
              <ul className="space-y-3">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-[#0f0f0f] dark:text-[#c0c0c0]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#bd864b] shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
