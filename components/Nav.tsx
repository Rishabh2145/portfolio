"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Prologue", href: "#hero" },
  { label: "Journey", href: "#experience" },
  { label: "Works", href: "#projects" },
  { label: "Arsenal", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-serif text-xl text-gold tracking-wide hover:text-gold-light transition-colors"
        >
          Rishabh Kumar<span className="text-fog text-sm font-mono">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link font-mono text-xs tracking-widest uppercase text-fog hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:rishabrbl2005@gmail.com"
          className="hidden md:block btn-primary text-xs"
        >
          Hire Me
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gold p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-px bg-gold transition-all ${menuOpen ? "rotate-45 translate-y-px" : ""}`} />
          <div className={`w-6 h-px bg-gold mt-1.5 transition-all ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur-md border-t border-gold/10 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-widest uppercase text-fog hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
