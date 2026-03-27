"use client";

import { useEffect, useState } from "react";

const roles = [
  "Software Developer",
  "Full-Stack Engineer",
  "ML Researcher",
  "Problem Solver",
  "CSE Student @ NIT Srinagar",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-radial-hero" />
        {/* Diagonal lines decoration */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Large background text */}
        <div
          className="absolute bottom-10 right-0 font-serif text-[18vw] leading-none font-black text-white/[0.02] select-none pointer-events-none tracking-tighter"
        >
          RK
        </div>

        {/* Glowing orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Chapter label */}
        <div className="chapter-number mb-8 flex items-center gap-4">
          <span>Chapter 00</span>
          <div className="h-px w-16 bg-gold/40" />
          <span>Prologue</span>
        </div>

        {/* Greeting */}
        <p className="font-mono text-fog text-sm tracking-widest mb-4 uppercase">
          The story of
        </p>

        {/* Name */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-6">
          <span className="block text-parchment">Rishabh</span>
          <span className="block gold-gradient">Kumar</span>
        </h1>

        {/* Typewriter role */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-gold/60" />
          <p className="font-mono text-gold text-lg tracking-wide typewriter-cursor min-h-[1.5rem]">
            {displayed}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-fog text-lg max-w-xl leading-relaxed mb-12">
          A pre-final year CS student at{" "}
          <span className="text-parchment font-medium">National Institute of Technology Srinagar</span>, crafting
          scalable software, training neural networks, and turning ideas into
          products that matter.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-6">
          <a href="#projects" className="btn-primary">
            Read The Story
          </a>
          <a
            href="https://github.com/Rishabh2145"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-fog hover:text-gold transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rishabh21404/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-fog hover:text-gold transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fog/50">
        {/* <span className="font-mono text-xs tracking-widest uppercase">Scroll</span> */}
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
