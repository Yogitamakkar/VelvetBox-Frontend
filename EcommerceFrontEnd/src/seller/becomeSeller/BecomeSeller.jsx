import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../auth/AuthService';

const BecomeSeller = () => {
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [focused, setFocused] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (storeName && email) {
            navigate('/auth', {
                state: {
                    role:      ROLES.SELLER,
                    email:     email,
                    storeName: storeName,
                }
            });
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

                :root {
                    --pink: #e8006f;
                    --pink-light: #ff4da6;
                    --pink-glow: rgba(232, 0, 111, 0.35);
                    --dark: #0d0a10;
                    --card-bg: rgba(255,255,255,0.04);
                    --border: rgba(232, 0, 111, 0.25);
                }

                .seller-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    background: #0d0a10;
                    font-family: 'DM Sans', sans-serif;
                    padding: 3rem 1rem;
                }

                .seller-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: 
                        radial-gradient(ellipse 60% 50% at var(--mx) var(--my), rgba(232,0,111,0.18) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 60% at 80% 20%, rgba(255,77,166,0.10) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 20% 80%, rgba(150,0,80,0.12) 0%, transparent 60%);
                    transition: background 0.1s ease;
                }

                .noise-overlay {
                    position: absolute; inset: 0; z-index: 1; opacity: 0.03;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                    background-size: 200px;
                }

                .grid-lines {
                    position: absolute; inset: 0; z-index: 1;
                    background-image: 
                        linear-gradient(rgba(232,0,111,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(232,0,111,0.04) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
                }

                .seller-content {
                    position: relative; z-index: 10; width: 100%; max-width: 480px;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .seller-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: rgba(232,0,111,0.12); border: 1px solid rgba(232,0,111,0.3);
                    border-radius: 100px; padding: 6px 16px; margin-bottom: 20px;
                    animation: fadeUp 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .badge-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: var(--pink-light); box-shadow: 0 0 8px var(--pink-light);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.6; transform: scale(0.85); }
                }

                .badge-text { font-size: 12px; font-weight: 500; color: var(--pink-light); letter-spacing: 0.08em; text-transform: uppercase; }

                .seller-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900;
                    color: #fff; line-height: 1.05; margin-bottom: 12px;
                    animation: fadeUp 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .seller-title span {
                    background: linear-gradient(135deg, var(--pink) 0%, var(--pink-light) 50%, #ff9bd1 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }

                .seller-subtitle {
                    color: rgba(255,255,255,0.45); font-size: 1rem; font-weight: 300;
                    margin-bottom: 2.5rem; letter-spacing: 0.01em;
                    animation: fadeUp 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .seller-card {
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 20px; padding: 2.5rem;
                    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                    position: relative; overflow: hidden;
                    animation: fadeUp 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
                    box-shadow: 0 0 60px rgba(232,0,111,0.08), 0 30px 60px rgba(0,0,0,0.4);
                }

                .seller-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(232,0,111,0.5), transparent);
                }

                .seller-card::after {
                    content: ''; position: absolute; bottom: -60px; right: -60px;
                    width: 180px; height: 180px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(232,0,111,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                .input-group { position: relative; margin-bottom: 1.25rem; }

                .input-label {
                    display: block; font-size: 12px; font-weight: 500;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: rgba(255,255,255,0.35); margin-bottom: 8px; transition: color 0.2s;
                }
                .input-label.active { color: var(--pink-light); }

                .seller-input {
                    width: 100%; background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
                    padding: 14px 48px 14px 18px; color: #fff; font-size: 15px;
                    font-family: 'DM Sans', sans-serif; font-weight: 400;
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                    outline: none; box-sizing: border-box;
                }
                .seller-input::placeholder { color: rgba(255,255,255,0.2); }
                .seller-input:focus {
                    border-color: var(--pink); background: rgba(232,0,111,0.06);
                    box-shadow: 0 0 0 3px rgba(232,0,111,0.12), inset 0 0 20px rgba(232,0,111,0.04);
                    transform: translateY(-1px);
                }

                .input-icon {
                    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
                    color: rgba(255,255,255,0.2); font-size: 16px; pointer-events: none; transition: color 0.2s;
                }
                .input-group:focus-within .input-icon { color: var(--pink-light); }

                .seller-btn {
                    width: 100%; position: relative; overflow: hidden;
                    background: linear-gradient(135deg, var(--pink) 0%, #c4005d 100%);
                    color: #fff; border: none; border-radius: 12px; padding: 16px;
                    font-size: 15px; font-family: 'DM Sans', sans-serif; font-weight: 500;
                    letter-spacing: 0.04em; cursor: pointer; margin-top: 0.75rem;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 8px 30px rgba(232,0,111,0.4), 0 2px 8px rgba(232,0,111,0.3);
                }
                .seller-btn::before {
                    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
                    transition: left 0.5s ease;
                }
                .seller-btn:hover::before { left: 100%; }
                .seller-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 14px 40px rgba(232,0,111,0.5), 0 4px 12px rgba(232,0,111,0.3);
                    background: linear-gradient(135deg, var(--pink-light) 0%, var(--pink) 100%);
                }
                .seller-btn:active { transform: translateY(0px); box-shadow: 0 4px 15px rgba(232,0,111,0.3); }

                .btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 1; }
                .btn-arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: inline-block; }
                .seller-btn:hover .btn-arrow { transform: translateX(4px); }

                .seller-features {
                    display: flex; justify-content: center; gap: 1.5rem; margin-top: 2rem;
                    animation: fadeUp 0.8s 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; flex-wrap: wrap;
                }
                .feature-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.35); }
                .feature-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--pink); flex-shrink: 0; }
            `}</style>

            <div className="seller-page" style={{ '--mx': `${mousePos.x}%`, '--my': `${mousePos.y}%` }}>
                <div className="seller-bg" style={{ '--mx': `${mousePos.x}%`, '--my': `${mousePos.y}%` }} />
                <div className="noise-overlay" />
                <div className="grid-lines" />

                <div className="seller-content">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="seller-badge">
                                <div className="badge-dot" />
                                <span className="badge-text">Now Accepting Sellers</span>
                            </div>
                        </div>
                        <h1 className="seller-title">
                            Become a<br /><span>Seller</span>
                        </h1>
                        <p className="seller-subtitle">Start your journey with us today!</p>
                    </div>

                    <div className="seller-card">
                        <form onSubmit={handleSubmit} style={{ margin: 0 }}>
                            <div className="input-group">
                                <label className={`input-label ${focused === 'store' ? 'active' : ''}`}>Store Name</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text" className="seller-input"
                                        placeholder="My Awesome Store"
                                        value={storeName}
                                        onChange={e => setStoreName(e.target.value)}
                                        onFocus={() => setFocused('store')}
                                        onBlur={() => setFocused(null)}
                                        required
                                    />
                                    <span className="input-icon">🏪</span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className={`input-label ${focused === 'email' ? 'active' : ''}`}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="email" className="seller-input"
                                        placeholder="hello@mystore.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        required
                                    />
                                    <span className="input-icon">✉️</span>
                                </div>
                            </div>

                            <button type="submit" className="seller-btn">
                                <span className="btn-inner">
                                    Continue to Sign In
                                    <span className="btn-arrow">→</span>
                                </span>
                            </button>
                        </form>
                    </div>

                    <div className="seller-features">
                        {['Zero setup fees', 'Instant storefront', '24/7 Support'].map(f => (
                            <div className="feature-item" key={f}>
                                <div className="feature-dot" />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BecomeSeller;