'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthForm from '@/components/AuthForm';

const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(progress * end);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count % 1 === 0 ? count : count.toFixed(1)}{suffix}</span>;
};

export default function Home() {
    return (
        <motion.main 
            className="page-enter-active"
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.28 } }}
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '2rem', justifyItems: 'center', position: 'relative', overflow: 'hidden' }}
        >

            {/* Floating Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 6 + 2 + 'px',
                        height: Math.random() * 6 + 2 + 'px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '50%',
                        left: Math.random() * 100 + 'vw',
                        top: Math.random() * 100 + 'vh',
                        opacity: 0.2,
                        animation: `ptFloat ${Math.random() * 5 + 5}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}

            {/* Radial Glows */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '40vw',
                height: '40vw',
                background: 'radial-gradient(circle, var(--glow-strong) 0%, transparent 70%)',
                zIndex: -1,
                filter: 'blur(80px)',
                animation: 'breathe 8s ease-in-out infinite alternate',
            }} />

            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '25%',
                width: '30vw',
                height: '30vw',
                background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
                zIndex: -1,
                filter: 'blur(60px)',
                animation: 'breathe 6s ease-in-out infinite alternate-reverse',
            }} />

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 1fr)', gap: '6rem', alignItems: 'center' }}>

                {/* Left Side: Hero Copy */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'rgba(76, 175, 101, 0.1)',
                        color: 'var(--accent)',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(76, 175, 101, 0.2)'
                    }}>
                        🌱 Next-Gen AgTech
                    </div>
                    
                    <h1 className="heading-1" style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        Grow Smarter, <br />
                        <span style={{ color: 'var(--primary)', position: 'relative', display: 'inline-block' }}>
                            Yield Better.
                            <motion.span 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    bottom: '0.1em',
                                    left: 0,
                                    height: '0.12em',
                                    background: 'var(--accent)',
                                    borderRadius: '4px',
                                    zIndex: -1,
                                    opacity: 0.5
                                }}
                            />
                        </span>
                    </h1>
                    
                    <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px' }}>
                        Unleash AI-driven analytics to determine the optimal crop for your unique soil and micro-climate.
                    </p>

                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-syne)', color: 'var(--accent)' }}>
                                <CountUp end={94} suffix="%" />
                            </span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Prediction Accuracy</span>
                        </div>
                        <div style={{ width: '1px', background: 'var(--border)' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-syne)', color: 'var(--accent)' }}>
                                <CountUp end={2.4} suffix="x" />
                            </span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avg Profit Increase</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Auth Form */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AuthForm />
                </div>

            </div>
        </motion.main>
    );
}
