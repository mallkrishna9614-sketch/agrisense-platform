'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AuthCard from '@/components/AuthCard';

export default function AuthSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-[#e8f5e9]" id="get-started">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-[#2e7d32] mb-3">Get started</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-extrabold text-[#1b2e1c] tracking-tight font-[var(--font-syne)] mb-3">
            Join 12,000+ farmers
          </h2>
          <p className="text-[1rem] text-[#4a6741] max-w-sm mx-auto">
            Create a free account and get your first crop report in under 5 minutes.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AuthCard />
        </motion.div>
      </div>
    </section>
  );
}
