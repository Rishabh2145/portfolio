"use client";

import { useReveal } from "./useReveal";

const projects = [
  {
    chapter: "03.A",
    title: "Chat-Sphere",
    subtitle: "Real-time Chat Platform",
    status: "Ongoing",
    description:
      "A real-time chat application featuring secure user authentication, instant messaging, and a responsive UI built for seamless cross-device communication. Engineered for scale and speed.",
    tech: ["NextJS", "Node.js", "Socket.io", "Firebase"],
    link: "#",
    icon: "💬",
    accent: "from-blue-900/20 to-indigo-900/10",
  },
  {
    chapter: "03.B",
    title: "Electricity Portal",
    subtitle: "Full-Stack Government Portal",
    status: "Completed",
    description:
      "A comprehensive full-stack web application for managing electricity connection services — featuring user login, complaint registration, bill generation, new connection requests, and a powerful admin panel for service management.",
    tech: ["HTML", "CSS", "SCSS", "JavaScript", "Node.js", "Express.js", "MySQL", "EJS"],
    link: "https://github.com/Rishabh2145/Internet-Web-Tech",
    icon: "⚡",
    accent: "from-yellow-900/20 to-amber-900/10",
  },
  {
    chapter: "03.C",
    title: "Vi-TrackFormer",
    subtitle: "Hybrid Deep Learning Framework",
    status: "Research",
    description:
      "A novel hybrid CNN + Vision Transformer framework developed at NIT Kurukshetra for joint cow behavior detection, tracking, and classification from video data. Supervised by Dr. Pratishtha Verma.",
    tech: ["Python", "YOLO", "Vision Transformers", "Deep Learning", "Data Science"],
    link: "#",
    icon: "🤖",
    accent: "from-green-900/20 to-emerald-900/10",
  },
  {
    chapter: "03.D",
    title: "HireHub: A Scalable Job Portal",
    subtitle: "Full-Stack Job Recruitment Website",
    status: "Completed",
    description:
      "HireHub is an efficient recruitment platform that connects employers with job seekers in one place. It allows companies to post job openings, manage applications, and track candidates, while enabling users to search for jobs, apply easily, and stay updated on their application status. Designed with a user-friendly interface, HireHub simplifies and speeds up the hiring process.",
    tech: ["Nextjs", "Node", "MongoDB", "Socket.IO", "JWT"],
    link: "https://job-portal-six-tan.vercel.app/",
    icon: "💼",
    accent: "from-red-900/20 to-rose-900/10",
  },
];

const statusColors: Record<string, string> = {
  Ongoing: "text-green-400 border-green-400/30",
  Completed: "text-gold border-gold/30",
  Research: "text-blue-400 border-blue-400/30",
};

export default function ProjectsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 chapter-reveal ${visible ? "visible" : ""}`}>
        <div className="chapter-number mb-6 flex items-center gap-4">
          <span>Chapter 03</span>
          <div className="h-px w-16 bg-gold/40" />
          <span>The Works</span>
        </div>

        <h2 className="font-serif text-5xl md:text-6xl font-bold text-parchment mb-4 leading-tight">
          Things I&apos;ve{" "}
          <em className="gold-gradient not-italic">built & shipped</em>
        </h2>
        <p className="text-fog font-sans mb-16 max-w-xl">
          Each project is a chapter — a problem identified, a solution engineered.
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.chapter}
              className={`project-card relative border border-gold/10 bg-gradient-to-br ${project.accent} p-8 group overflow-hidden`}
            >
              {/* Background chapter number */}
              <div className="absolute top-4 right-4 font-serif text-6xl font-black text-white/[0.03] select-none">
                {project.chapter.split(".")[1]}
              </div>

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{project.icon}</span>
                  <div className="font-mono text-xs text-gold/60 tracking-widest">
                    {project.chapter}
                  </div>
                </div>
                <span
                  className={`font-mono text-xs px-3 py-1 border ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-parchment mb-1 group-hover:text-gold transition-colors">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-gold/60 tracking-wide mb-4">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-fog font-sans text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="skill-pill font-mono text-xs text-fog px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-gold/70 hover:text-gold transition-colors tracking-widest uppercase"
                >
                  View Project
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
