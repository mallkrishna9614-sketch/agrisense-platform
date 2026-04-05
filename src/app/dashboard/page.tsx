'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Droplet, Thermometer, CloudRain, MapPin, Leaf, Wind, ExternalLink, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';

const ANALYSIS_STEPS = [
    "Detecting GPS location...",
    "Fetching weather data...",
    "Analyzing soil profile...",
    "Running AI model...",
    "Finalizing results..."
];

export default function DashboardPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [soilType, setSoilType] = useState('LOAMY');
    const [landSize, setLandSize] = useState('5');
    const [season, setSeason] = useState('Kharif');
    const [irrigation, setIrrigation] = useState('Rainfed');
    
    const [analyzing, setAnalyzing] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [farms, setFarms] = useState<any[]>([]);

    useEffect(() => {
        // Fetch farms if available
        // Mocking for demo as requested
        setFarms([
            { id: '1', name: 'Analysis Feb 12', soilType: 'LOAMY', landSizeAcres: 5, latitude: 20.1, longitude: 79.1, recommendations: [{ recommendedCrop: 'GROUNDNUT' }] }
        ]);
    }, []);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setStepIndex(0);

        // Sequence steps every 560ms
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < ANALYSIS_STEPS.length) {
                setStepIndex(currentStep);
            } else {
                clearInterval(interval);
            }
        }, 560);

        // Disappear after 3.2s
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                crop: 'GROUNDNUT',
                match: 94,
                weather: { temp: 28, rain: 45, hum: 60, wind: 12 },
                alternatives: [
                    { name: 'COTTON', match: 88 },
                    { name: 'MAIZE', match: 82 },
                    { name: 'SOYBEAN', match: 75 }
                ]
            });
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }, 3200);
    };

    const handleSave = () => {
        toast('Analysis saved 💾', 'success');
        // Fake save logic
    };

    const handleDelete = (e: any) => {
        e.stopPropagation();
        toast('Plot deleted', 'error');
    };

    const handleNavigateToCrop = (cropName: string) => {
        router.push(`/dashboard/crop/${cropName.toLowerCase()}`);
    };

    return (
        <motion.div 
            className="page-enter-active"
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.28 } }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            {/* Analyzing Overlay */}
            <AnimatePresence>
                {analyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: 'var(--background)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                            <Loader2 size={48} color="var(--primary)" />
                        </motion.div>
                        <motion.h3 
                            key={stepIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ marginTop: '2rem', fontSize: '1.5rem', fontFamily: 'var(--font-syne)', color: 'var(--foreground)' }}
                        >
                            {ANALYSIS_STEPS[stepIndex]}
                        </motion.h3>
                        <div style={{ marginTop: '2rem', width: '300px', height: '4px', background: 'var(--surface-light)', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div 
                                initial={{ width: '0%' }}
                                animate={{ width: `${((stepIndex + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                                style={{ height: '100%', background: 'var(--primary)' }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header style={{
                position: 'relative',
                padding: '5rem 2rem 7rem',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', inset: 0, zIndex: -1,
                    background: 'linear-gradient(rgba(8,13,8,0.8), rgba(8,13,8,0.95)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80") center/cover',
                    animation: 'bgZoom 20s infinite alternate'
                }} />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h1 className="heading-1" style={{ marginBottom: '1rem' }}>
                        Data-driven crop decisions powered by <br/>
                        <span className="animate-shimmer-text text-gradient">real-time weather</span>
                    </h1>
                </motion.div>

                {/* Weather Strip */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex', gap: '1px', background: 'var(--border)', padding: '1px', borderRadius: 'var(--radius-full)',
                        marginTop: '2rem'
                    }}
                >
                    {[
                        { icon: Thermometer, val: '26°C', col: '#ef4444' },
                        { icon: CloudRain, val: '45mm', col: '#3b82f6' },
                        { icon: Droplet, val: '60%', col: '#0ea5e9' },
                        { icon: Wind, val: '12km/h', col: '#a8a29e' }
                    ].map((w, i) => (
                        <div key={i} style={{
                            background: 'rgba(12,18,12,0.8)', backdropFilter: 'blur(10px)',
                            padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                            borderTopLeftRadius: i === 0 ? 'var(--radius-full)' : 0,
                            borderBottomLeftRadius: i === 0 ? 'var(--radius-full)' : 0,
                            borderTopRightRadius: i === 3 ? 'var(--radius-full)' : 0,
                            borderBottomRightRadius: i === 3 ? 'var(--radius-full)' : 0,
                        }}>
                            <w.icon size={18} color={w.col} />
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{w.val}</span>
                        </div>
                    ))}
                </motion.div>
            </header>

            <main className="container" style={{ flex: 1, marginTop: '-3rem', position: 'relative', zIndex: 10, paddingBottom: '4rem' }}>
                {/* Analyze Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', textAlign: 'center', transform: 'translateY(-40px)', background: 'var(--surface)' }}
                >
                    <div style={{ marginBottom: '2rem' }}>
                        <div className="spin-in" style={{ width: '64px', height: '64px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
                            <Leaf size={32} />
                        </div>
                        <h2 className="heading-2" style={{ marginBottom: '0.25rem' }}>Analyze Farm Profile</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
                        <div className="input-group">
                            <label>Soil Type</label>
                            <select className="input-field" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                                <option value="LOAMY">Loamy</option>
                                <option value="CLAY">Clay</option>
                                <option value="SANDY">Sandy</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Size (Acres)</label>
                            <input type="number" min="0.1" step="0.1" className="input-field" value={landSize} onChange={(e) => setLandSize(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Season</label>
                            <select className="input-field" value={season} onChange={(e) => setSeason(e.target.value)}>
                                <option value="Kharif">Kharif</option>
                                <option value="Rabi">Rabi</option>
                                <option value="Zaid">Zaid</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Irrigation Level</label>
                            <select className="input-field" value={irrigation} onChange={(e) => setIrrigation(e.target.value)}>
                                <option value="Rainfed">Rainfed</option>
                                <option value="Irrigated">Irrigated</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={handleAnalyze} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
                        <MapPin size={20} />
                        Run AI Analysis
                    </button>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                
                                {/* Top Recommendation */}
                                <div className="card" onClick={() => handleNavigateToCrop(result.crop)} style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', animation: 'cropAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                                        {result.crop}
                                    </h3>
                                    
                                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
                                            <motion.circle 
                                                cx="60" cy="60" r="54" fill="none" stroke="var(--accent)" strokeWidth="8"
                                                strokeDasharray="339.29"
                                                initial={{ strokeDashoffset: 339.29 }}
                                                animate={{ strokeDashoffset: 339.29 - (339.29 * result.match) / 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{result.match}%</span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Match</span>
                                        </div>
                                    </div>

                                    <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className="btn btn-outline" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>Save Analysis</button>

                                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Buy {result.crop} Seeds</span>
                                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            <a href={`https://www.amazon.com/s?k=${result.crop}+seeds`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); toast('Opening Amazon...', 'info'); }}>
                                                Amazon <ExternalLink size={14} />
                                            </a>
                                            <a href={`https://www.flipkart.com/search?q=${result.crop}+seeds`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); toast('Opening Flipkart...', 'info'); }}>
                                                Flipkart <ExternalLink size={14} />
                                            </a>
                                            <a href={`https://dir.indiamart.com/search.mp?ss=${result.crop}+seeds`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); toast('Opening IndiaMart...', 'info'); }}>
                                                IndiaMart <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Climate Context */}
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Climate Conditions</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {[
                                            { label: 'Temperature', val: result.weather.temp, target: 40, col: '#ef4444', suf: '°C' },
                                            { label: 'Rainfall', val: result.weather.rain, target: 100, col: '#3b82f6', suf: 'mm' },
                                            { label: 'Humidity', val: result.weather.hum, target: 100, col: '#0ea5e9', suf: '%' },
                                            { label: 'Wind', val: result.weather.wind, target: 30, col: '#a8a29e', suf: 'km/h' }
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                                                    <span style={{ fontWeight: 600 }}>{item.val}{item.suf}</span>
                                                </div>
                                                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        height: '100%', background: item.col, width: `${(item.val / item.target) * 100}%`,
                                                        transformOrigin: 'left', animation: 'bGrow 1s ease-out forwards', animationDelay: `${0.8 + (idx * 0.2)}s`
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                                        <h5 style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>Why {result.crop}?</h5>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Your {soilType.toLowerCase()} soil structure and highly suitable local temperature makes this the absolute optimal choice for the highest yield relative to market prices.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Alternatives */}
                            <div style={{ marginTop: '3rem' }}>
                                <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Alternative Crops</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                    {result.alternatives.map((alt: any, i: number) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + (i * 0.1) }}
                                            className="card" style={{ padding: '1.5rem', cursor: 'pointer' }}
                                            onClick={() => handleNavigateToCrop(alt.name)}
                                            whileHover={{ y: -4, borderColor: 'var(--glow-strong)' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{alt.name}</h4>
                                                <div style={{ background: 'var(--surface-light)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    {alt.match}% Match
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* History Section */}
                <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
                    <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Saved Plots</h2>
                    {farms.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No plots saved yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {farms.map((farm) => (
                                <motion.div key={farm.id} className="card" onClick={() => handleNavigateToCrop(farm.recommendations[0]?.recommendedCrop || 'UNKNOWN')} whileHover={{ y: -4, borderColor: 'var(--glow-strong)' }} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{farm.name}</h3>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{farm.soilType} • {farm.landSizeAcres} Acres</span>
                                        </div>
                                        <button onClick={handleDelete} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <MapPin size={16} />
                                        {farm.latitude.toFixed(4)}, {farm.longitude.toFixed(4)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </motion.div>
    );
}
