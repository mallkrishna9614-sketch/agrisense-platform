'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Skip auth check for demo if token missing, we will just simulate dashboard
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('agri_token');
        setIsExiting(true);
        setTimeout(() => {
            router.push('/');
        }, 300);
    };

    if (!mounted) return null; // prevent hydration mismatch

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
                >
                    <motion.nav 
                        initial={{ y: -70 }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="glass-nav"
                        style={{
                            height: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 2rem',
                            position: 'sticky',
                            top: 0,
                            zIndex: 50
                        }}
                    >
                        <div style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-syne)' }}>
                            <motion.div
                                animate={{ boxShadow: ['0 0 0px var(--glow)', '0 0 20px var(--glow)', '0 0 0px var(--glow)'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    borderRadius: '50%'
                                }}
                            >
                                <Leaf size={24} />
                            </motion.div>
                            AgriSense
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                            Log Out
                        </button>
                    </motion.nav>

                    {/* Main Content */}
                    <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {children}
                    </main>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
