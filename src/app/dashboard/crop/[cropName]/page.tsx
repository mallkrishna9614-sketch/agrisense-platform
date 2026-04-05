'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tractor, Sprout, ShieldAlert, Sparkles, Sprout as Leaf, Calendar, DollarSign, Package } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export default function CropDetailPage({ params }: { params: Promise<{ cropName: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const crop = resolvedParams.cropName.toUpperCase();
    const { toast } = useToast();

    const handleAmazon = () => {
        toast('Opening Amazon... 🛒', 'info');
        window.open(`https://www.amazon.com/s?k=${crop}+seeds`, '_blank');
    };

    return (
        <motion.div 
            className="page-enter-active"
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 36, transition: { duration: 0.28 } }}
            style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}
        >
            <button 
                onClick={() => router.push('/dashboard')}
                className="btn btn-outline" 
                style={{ padding: '0.5rem 1rem', marginBottom: '2rem', display: 'flex', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)' }}
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </button>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--glow-strong), transparent 60%)', filter: 'blur(60px)', zIndex: 0 }} />
                
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                            <Leaf size={40} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h1 className="heading-1" style={{ color: 'var(--primary)' }}>{crop}</h1>
                                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
                                    94% Match
                                </span>
                            </div>
                            <span style={{ color: 'var(--text-muted)' }}>Loamy Soil • 5.0 Acres • Kharif Season</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '300px' }}>
                        <a 
                            href={`https://www.amazon.com/s?k=${crop}+seeds`} 
                            target="_blank" rel="noreferrer"
                            onClick={() => toast('Opening Amazon... 🛒', 'info')}
                            className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                        >
                            Amazon <ExternalLink size={16} />
                        </a>
                        <a 
                            href={`https://dir.indiamart.com/search.mp?ss=${crop}+seeds`} 
                            target="_blank" rel="noreferrer"
                            onClick={() => toast('Opening IndiaMart... 🛒', 'info')}
                            className="btn btn-outline" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                        >
                            IndiaMart <ExternalLink size={16} />
                        </a>
                        <a 
                            href={`https://www.google.com/search?tbm=shop&q=${crop}+seeds`} 
                            target="_blank" rel="noreferrer"
                            onClick={() => toast('Searching Google Shop... 🛒', 'info')}
                            className="btn btn-outline" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                        >
                            Google Shop <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-sm)' }}><Calendar color="#3b82f6" /></div>
                    <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Days to Harvest</h4><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>110 - 130</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)' }}><DollarSign color="#10b981" /></div>
                    <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Avg Price / Quintal</h4><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>$140</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-sm)' }}><Package color="#f59e0b" /></div>
                    <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Yield per Acre</h4><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>~8-10 Quintals</span></div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card" style={{ marginTop: '1.5rem', padding: '3rem' }}>
                <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>About Cultivation</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                    {crop} acts as a highly resilient and scalable crop suitable for the mapped soil characteristics. It promotes nitrogen fixation, which significantly improves soil fertility for subsequent crop cycles. Optimal land preparation involves deep ploughing followed by harrowing.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                        <Tractor size={24} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Land Preparation</h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ensure fine tilth. Avoid water-logged areas by creating raised beds if anticipating heavy rainfall.</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                        <Sprout size={24} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Sowing Strategy</h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Treat seeds with rhizobium culture. Maintain row spacing of 30cm to allow optimal root development.</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                        <ShieldAlert size={24} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Pest Management</h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Monitor for aphids in early growth. Employ neem oil extracts as a primary organic defense mechanism.</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
