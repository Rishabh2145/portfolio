"use client";

import { useReveal } from "./useReveal";

const experiences = [
  {
    chapter: "02.A",
    role: "Full-Stack Intern",
    company: "Zonvoir Technologies Pvt. Ltd.",
    location: "Lucknow",
    period: "Dec 2025 – Feb 2026",
    type: "Industry",
    description:
      "Developed and maintained full-stack web applications, contributing to both frontend and backend feature implementation. Collaborated with cross-functional teams to deliver efficient and scalable solutions that serve real users.",
    tags: ["Full-Stack", "Nextjs", "MongoDB", "Node.js", "Team Collaboration"],
    icon: "⚡",
  },
  {
    chapter: "02.B",
    role: "Research Intern",
    company: "National Institute of Technology",
    location: "Kurukshetra",
    period: "Jan 2025 – Feb 2025",
    type: "Research",
    description:
      "Worked on Cattle Behavior Analysis under Dr. Pratishtha Verma in Deep Learning and Data Science. Developed Vi-TrackFormer — a hybrid CNN + Vision Transformer framework for joint cow behavior detection, tracking, and classification from video data.",
    tags: ["Deep Learning", "YOLO", "Vision Transformers", "Python", "Data Science"],
    icon: "🧠",
  },
];

export default function ExperienceSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div ref={ref} className={`max-w-6xl mx-auto px-6 chapter-reveal ${visible ? "visible" : ""}`}>
        <div className="chapter-number mb-6 flex items-center gap-4">
          <span>Chapter 02</span>
          <div className="h-px w-16 bg-gold/40" />
          <span>The Journey</span>
        </div>

        <h2 className="font-serif text-5xl md:text-6xl font-bold text-parchment mb-4 leading-tight">
          Where the story{" "}
          <em className="gold-gradient not-italic">took shape</em>
        </h2>
        <p className="text-fog font-sans mb-16 max-w-xl">
          Every chapter of growth happens in the field — here&apos;s where I&apos;ve been.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={exp.chapter}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 bg-gold rounded-full shadow-lg shadow-gold/40 z-10" />

                {/* Date label for desktop */}
                <div
                  className={`hidden md:flex items-start justify-end w-1/2 pt-4 ${
                    i % 2 === 0 ? "pr-12 text-right" : "pl-12 flex-row-reverse text-left"
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs text-gold tracking-widest uppercase">
                      {exp.period}
                    </span>
                    <div className="font-mono text-xs text-fog tracking-wide mt-1 uppercase">
                      {exp.type}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  <div className="border border-gold/10 bg-white/[0.02] p-8 hover:border-gold/25 transition-all duration-400 group">
                    {/* Mobile period */}
                    <div className="md:hidden font-mono text-xs text-gold tracking-widest uppercase mb-3">
                      {exp.period}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-2xl">{exp.icon}</span>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-parchment group-hover:text-gold transition-colors">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs text-gold/80 tracking-wide mt-1">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-fog font-sans text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="skill-pill font-mono text-xs text-fog px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
