'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </div>
    </AnimatePresence>
  );
}
