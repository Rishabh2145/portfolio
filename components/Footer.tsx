export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-fog/50 tracking-widest">
          © {new Date().getFullYear()} · Rishabh Kumar · All Rights Reserved
        </div>
        <div className="font-serif italic text-fog/40 text-sm">
          &ldquo;Built with curiosity, deployed with pride.&rdquo;
        </div>
        <div className="font-mono text-xs text-fog/50 tracking-widest">
          Software Developer | ML Enthusiast | NIT Srinagar
        </div>
      </div>
    </footer>
  );
}
