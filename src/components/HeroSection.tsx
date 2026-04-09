'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 94, suffix: '%', label: 'Prediction Accuracy' },
  { value: 3.2, suffix: 'x', label: 'Avg Profit Increase', isDecimal: true },
  { value: 12, suffix: 'k+', label: 'Farmers Onboarded' },
];

const SOIL_BARS = [
  { label: 'Nitrogen', value: 78, color: '#2e7d32' },
  { label: 'Phosphorus', value: 62, color: '#43a047' },
  { label: 'Moisture', value: 85, color: '#1a4d20' },
];

const CROP_CARDS = [
  { name: 'Wheat', icon: '🌾', score: 97, tag: 'Best Match' },
  { name: 'Maize', icon: '🌽', score: 91, tag: 'Recommended' },
  { name: 'Soybean', icon: '🫘', score: 84, tag: 'Good Fit' },
];

function CountUp({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

function SoilBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-3">
      {SOIL_BARS.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-[#1b2e1c]">{bar.label}</span>
            <span className="text-[#2e7d32] font-bold">{bar.value}%</span>
          </div>
          <div className="h-2 bg-[#e8f5e9] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: bar.color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${bar.value}%` } : {}}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [activeCrop, setActiveCrop] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 pb-16"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${6 + (i % 5) * 4}px`,
              height: `${6 + (i % 5) * 4}px`,
              background: i % 3 === 0 ? '#2e7d32' : i % 3 === 1 ? '#43a047' : '#c8e6c9',
              left: `${5 + (i * 17) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
            }}
            animate={{
              y: [0, -30 - (i % 3) * 15, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Radial green glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-[#e8f5e9] via-transparent to-transparent opacity-60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1160px] mx-auto px-6 w-full relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5e9] border border-[#c8e6c9] rounded-full text-sm font-semibold text-[#2e7d32] mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#2e7d32]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Next-gen AgTech
            <span className="px-1.5 py-0.5 bg-[#2e7d32] text-white text-[0.65rem] font-bold rounded tracking-wider">
              LIVE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1b2e1c] mb-6 font-[var(--font-syne)]"
          >
            Grow smarter,{' '}
            <span className="relative inline-block text-[#2e7d32]">
              yield better.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 6 Q75 1 150 5 Q225 9 298 4"
                  stroke="#43a047"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="400"
                  initial={{ strokeDashoffset: 400 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[1.05rem] leading-[1.75] text-[#4a6741] max-w-[520px] mx-auto mb-10"
          >
            AgriSense uses satellite data, soil science, and machine learning to give every farmer a precision edge — no agronomy degree required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center justify-center gap-4 flex-wrap mb-14"
          >
            <a
              href="#get-started"
              id="hero-start-btn"
              className="group px-7 py-3.5 bg-[#2e7d32] text-white text-[0.95rem] font-semibold rounded-xl hover:bg-[#1a4d20] active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(46,125,50,0.35)] hover:shadow-[0_8px_28px_rgba(46,125,50,0.45)] no-underline flex items-center gap-2"
            >
              Start for free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#how-it-works"
              id="hero-demo-btn"
              className="px-7 py-3.5 bg-white text-[#2e7d32] text-[0.95rem] font-semibold rounded-xl border-2 border-[#c8e6c9] hover:border-[#2e7d32] hover:bg-[#e8f5e9] active:scale-95 transition-all duration-200 no-underline flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Watch demo
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center items-stretch border border-[#c8e6c9] rounded-2xl overflow-hidden max-w-[520px] mx-auto mb-16 bg-white shadow-sm"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 py-5 px-4 text-center ${i < STATS.length - 1 ? 'border-r border-[#c8e6c9]' : ''}`}
              >
                <div className="text-[1.9rem] font-extrabold text-[#2e7d32] leading-none mb-1 font-[var(--font-syne)]">
                  <CountUp target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                </div>
                <div className="text-[0.72rem] text-[#4a6741] font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Live Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#c8e6c9] shadow-[0_16px_64px_rgba(46,125,50,0.12)] p-6 md:p-8"
        >
          {/* Card header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 h-7 bg-[#e8f5e9] rounded-lg px-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
              <span className="text-xs text-[#4a6741] font-medium">agrisense.ai/soil-analysis</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Soil Analysis */}
            <div>
              <h3 className="text-sm font-bold text-[#1b2e1c] mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12m0 0a4 4 0 0 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 12c-4 0-8 2-8 6"/>
                </svg>
                Soil Nutrient Analysis
              </h3>
              <SoilBars />
              <div className="mt-4 flex items-center gap-2 py-2 px-3 bg-[#e8f5e9] rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#43a047] animate-pulse" />
                <span className="text-xs text-[#2e7d32] font-semibold">Live sensor data · Updated 2s ago</span>
              </div>
            </div>

            {/* Crop Cards */}
            <div>
              <h3 className="text-sm font-bold text-[#1b2e1c] mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
                AI Crop Recommendations
              </h3>
              <div className="space-y-2.5">
                {CROP_CARDS.map((crop, i) => (
                  <button
                    key={crop.name}
                    id={`crop-card-${crop.name.toLowerCase()}`}
                    onClick={() => setActiveCrop(i)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                      activeCrop === i
                        ? 'border-[#2e7d32] bg-[#e8f5e9] shadow-sm'
                        : 'border-[#e8f5e9] hover:border-[#c8e6c9] bg-white'
                    }`}
                  >
                    <span className="text-xl">{crop.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#1b2e1c]">{crop.name}</div>
                      <div className="text-xs text-[#4a6741]">{crop.tag}</div>
                    </div>
                    <div className={`text-sm font-extrabold ${activeCrop === i ? 'text-[#2e7d32]' : 'text-[#4a6741]'}`}>
                      {crop.score}%
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
