"use client";

import { useReveal } from "./useReveal";

const skillGroups = [
  {
    category: "Languages",
    icon: "{ }",
    skills: ["C++", "C", "JavaScript", "Python",, "Java", "MySQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    icon: "◻",
    skills: ["React", "NextJS", "Bootstrap", "SCSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "⚙",
    skills: ["Node.js", "Express.js", "Socket.io", "Firebase", "EJS", "Nodemailer"],
  },
  {
    category: "ML / AI",
    icon: "◈",
    skills: ["YOLO", "Vision Transformers", "CNN", "Deep Learning", "Data Science"],
  },
  {
    category: "Tools & Hardware",
    icon: "◉",
    skills: ["GitHub", "Arduino", "Unity", "MySQL", "PID Control"],
  },
];

export default function SkillsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div ref={ref} className={`max-w-6xl mx-auto px-6 chapter-reveal ${visible ? "visible" : ""}`}>
        <div className="chapter-number mb-6 flex items-center gap-4">
          <span>Chapter 04</span>
          <div className="h-px w-16 bg-gold/40" />
          <span>The Arsenal</span>
        </div>

        <h2 className="font-serif text-5xl md:text-6xl font-bold text-parchment mb-4 leading-tight">
          Tools of the{" "}
          <em className="gold-gradient not-italic">trade</em>
        </h2>
        <p className="text-fog font-sans mb-16 max-w-xl">
          Every craftsman knows their tools. Here&apos;s what&apos;s in my workshop.
        </p>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="border border-gold/10 bg-white/[0.02] p-6 hover:border-gold/25 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-gold text-lg">{group.icon}</span>
                <h3 className="font-mono text-xs tracking-widest text-gold uppercase">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill font-mono text-xs text-fog px-3 py-1.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-20 border-l-2 border-gold/40 pl-8 py-2">
          <blockquote className="font-serif text-xl text-parchment/60 italic leading-relaxed">
            &ldquo;The more I learn, the more I realize how much more there is to learn.&rdquo;
          </blockquote>
          <cite className="font-mono text-xs text-gold/60 tracking-widest uppercase mt-3 block">
            — A principle I live by
          </cite>
        </div>
      </div>
    </section>
  );
}
