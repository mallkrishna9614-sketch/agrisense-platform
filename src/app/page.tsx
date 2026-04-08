import type { Metadata } from 'next';
import AuthCard from '@/components/AuthCard';

export const metadata: Metadata = {
    title: 'AgriSense AI — Grow smarter, yield better',
    description: 'AI-driven crop advisory platform trusted by 12,000+ farmers. 94% prediction accuracy. 3.2x profit increase.',
};

const LeafIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
);

const features = [
    {
        title: 'Soil intelligence',
        desc: 'Analyse soil composition, pH, and nutrient levels to recommend the perfect crop match.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
            </svg>
        ),
    },
    {
        title: 'Micro-climate mapping',
        desc: 'Hyperlocal weather data fused with satellite imagery to map your field climate zones.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
            </svg>
        ),
    },
    {
        title: 'Yield predictions',
        desc: 'ML models trained on 10+ years of regional data deliver season-ahead yield forecasts.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
            </svg>
        ),
    },
    {
        title: 'Market insights',
        desc: 'Real-time commodity prices and demand signals so you sell at peak market value.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
        ),
    },
    {
        title: 'Pest and disease alerts',
        desc: 'Early-warning system that detects outbreaks using image recognition and regional risk models.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        ),
    },
    {
        title: 'AI crop advisor',
        desc: 'Chat with our agronomist AI for personalised guidance on planting, irrigation, and harvest timing.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        ),
    },
];

const steps = [
    {
        num: '1',
        title: 'Connect your farm',
        desc: 'Enter your farm location, soil data, and crops you are considering in minutes.',
    },
    {
        num: '2',
        title: 'Get AI analysis',
        desc: 'Our models process dozens of signals to surface the highest-value crop options.',
    },
    {
        num: '3',
        title: 'Grow with confidence',
        desc: 'Follow the season-by-season advisory plan and track your results on the dashboard.',
    },
];

export default function Home() {
    return (
        <>
            {/* ── Navbar ─────────────────────────────────────────── */}
            <header className="navbar">
                <div className="container navbar-inner">
                    <a href="/" className="navbar-logo">
                        <span className="navbar-logo-icon"><LeafIcon /></span>
                        AgriSense
                    </a>

                    <nav aria-label="Main navigation">
                        <ul className="navbar-links">
                            <li><a href="#features">Features</a></li>
                            <li><a href="#how-it-works">How it works</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </nav>

                    <a href="#get-started" className="btn btn-primary">Get started</a>
                </div>
            </header>

            <main>
                {/* ── Hero ───────────────────────────────────────── */}
                <section className="hero" aria-labelledby="hero-headline">
                    <div className="container">
                        <div className="hero-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            Next-gen AgTech platform
                        </div>

                        <h1 className="hero-headline" id="hero-headline">
                            Grow smarter,{' '}
                            <span className="green">yield better.</span>
                        </h1>

                        <p className="hero-subtitle">
                            AgriSense uses satellite data, soil science, and machine learning to give every farmer a precision edge — no agronomy degree required.
                        </p>

                        <div className="hero-ctas">
                            <a href="#get-started" className="btn btn-primary btn-lg">Start for free</a>
                            <a href="#how-it-works" className="btn btn-outline btn-lg">See how it works</a>
                        </div>

                        <div className="hero-stats" role="list" aria-label="Platform statistics">
                            <div className="hero-stat" role="listitem">
                                <div className="hero-stat-value">94%</div>
                                <div className="hero-stat-label">Prediction accuracy</div>
                            </div>
                            <div className="hero-stat" role="listitem">
                                <div className="hero-stat-value">3.2x</div>
                                <div className="hero-stat-label">Profit increase</div>
                            </div>
                            <div className="hero-stat" role="listitem">
                                <div className="hero-stat-value">12k+</div>
                                <div className="hero-stat-label">Farmers trust us</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Features ───────────────────────────────────── */}
                <section className="section section-alt" id="features" aria-labelledby="features-title">
                    <div className="container">
                        <p className="section-label">Features</p>
                        <h2 className="section-title" id="features-title">Everything your farm needs</h2>
                        <p className="section-sub">
                            From soil to market, every decision is backed by real-time AI insights — all in one platform.
                        </p>

                        <div className="features-grid">
                            {features.map((f) => (
                                <article className="feature-card" key={f.title}>
                                    <div className="feature-icon-wrap" aria-hidden="true">{f.icon}</div>
                                    <h3 className="feature-title">{f.title}</h3>
                                    <p className="feature-desc">{f.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── How it works ───────────────────────────────── */}
                <section className="section" id="how-it-works" aria-labelledby="how-title">
                    <div className="container">
                        <p className="section-label">How it works</p>
                        <h2 className="section-title" id="how-title">Up and running in minutes</h2>
                        <p className="section-sub">
                            No complex setup. Connect your farm data and let the AI handle the rest.
                        </p>

                        <div className="steps-row">
                            {steps.map((s) => (
                                <div className="step" key={s.num}>
                                    <div className="step-num" aria-hidden="true">{s.num}</div>
                                    <h3 className="step-title">{s.title}</h3>
                                    <p className="step-desc">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Auth ───────────────────────────────────────── */}
                <section className="auth-section" id="get-started" aria-labelledby="auth-title">
                    <div className="container">
                        <p className="section-label" style={{ textAlign: 'center' }}>Get started</p>
                        <h2 className="section-title" id="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                            Join 12,000+ farmers
                        </h2>
                        <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 2.5rem' }}>
                            Create a free account and get your first crop report in under 5 minutes.
                        </p>
                        <AuthCard />
                    </div>
                </section>
            </main>

            {/* ── Footer ─────────────────────────────────────────── */}
            <footer className="footer" id="about">
                <div className="container footer-inner">
                    <a href="/" className="navbar-logo" style={{ fontSize: '1rem' }}>
                        <span className="navbar-logo-icon"><LeafIcon /></span>
                        AgriSense
                    </a>
                    <p className="footer-copy">2025 AgriSense AI. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
