'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURES = [
  {
    title: 'Soil Intelligence',
    desc: 'Analyse soil composition, pH, and nutrient levels to recommend the perfect crop match.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Micro-climate Mapping',
    desc: 'Hyperlocal weather data fused with satellite imagery to map your field climate zones.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    title: 'Yield Predictions',
    desc: 'ML models trained on 10+ years of regional data deliver season-ahead yield forecasts.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    title: 'Market Insights',
    desc: 'Real-time commodity prices and demand signals so you sell at peak market value.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
    ),
  },
  {
    title: 'Pest & Disease Alerts',
    desc: 'Early-warning system that detects outbreaks using image recognition and risk models.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'AI Crop Advisor',
    desc: 'Chat with our agronomist AI for personalised guidance on planting, irrigation, and harvest timing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group bg-white border border-[#c8e6c9] rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(46,125,50,0.14)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] mb-4 group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-300">
        {feature.icon}
      </div>
      <h3 className="text-[1rem] font-bold text-[#1b2e1c] mb-2">{feature.title}</h3>
      <p className="text-[0.875rem] text-[#4a6741] leading-relaxed">{feature.desc}</p>
    </motion.article>
  );
}

export default function FeaturesGrid() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-24 bg-[#e8f5e9]" id="features">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-[#2e7d32] mb-3">Features</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-extrabold text-[#1b2e1c] tracking-tight leading-tight mb-3 font-[var(--font-syne)]">
            Everything your farm needs
          </h2>
          <p className="text-[1rem] text-[#4a6741] max-w-md leading-relaxed">
            From soil to market, every decision is backed by real-time AI insights — all in one platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
