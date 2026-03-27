"use client";

import { useReveal } from "./useReveal";
import { useState } from "react";

const socials = [
  {
    label: "Email",
    value: "rishabrbl2005@gmail.com",
    href: "mailto:rishabrbl2005@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "rishabh21404",
    href: "https://www.linkedin.com/in/rishabh21404/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "Rishabh21404",
    href: "https://github.com/Rishabh2145",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 9264968987",
    href: "tel:+919264968987",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const { ref, visible } = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("rishabrbl2005@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div ref={ref} className={`max-w-6xl mx-auto px-6 chapter-reveal ${visible ? "visible" : ""}`}>
        <div className="chapter-number mb-6 flex items-center gap-4">
          <span>Chapter 05</span>
          <div className="h-px w-16 bg-gold/40" />
          <span>The Connection</span>
        </div>

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-parchment mb-6 leading-tight">
            Let&apos;s write the{" "}
            <em className="gold-gradient not-italic">next chapter</em>{" "}
            together
          </h2>
          <p className="text-fog font-sans leading-relaxed">
            Whether it&apos;s an internship opportunity, a collaboration on something
            exciting, or just a conversation about tech — I&apos;m always open.
            Stories are better when written together.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 border border-gold/10 bg-white/[0.02] p-6 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
            >
              <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold group-hover:border-gold/60 transition-colors flex-shrink-0">
                {social.icon}
              </div>
              <div>
                <div className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-1">
                  {social.label}
                </div>
                <div className="font-sans text-parchment text-sm group-hover:text-gold transition-colors">
                  {social.value}
                </div>
              </div>
              <div className="ml-auto text-fog/30 group-hover:text-gold/60 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-6">
          <button onClick={copyEmail} className="btn-primary">
            {copied ? "✓ Copied!" : "Copy Email"}
          </button>
          <a
            href="mailto:rishabrbl2005@gmail.com"
            className="font-mono text-xs tracking-widest uppercase text-fog hover:text-gold transition-colors"
          >
            Or send a message →
          </a>
        </div>
      </div>
    </section>
  );
}
