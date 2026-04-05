'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';
import { Loader2 } from 'lucide-react';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Fake visual delay for loading 1.5s
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        try {
            // Simulated fake logic for MVP, normally this hits /api/auth
            localStorage.setItem('agri_token', 'demo_token_xyz');
            
            if (isLogin) {
                toast('Welcome back 👋', 'success');
            } else {
                toast('Account created 🌱', 'success');
            }
            
            // Artificial delay to allow toast and exit animation to trigger
            setTimeout(() => {
                router.push('/dashboard');
            }, 300);

        } catch (err: any) {
            toast(err.message || 'Authentication failed', 'error');
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.2 }}
            className="card" 
            style={{ 
                padding: '2.5rem', 
                width: '100%', 
                maxWidth: '420px', 
                margin: '0 auto',
                boxShadow: '0 0 80px var(--glow)'
            }}
        >
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <button 
                    type="button"
                    onClick={() => setIsLogin(true)}
                    style={{ 
                        flex: 1, 
                        background: 'transparent', 
                        border: 'none', 
                        paddingBottom: '0.75rem',
                        color: isLogin ? 'var(--primary)' : 'var(--text-muted)',
                        borderBottom: isLogin ? '2px solid var(--primary)' : '2px solid transparent',
                        fontWeight: isLogin ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-syne), inherit',
                        fontSize: '1.1rem'
                    }}
                >
                    Sign In
                </button>
                <button 
                    type="button"
                    onClick={() => setIsLogin(false)}
                    style={{ 
                        flex: 1, 
                        background: 'transparent', 
                        border: 'none', 
                        paddingBottom: '0.75rem',
                        color: !isLogin ? 'var(--primary)' : 'var(--text-muted)',
                        borderBottom: !isLogin ? '2px solid var(--primary)' : '2px solid transparent',
                        fontWeight: !isLogin ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-syne), inherit',
                        fontSize: '1.1rem'
                    }}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <motion.div 
                            key="signup-fields"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                        >
                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Jane"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        required
                        className="input-field"
                        placeholder="farmer@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        className="input-field"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary shimmer-sweep"
                    style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}
                    disabled={loading}
                >
                    {loading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                            <Loader2 size={20} />
                        </motion.div>
                    ) : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
            </form>
        </motion.div>
    );
}
