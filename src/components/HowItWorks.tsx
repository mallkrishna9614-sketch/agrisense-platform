'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  {
    num: '1',
    title: 'Enter field data',
    desc: 'Enter your farm location, soil data, and crops you are considering in minutes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
      </svg>
    ),
  },
  {
    num: '2',
    title: 'AI analyzes conditions',
    desc: 'Our models process dozens of climate, soil, and market signals to surface the best options.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    num: '3',
    title: 'Receive your crop plan',
    desc: 'Follow the season-by-season advisory plan and track your results on the live dashboard.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col items-center text-center relative z-10"
    >
      {/* Number Circle */}
      <motion.div
        animate={inView ? { scale: [0.8, 1.1, 1] } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        className="w-14 h-14 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-extrabold text-lg mb-5 shadow-[0_4px_20px_rgba(46,125,50,0.4)] font-[var(--font-syne)] relative"
      >
        {step.num}
        <span className="absolute inset-0 rounded-full bg-[#2e7d32] opacity-30 animate-ping" style={{ animationDelay: `${index * 0.5}s`, animationDuration: '2.5s' }} />
      </motion.div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center mb-4">
        {step.icon}
      </div>

      <h3 className="text-[1.05rem] font-bold text-[#1b2e1c] mb-2">{step.title}</h3>
      <p className="text-[0.875rem] text-[#4a6741] leading-relaxed max-w-[220px]">{step.desc}</p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-[#2e7d32] mb-3">How it works</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-extrabold text-[#1b2e1c] tracking-tight font-[var(--font-syne)] mb-3">
            Up and running in minutes
          </h2>
          <p className="text-[1rem] text-[#4a6741] max-w-md mx-auto">
            No complex setup. Connect your farm data and let the AI handle the rest.
          </p>
        </motion.div>

        <div ref={sectionRef} className="relative">
          {/* Connector line - desktop */}
          <div className="hidden md:block absolute top-7 left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-0.5 bg-[#e8f5e9] overflow-hidden rounded-full z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2e7d32] to-[#43a047] rounded-full"
              initial={{ width: '0%' }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <Step key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
