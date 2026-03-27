"use client";

import { useReveal } from "./useReveal";

const stats = [
  { value: "9.05", label: "CGPA", unit: "/10" },
  { value: "5+", label: "Projects Built", unit: "" },
  { value: "2", label: "Internships", unit: "" },
  { value: "2027", label: "Graduation", unit: "" },
];

export default function AboutSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-gradient-to-b from-transparent via-gold to-transparent" />

      <div ref={ref} className={`max-w-6xl mx-auto px-6 chapter-reveal ${visible ? "visible" : ""}`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="chapter-number mb-6 flex items-center gap-4">
              <span>Chapter 01</span>
              <div className="h-px w-16 bg-gold/40" />
              <span>The Origin</span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl font-bold text-parchment mb-6 leading-tight">
              The person{" "}
              <em className="gold-gradient not-italic">behind the code</em>
            </h2>

            <div className="space-y-4 text-fog leading-relaxed font-sans text-base">
              <p>
                Every great story starts somewhere. Mine began with curiosity —
                a relentless need to understand how things work, then build them
                better.
              </p>
              <p>
                I&apos;m Rishabh, a third-year Computer Science student at{" "}
                <span className="text-parchment">
                  National Institute of Technology, Srinagar
                </span>
                , where I&apos;ve channeled that curiosity into real products,
                published research, and scalable systems.
              </p>
              <p>
                When I&apos;m not pushing commits, I&apos;m exploring the
                intersection of{" "}
                <span className="text-gold">deep learning</span> and{" "}
                <span className="text-gold">computer vision</span> — or
                designing full-stack websites that are of production levels.
              </p>
            </div>

            <div className="mt-8">
              <a href="#contact" className="btn-primary inline-block">
                Start a Conversation
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-gold/10 bg-white/[0.02] p-6 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="font-serif text-4xl font-black gold-gradient mb-1">
                  {stat.value}
                  <span className="text-lg text-gold/60">{stat.unit}</span>
                </div>
                <div className="font-mono text-xs tracking-widest text-fog uppercase">
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Education card */}
            <div className="col-span-2 border border-gold/10 bg-white/[0.02] p-6 hover:border-gold/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-gold tracking-widest uppercase mb-1">
                    B.Tech · 2023–2027
                  </div>
                  <div className="font-serif text-parchment font-semibold">
                    National Institute of Technology Srinagar
                  </div>
                  <div className="font-sans text-fog text-sm mt-1">
                    Computer Science and Engineering
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 border border-gold/10 bg-white/[0.02] p-6 hover:border-gold/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-gold tracking-widest uppercase mb-1">
                    Schooling 2010-2022
                  </div>
                  <div className="font-serif text-parchment font-semibold">
                    Kendriya Vidyalaya Raebareli 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
