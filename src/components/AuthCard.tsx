'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function AuthCard() {
  const [tab, setTab] = useState<'signup' | 'signin'>('signup');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    localStorage.setItem('agri_token', 'demo_token');
    router.push('/dashboard');
  };

  return (
    <div className="bg-white border border-[#c8e6c9] rounded-2xl p-8 w-full max-w-[440px] mx-auto shadow-[0_8px_40px_rgba(46,125,50,0.10)]">
      {/* Tabs */}
      <div className="flex border-b border-[#e8f5e9] mb-6" role="tablist">
        {(['signup', 'signin'] as const).map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            className={`flex-1 py-2.5 text-[0.9rem] font-semibold border-b-2 transition-all duration-200 ${
              tab === t
                ? 'text-[#2e7d32] border-[#2e7d32]'
                : 'text-[#4a6741] border-transparent hover:text-[#2e7d32]'
            }`}
            onClick={() => setTab(t)}
            type="button"
          >
            {t === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'signup' ? (
          <motion.div
            key="signup"
            id="panel-signup"
            role="tabpanel"
            aria-labelledby="tab-signup"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" id="google-signup-btn" className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-[#c8e6c9] rounded-xl text-[0.875rem] font-semibold text-[#1b2e1c] hover:bg-[#e8f5e9] transition-colors duration-200 mb-4">
              <GoogleIcon /> Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5 text-[#4a6741] text-sm">
              <div className="flex-1 h-px bg-[#c8e6c9]" />
              <span>or</span>
              <div className="flex-1 h-px bg-[#c8e6c9]" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-[0.82rem] font-medium text-[#4a6741] mb-1.5">Full name</label>
                <input id="signup-name" type="text" className="w-full px-3.5 py-2.5 text-[0.9rem] border border-[#c8e6c9] rounded-xl bg-white text-[#1b2e1c] placeholder-[#a5c5a8] focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[rgba(46,125,50,0.12)] transition-all" placeholder="Jane Farmer" required autoComplete="name" />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-[0.82rem] font-medium text-[#4a6741] mb-1.5">Email address</label>
                <input id="signup-email" type="email" className="w-full px-3.5 py-2.5 text-[0.9rem] border border-[#c8e6c9] rounded-xl bg-white text-[#1b2e1c] placeholder-[#a5c5a8] focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[rgba(46,125,50,0.12)] transition-all" placeholder="jane@farm.com" required autoComplete="email" />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-[0.82rem] font-medium text-[#4a6741] mb-1.5">Password</label>
                <input id="signup-password" type="password" className="w-full px-3.5 py-2.5 text-[0.9rem] border border-[#c8e6c9] rounded-xl bg-white text-[#1b2e1c] placeholder-[#a5c5a8] focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[rgba(46,125,50,0.12)] transition-all" placeholder="••••••••" required autoComplete="new-password" />
              </div>
              <button
                id="signup-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#2e7d32] text-white text-[0.9rem] font-semibold rounded-xl hover:bg-[#1a4d20] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(46,125,50,0.3)] disabled:opacity-70"
              >
                {loading ? 'Creating account…' : 'Create free account'}
              </button>
            </form>

            <p className="text-center text-[0.78rem] text-[#4a6741] mt-4">
              ✓ 14-day free trial · No credit card required
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="signin"
            id="panel-signin"
            role="tabpanel"
            aria-labelledby="tab-signin"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" id="google-signin-btn" className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-[#c8e6c9] rounded-xl text-[0.875rem] font-semibold text-[#1b2e1c] hover:bg-[#e8f5e9] transition-colors duration-200 mb-4">
              <GoogleIcon /> Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5 text-[#4a6741] text-sm">
              <div className="flex-1 h-px bg-[#c8e6c9]" />
              <span>or</span>
              <div className="flex-1 h-px bg-[#c8e6c9]" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-[0.82rem] font-medium text-[#4a6741] mb-1.5">Email address</label>
                <input id="signin-email" type="email" className="w-full px-3.5 py-2.5 text-[0.9rem] border border-[#c8e6c9] rounded-xl bg-white text-[#1b2e1c] placeholder-[#a5c5a8] focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[rgba(46,125,50,0.12)] transition-all" placeholder="jane@farm.com" required autoComplete="email" />
              </div>
              <div>
                <label htmlFor="signin-password" className="block text-[0.82rem] font-medium text-[#4a6741] mb-1.5">Password</label>
                <input id="signin-password" type="password" className="w-full px-3.5 py-2.5 text-[0.9rem] border border-[#c8e6c9] rounded-xl bg-white text-[#1b2e1c] placeholder-[#a5c5a8] focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[rgba(46,125,50,0.12)] transition-all" placeholder="••••••••" required autoComplete="current-password" />
              </div>
              <button
                id="signin-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#2e7d32] text-white text-[0.9rem] font-semibold rounded-xl hover:bg-[#1a4d20] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(46,125,50,0.3)] disabled:opacity-70"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-[0.78rem] text-[#4a6741] mt-4">
              Don&apos;t have an account?{' '}
              <button onClick={() => setTab('signup')} className="text-[#2e7d32] font-semibold hover:underline">
                Sign up free
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
