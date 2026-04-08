'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="auth-card">
            {/* Tabs */}
            <div className="auth-tabs" role="tablist">
                <button
                    id="tab-signup"
                    role="tab"
                    aria-selected={tab === 'signup'}
                    aria-controls="panel-signup"
                    className={`auth-tab${tab === 'signup' ? ' active' : ''}`}
                    onClick={() => setTab('signup')}
                    type="button"
                >
                    Create account
                </button>
                <button
                    id="tab-signin"
                    role="tab"
                    aria-selected={tab === 'signin'}
                    aria-controls="panel-signin"
                    className={`auth-tab${tab === 'signin' ? ' active' : ''}`}
                    onClick={() => setTab('signin')}
                    type="button"
                >
                    Sign in
                </button>
            </div>

            {/* Sign-up panel */}
            <div
                id="panel-signup"
                role="tabpanel"
                aria-labelledby="tab-signup"
                className={`auth-tab-panel${tab === 'signup' ? ' active' : ''}`}
            >
                {/* Google SSO */}
                <button type="button" className="btn-google" id="google-signup-btn">
                    <GoogleIcon />
                    Continue with Google
                </button>

                <div className="auth-divider">or</div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="input-group">
                        <label htmlFor="signup-name">Full name</label>
                        <input
                            id="signup-name"
                            type="text"
                            className="input-field"
                            placeholder="Jane Farmer"
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-email">Email address</label>
                        <input
                            id="signup-email"
                            type="email"
                            className="input-field"
                            placeholder="jane@farm.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-password">Password</label>
                        <input
                            id="signup-password"
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        id="signup-submit-btn"
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account…' : 'Create free account'}
                    </button>
                </form>
            </div>

            {/* Sign-in panel */}
            <div
                id="panel-signin"
                role="tabpanel"
                aria-labelledby="tab-signin"
                className={`auth-tab-panel${tab === 'signin' ? ' active' : ''}`}
            >
                {/* Google SSO */}
                <button type="button" className="btn-google" id="google-signin-btn">
                    <GoogleIcon />
                    Continue with Google
                </button>

                <div className="auth-divider">or</div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="input-group">
                        <label htmlFor="signin-email">Email address</label>
                        <input
                            id="signin-email"
                            type="email"
                            className="input-field"
                            placeholder="jane@farm.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signin-password">Password</label>
                        <input
                            id="signin-password"
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        id="signin-submit-btn"
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
