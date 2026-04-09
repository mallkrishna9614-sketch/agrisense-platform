const LeafSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const NAV_LINKS = ['Features', 'How it works', 'Pricing', 'About'];

export default function Footer() {
  return (
    <footer className="border-t border-[#c8e6c9] bg-white py-6" id="about">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <span className="w-8 h-8 bg-[#2e7d32] rounded-lg flex items-center justify-center flex-shrink-0">
              <LeafSVG />
            </span>
            <span className="font-bold text-[1.05rem] font-[var(--font-syne)]">
              <span className="text-[#1b2e1c]">Agri</span>
              <span className="text-[#2e7d32]">Sense</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="text-[0.85rem] text-[#4a6741] hover:text-[#2e7d32] no-underline transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[0.8rem] text-[#4a6741]">© 2025 AgriSense AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
