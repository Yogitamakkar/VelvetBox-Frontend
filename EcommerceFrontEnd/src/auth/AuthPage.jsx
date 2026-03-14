import React, { useState, useCallback, useReducer, useRef, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROLES } from './AuthService';

const MODES = { LOGIN: 'login', SIGNUP: 'signup' };
const TABS  = { PASSWORD: 'password', OTP: 'otp' };

const reducer = (s, p) => ({ ...s, ...p });

function postLogin(role, navigate, from) {
  if (role === ROLES.ADMIN)        navigate('/admin',  { replace: true });
  else if (role === ROLES.SELLER)  navigate('/seller', { replace: true });
  else                             navigate(from || '/', { replace: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared small components
// ─────────────────────────────────────────────────────────────────────────────
const AuthInput = memo(({ label, type = 'text', value, onChange, placeholder, autoComplete, disabled }) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const isPwd = type === 'password';
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 7,
        color: focused ? '#e8006f' : 'rgba(255,255,255,0.38)',
        textTransform: 'uppercase', letterSpacing: '0.09em', transition: 'color 0.2s',
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPwd && visible ? 'text' : type}
          value={value} onChange={onChange}
          placeholder={placeholder} autoComplete={autoComplete}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.045)',
            border: `1.5px solid ${focused ? '#e8006f' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 10, padding: isPwd ? '12px 44px 12px 16px' : '12px 16px',
            color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
            fontSize: 14, fontFamily: 'DM Sans, sans-serif',
            outline: 'none', transition: 'border-color 0.2s',
          }}
        />
        {isPwd && (
          <button type="button" onClick={() => setVisible(v => !v)} style={{
            position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', fontSize: 15, padding: 0, transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#e8006f'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >{visible ? '🙈' : '👁️'}</button>
        )}
      </div>
    </div>
  );
});

const OtpInput = memo(({ value, onChange, disabled }) => {
  const inputs = useRef([]);
  const digits = (value + '      ').slice(0, 6).split('');
  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      onChange(value.slice(0, i) + value.slice(i + 1));
      if (i > 0) inputs.current[i - 1]?.focus();
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = (value + ' '.repeat(6)).split('');
    next[i] = e.key;
    onChange(next.join('').trim().slice(0, 6));
    if (i < 5) inputs.current[i + 1]?.focus();
  };
  const handlePaste = e => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(text);
    inputs.current[Math.min(text.length, 5)]?.focus();
    e.preventDefault();
  };
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 20, justifyContent: 'center' }}>
      {[0,1,2,3,4,5].map(i => (
        <input key={i} ref={el => inputs.current[i] = el}
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i].trim()} onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste} onChange={() => {}} disabled={disabled}
          style={{
            width: 48, height: 52, textAlign: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${digits[i].trim() ? '#e8006f' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 10, color: '#fff', fontSize: 20, fontWeight: 700,
            fontFamily: 'DM Sans, sans-serif', outline: 'none', transition: 'border-color 0.2s',
          }}
        />
      ))}
    </div>
  );
});

const RoleToggle = memo(({ role, onChange }) => (
  <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
    {[
      { label: '🛍️ Customer', value: ROLES.CUSTOMER },
      { label: '🏪 Seller',   value: ROLES.SELLER   },
    ].map(r => (
      <button key={r.value} type="button" onClick={() => onChange(r.value)} style={{
        flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
        background: role === r.value ? '#e8006f' : 'transparent',
        color: role === r.value ? '#fff' : 'rgba(255,255,255,0.4)',
        fontWeight: 600, fontSize: 13, cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        boxShadow: role === r.value ? '0 2px 10px rgba(232,0,111,0.35)' : 'none',
        transition: 'all 0.2s',
      }}>{r.label}</button>
    ))}
  </div>
));

const ErrorBox   = memo(({ msg }) => msg ? (
  <div style={{ background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.22)', color: '#f87171', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{msg}</div>
) : null);

const SuccessBox = memo(({ msg }) => msg ? (
  <div style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)', color: '#4ade80', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{msg}</div>
) : null);

const SubmitBtn  = memo(({ loading, children, disabled }) => (
  <button type="submit" disabled={loading || disabled} style={{
    width: '100%', padding: '14px', border: 'none', borderRadius: 12,
    background: '#e8006f', color: '#fff', fontWeight: 700, fontSize: 15,
    fontFamily: 'DM Sans, sans-serif', cursor: (loading || disabled) ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1, boxShadow: '0 4px 20px rgba(232,0,111,0.38)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'background 0.2s',
  }}
    onMouseEnter={e => { if (!loading && !disabled) e.currentTarget.style.background = '#c4005d'; }}
    onMouseLeave={e => { e.currentTarget.style.background = '#e8006f'; }}
  >
    {loading
      ? <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'auth-spin 0.65s linear infinite', display: 'inline-block' }} />
      : children}
  </button>
));

// ─────────────────────────────────────────────────────────────────────────────
// Password Login Form
// ─────────────────────────────────────────────────────────────────────────────
function PasswordLoginForm({ role, onRoleChange, initialEmail }) {
  const { loginWithPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [s, set] = useReducer(reducer, { email: initialEmail, password: '', loading: false, error: '' });

  const submit = async e => {
    e.preventDefault();
    set({ loading: true, error: '' });
    try {
      const data = await loginWithPassword({ email: s.email, password: s.password, role });
      postLogin(data.role, navigate, location.state?.from);
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  };

  return (
    <form onSubmit={submit}>
      <RoleToggle role={role} onChange={onRoleChange} />
      <AuthInput label="Email" type="email" value={s.email} onChange={e => set({ email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
      <AuthInput label="Password" type="password" value={s.password} onChange={e => set({ password: e.target.value })} placeholder="••••••••" autoComplete="current-password" />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button type="button" style={{ background: 'none', border: 'none', color: '#e8006f', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Forgot password?</button>
      </div>
      <ErrorBox msg={s.error} />
      <SubmitBtn loading={s.loading}>Sign In</SubmitBtn>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OTP Login Form
// ─────────────────────────────────────────────────────────────────────────────
function OtpLoginForm({ role, onRoleChange, initialEmail }) {
  const { sendOtp, loginWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [s, set] = useReducer(reducer, {
    email: initialEmail, otp: '', step: 'email',
    loading: false, error: '', success: '', countdown: 0,
  });

  useEffect(() => {
    if (s.countdown <= 0) return;
    const t = setTimeout(() => set({ countdown: s.countdown - 1 }), 1000);
    return () => clearTimeout(t);
  }, [s.countdown]);

  const handleSendOtp = async e => {
    e.preventDefault();
    set({ loading: true, error: '', success: '' });
    try {
      await sendOtp({ email: s.email, role });
      set({ step: 'otp', success: `OTP sent to ${s.email}`, countdown: 30 });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    if (s.otp.length < 6) { set({ error: 'Enter the 6-digit OTP' }); return; }
    set({ loading: true, error: '' });
    try {
      const data = await loginWithOtp({ email: s.email, otp: s.otp, role });
      postLogin(data.role, navigate, location.state?.from);
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  };

  if (s.step === 'email') return (
    <form onSubmit={handleSendOtp}>
      <RoleToggle role={role} onChange={onRoleChange} />
      <AuthInput label="Email" type="email" value={s.email} onChange={e => set({ email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
      <ErrorBox msg={s.error} />
      <SubmitBtn loading={s.loading}>Send OTP</SubmitBtn>
    </form>
  );

  return (
    <form onSubmit={handleVerifyOtp}>
      <SuccessBox msg={s.success} />
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', marginBottom: 20 }}>
        Enter the 6-digit code sent to<br />
        <span style={{ color: '#fff', fontWeight: 600 }}>{s.email}</span>
      </p>
      <OtpInput value={s.otp} onChange={otp => set({ otp })} disabled={s.loading} />
      <ErrorBox msg={s.error} />
      <SubmitBtn loading={s.loading} disabled={s.otp.length < 6}>Verify OTP</SubmitBtn>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
        <button type="button" onClick={() => set({ step: 'email', otp: '', error: '', success: '' })}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>← Change email</button>
        <button type="button" disabled={s.countdown > 0}
          onClick={() => { set({ otp: '', error: '' }); handleSendOtp({ preventDefault: () => {} }); }}
          style={{ background: 'none', border: 'none', fontSize: 13, cursor: s.countdown > 0 ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', color: s.countdown > 0 ? 'rgba(255,255,255,0.25)' : '#e8006f' }}>
          {s.countdown > 0 ? `Resend in ${s.countdown}s` : 'Resend OTP'}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Signup Form — handles both Customer and Seller registration
// ─────────────────────────────────────────────────────────────────────────────
function SignupForm({ onSwitch, initialEmail, initialStoreName, initialRole }) {
  const { signup, sendOtp } = useAuth();
  const navigate  = useNavigate();
  const isSeller  = initialRole === ROLES.SELLER;

  const [s, set] = useReducer(reducer, {
    fullName:  '',
    storeName: initialStoreName || '',
    email:     initialEmail     || '',
    password:  '',
    confirm:   '',
    otp:       '',
    step:      'details',   // 'details' → 'otp' → done
    loading:   false,
    error:     '',
    countdown: 0,
  });

  // Countdown for resend
  useEffect(() => {
    if (s.countdown <= 0) return;
    const t = setTimeout(() => set({ countdown: s.countdown - 1 }), 1000);
    return () => clearTimeout(t);
  }, [s.countdown]);

  // Step 1 — validate details and send OTP
  const handleSendOtp = async e => {
    e.preventDefault();
    if (s.password !== s.confirm) { set({ error: 'Passwords do not match' }); return; }
    if (s.password.length < 6)   { set({ error: 'Password must be at least 6 characters' }); return; }
    set({ loading: true, error: '' });
    try {
      await sendOtp({ email: s.email, role: initialRole || ROLES.CUSTOMER });
      set({ step: 'otp', loading: false, countdown: 30 });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  };

  // Step 2 — verify OTP then create account
  const handleVerifyAndSignup = async e => {
    e.preventDefault();
    if (s.otp.length < 6) { set({ error: 'Enter the 6-digit OTP' }); return; }
    set({ loading: true, error: '' });
    try {
      await signup({
        fullName:  s.fullName,
        email:     s.email,
        password:  s.password,
        otp:       s.otp,
        role:      initialRole || ROLES.CUSTOMER,
        ...(isSeller && { storeName: s.storeName }),
      });
      navigate(isSeller ? '/seller' : '/', { replace: true });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  };

  const resendOtp = async () => {
    set({ otp: '', error: '', loading: true });
    try {
      await sendOtp({ email: s.email, role: initialRole || ROLES.CUSTOMER });
      set({ countdown: 30, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  };

  // ── Step 2: OTP verification ──
  if (s.step === 'otp') return (
    <div className="auth-form-inner">
      <div style={{ marginBottom: 28 }}>
        <h2 className="auth-heading">Verify your email</h2>
        <p className="auth-sub">We sent a 6-digit code to</p>
        <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginTop: 4 }}>{s.email}</p>
      </div>

      <form onSubmit={handleVerifyAndSignup}>
        <OtpInput value={s.otp} onChange={otp => set({ otp, error: '' })} disabled={s.loading} />
        <ErrorBox msg={s.error} />
        <SubmitBtn loading={s.loading} disabled={s.otp.length < 6}>
          Verify & Create Account
        </SubmitBtn>
      </form>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
        <button type="button" onClick={() => set({ step: 'details', otp: '', error: '' })}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          ← Edit details
        </button>
        <button type="button" disabled={s.countdown > 0} onClick={resendOtp}
          style={{ background: 'none', border: 'none', fontSize: 13, cursor: s.countdown > 0 ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', color: s.countdown > 0 ? 'rgba(255,255,255,0.25)' : '#e8006f' }}>
          {s.countdown > 0 ? `Resend in ${s.countdown}s` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );

  // ── Step 1: Fill details ──
  return (
    <div className="auth-form-inner">
      <div style={{ marginBottom: 28 }}>
        <h2 className="auth-heading">{isSeller ? 'Create seller account' : 'Create account'}</h2>
        <p className="auth-sub">{isSeller ? 'Set up your VelvetBox seller profile' : 'Join VelvetBox and start gifting'}</p>
      </div>

      {isSeller && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
          background: 'rgba(232,0,111,0.08)', border: '1px solid rgba(232,0,111,0.2)',
          borderRadius: 10, padding: '10px 14px',
        }}>
          <span style={{ fontSize: 16 }}>🏪</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
            Registering as a <strong style={{ color: '#ff4da6' }}>Seller</strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSendOtp}>
        <AuthInput label="Full Name" value={s.fullName} onChange={e => set({ fullName: e.target.value })} placeholder="Arjun Mehta" autoComplete="name" />
        {isSeller && (
          <AuthInput label="Store Name" value={s.storeName} onChange={e => set({ storeName: e.target.value })} placeholder="My Awesome Store" autoComplete="organization" />
        )}
        <AuthInput label="Email" type="email" value={s.email} onChange={e => set({ email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
        <AuthInput label="Password" type="password" value={s.password} onChange={e => set({ password: e.target.value })} placeholder="Min. 6 characters" autoComplete="new-password" />
        <AuthInput label="Confirm Password" type="password" value={s.confirm} onChange={e => set({ confirm: e.target.value })} placeholder="••••••••" autoComplete="new-password" />
        <ErrorBox msg={s.error} />
        <SubmitBtn loading={s.loading}>Send Verification OTP</SubmitBtn>
      </form>

      <p className="auth-switch-text">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="auth-switch-btn">Sign in</button>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Login Panel
// ─────────────────────────────────────────────────────────────────────────────
function LoginPanel({ onSwitch }) {
  const location    = useLocation();
  const initialEmail = location.state?.email || '';
  const [tab,  setTab]  = useState(TABS.PASSWORD);
  const [role, setRole] = useState(ROLES.CUSTOMER);

  return (
    <div className="auth-form-inner">
      <div style={{ marginBottom: 28 }}>
        <h2 className="auth-heading">Welcome back</h2>
        <p className="auth-sub">Sign in to your VelvetBox account</p>
      </div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {[{ label: '🔑 Password', value: TABS.PASSWORD }, { label: '📱 OTP', value: TABS.OTP }].map(t => (
          <button key={t.value} type="button" onClick={() => setTab(t.value)} style={{
            flex: 1, padding: '10px 0', background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === t.value ? '#e8006f' : 'transparent'}`,
            color: tab === t.value ? '#fff' : 'rgba(255,255,255,0.35)',
            fontWeight: tab === t.value ? 600 : 400, fontSize: 14,
            fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.2s', marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>
      {tab === TABS.PASSWORD
        ? <PasswordLoginForm role={role} onRoleChange={setRole} initialEmail={initialEmail} />
        : <OtpLoginForm      role={role} onRoleChange={setRole} initialEmail={initialEmail} />
      }
      <p className="auth-switch-text">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="auth-switch-btn">Create one</button>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Left Panel
// ─────────────────────────────────────────────────────────────────────────────
const LeftPanel = memo(() => (
  <div className="auth-left">
    <div className="auth-orb auth-orb-1" /><div className="auth-orb auth-orb-2" /><div className="auth-orb auth-orb-3" />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#fff' }}>
          Velvet<span style={{ color: '#ff4da6' }}>Box</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premium Gift Store</div>
      </div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1.22, margin: '0 0 18px' }}>
        Gifts that<br /><span style={{ color: '#ff4da6' }}>speak</span><br />louder than words
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.75, maxWidth: 300 }}>
        Curated gifts for every occasion, delivered with love across India.
      </p>
      <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
        {[['50K+','Customers'],['1200+','Gift Options'],['4.9★','Rating']].map(([n,l]) => (
          <div key={l}>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{n}</div>
            <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
));

// ─────────────────────────────────────────────────────────────────────────────
// Root — reads BecomeSeller state here and auto-switches to signup
// ─────────────────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { isLoggedIn, role } = useAuth();

  // If coming from BecomeSeller, start on signup mode
  const fromSeller = location.state?.role === ROLES.SELLER;
  const [mode, setMode] = useState(fromSeller ? MODES.SIGNUP : MODES.LOGIN);

  useEffect(() => {
    if (isLoggedIn) {
      if (role === ROLES.ADMIN)       navigate('/admin',  { replace: true });
      else if (role === ROLES.SELLER) navigate('/seller', { replace: true });
      else                            navigate('/',       { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .auth-root { display: flex; min-height: 100vh; background: #0d0a10; font-family: 'DM Sans', sans-serif; }
        .auth-left {
          width: 460px; flex-shrink: 0;
          background: linear-gradient(155deg, #1a0a1f 0%, #0d0a10 55%, #180510 100%);
          border-right: 1px solid rgba(232,0,111,0.1);
          position: relative; overflow: hidden; display: flex; align-items: center; padding: 60px 48px;
        }
        .auth-orb { position: absolute; border-radius: 50%; filter: blur(55px); pointer-events: none; z-index: 1; }
        .auth-orb-1 { width: 320px; height: 320px; top: -90px; left: -90px; background: radial-gradient(circle, rgba(232,0,111,0.22), transparent 70%); animation: orb 8s ease-in-out infinite; }
        .auth-orb-2 { width: 220px; height: 220px; bottom: 40px; right: -50px; background: radial-gradient(circle, rgba(255,77,166,0.18), transparent 70%); animation: orb 11s ease-in-out infinite reverse; }
        .auth-orb-3 { width: 160px; height: 160px; top: 45%; left: 45%; background: radial-gradient(circle, rgba(196,0,93,0.1), transparent 70%); animation: orb 7s ease-in-out infinite 1.5s; }
        @keyframes orb { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-18px) scale(1.04); } }
        .auth-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 32px; overflow-y: auto; }
        .auth-form-inner { width: 100%; max-width: 400px; animation: slide-in 0.38s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes slide-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .auth-heading { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .auth-sub { color: rgba(255,255,255,0.38); font-size: 14px; margin-top: 5px; }
        .auth-switch-text { text-align: center; margin-top: 22px; color: rgba(255,255,255,0.38); font-size: 14px; }
        .auth-switch-btn { background: none; border: none; color: #e8006f; font-weight: 600; font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; padding: 0; }
        .auth-switch-btn:hover { color: #ff4da6; }
        @keyframes auth-spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.18); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #1a0f22 inset !important; -webkit-text-fill-color: #fff !important; }
        @media (max-width: 768px) { .auth-left { display: none; } .auth-right { padding: 32px 20px; } }
      `}</style>

      <div className="auth-root">
        <LeftPanel />
        <div className="auth-right">
          {mode === MODES.LOGIN
            ? <LoginPanel onSwitch={() => setMode(MODES.SIGNUP)} />
            : <SignupForm
                onSwitch={() => setMode(MODES.LOGIN)}
                initialEmail={location.state?.email       || ''}
                initialStoreName={location.state?.storeName || ''}
                initialRole={location.state?.role          || ROLES.CUSTOMER}
              />
          }
        </div>
      </div>
    </>
  );
}