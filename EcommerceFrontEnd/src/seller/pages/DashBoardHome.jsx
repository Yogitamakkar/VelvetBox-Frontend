import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { sectionTitle, sectionSub, COLORS } from './seller.styles';

// ── Static data — outside component, never recreated ─────────────────────────
const CHART_DATA = {
  Today: [
    { time: '0:00', orders: 0 },  { time: '3:00', orders: 1 },
    { time: '6:00', orders: 2 },  { time: '9:00', orders: 4 },
    { time: '11:00', orders: 3 }, { time: '13:00', orders: 6 },
    { time: '15:00', orders: 5 }, { time: '17:00', orders: 8 },
    { time: '19:00', orders: 7 }, { time: '21:00', orders: 4 },
    { time: '23:00', orders: 2 },
  ],
  'This Week': [
    { time: 'Mon', orders: 12 }, { time: 'Tue', orders: 19 },
    { time: 'Wed', orders: 8 },  { time: 'Thu', orders: 25 },
    { time: 'Fri', orders: 31 }, { time: 'Sat', orders: 22 },
    { time: 'Sun', orders: 15 },
  ],
  'This Month': [
    { time: 'Wk 1', orders: 45 }, { time: 'Wk 2', orders: 62 },
    { time: 'Wk 3', orders: 38 }, { time: 'Wk 4', orders: 71 },
  ],
};

const STATS = [
  { label: 'Total Earnings', value: '₹11,644', icon: '🏦', trend: '+12%', up: true  },
  { label: 'Total Sales',    value: '5',        icon: '📈', trend: '+5%',  up: true  },
  { label: 'Total Refund',   value: '7,548',    icon: '↩️', trend: '-2%',  up: false },
  { label: 'Cancel Orders',  value: '2',        icon: '✕',  trend: '+0%',  up: null  },
];

const QUICK_ACTIONS = [
  { label: '+ Add Product', path: '/seller/add-product' },
  { label: '📦 View Orders', path: '/seller/orders' },
  { label: '💳 Payments',   path: '/seller/payment' },
];

// ── Sub-components memo'd to prevent unnecessary re-renders ──────────────────
const StatCard = memo(({ label, value, icon, trend, up }) => (
  <div className="dash-stat-card">
    <div className="dash-stat-glow" />
    <div className="dash-stat-icon">{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ color: COLORS.textMuted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
    </div>
    <div style={{
      fontSize: 11, fontWeight: 600, alignSelf: 'flex-start',
      color: up === true ? COLORS.green : up === false ? COLORS.red : '#9ca3af',
    }}>{trend}</div>
  </div>
));

const CustomTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a0f1e', border: '1px solid rgba(232,0,111,0.3)',
      borderRadius: 10, padding: '10px 16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#ff4da6', fontWeight: 700, fontSize: 18 }}>{payload[0].value} orders</div>
    </div>
  );
});

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardHome() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('Today');
  const handleChartChange = useCallback(e => setChartType(e.target.value), []);

  return (
    <>
      <style>{`
        .dash-stat-card {
          background: linear-gradient(135deg, #1e1128, #16091d);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 20px;
          display: flex; align-items: center; gap: 16px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .dash-stat-card:hover {
          border-color: rgba(232,0,111,0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(232,0,111,0.1);
        }
        .dash-stat-glow {
          position: absolute; top: 0; right: 0;
          width: 80px; height: 80px; border-radius: 0 14px 0 0;
          background: radial-gradient(circle at top right, rgba(232,0,111,0.15), transparent 70%);
          pointer-events: none;
        }
        .dash-stat-icon {
          width: 46px; height: 46px; border-radius: 12px;
          background: rgba(232,0,111,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .dash-qa-btn {
          background: rgba(232,0,111,0.08);
          border: 1px solid rgba(232,0,111,0.2);
          color: #e8006f; border-radius: 8px;
          padding: 9px 20px; font-weight: 600;
          font-size: 13px; cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .dash-qa-btn:hover { background: #e8006f; color: #fff; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={sectionTitle}>Dashboard</h1>
        <p style={sectionSub}>Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        {QUICK_ACTIONS.map(a => (
          <button key={a.path} className="dash-qa-btn" onClick={() => navigate(a.path)}>
            {a.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: 'linear-gradient(135deg, #1e1128, #16091d)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>Sales Overview</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>Order activity over time</div>
          </div>
          <div style={{ position: 'relative' }}>
            <select value={chartType} onChange={handleChartChange} style={{
              background: '#1e1128', border: '1px solid rgba(232,0,111,0.25)',
              color: '#fff', borderRadius: 8, padding: '8px 32px 8px 14px',
              fontSize: 13, fontFamily: 'DM Sans, sans-serif',
              cursor: 'pointer', outline: 'none', appearance: 'none',
            }}>
              {Object.keys(CHART_DATA).map(k => (
                <option key={k} value={k} style={{ background: '#1e1128' }}>{k}</option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#e8006f', pointerEvents: 'none', fontSize: 10 }}>▼</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={CHART_DATA[chartType]} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e8006f" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#e8006f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(232,0,111,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="orders" stroke="#e8006f" strokeWidth={2.5} fill="url(#pinkGrad)"
              dot={{ fill: '#e8006f', r: 4, strokeWidth: 0 }}
              activeDot={{ fill: '#fff', r: 6, stroke: '#e8006f', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}