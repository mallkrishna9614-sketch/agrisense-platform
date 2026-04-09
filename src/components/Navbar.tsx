'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LeafSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(46,125,50,0.10)] border-b border-green-mid'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 no-underline group">
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 bg-[#2e7d32] rounded-lg flex items-center justify-center shadow-sm"
          >
            <LeafSVG />
          </motion.span>
          <span className="font-bold text-[1.1rem] tracking-tight font-[var(--font-syne)]">
            <span className="text-[#1b2e1c]">Agri</span>
            <span className="text-[#2e7d32]">Sense</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.9rem] font-medium text-[#4a6741] hover:text-[#2e7d32] transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#get-started"
          id="navbar-cta-btn"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#2e7d32] text-white text-[0.88rem] font-semibold rounded-lg hover:bg-[#1a4d20] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md no-underline"
        >
          Get started free
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-[#2e7d32]"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-[#c8e6c9] px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[0.9rem] font-medium text-[#4a6741] no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            className="mt-2 px-5 py-2.5 bg-[#2e7d32] text-white text-[0.88rem] font-semibold rounded-lg text-center no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Get started free
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
