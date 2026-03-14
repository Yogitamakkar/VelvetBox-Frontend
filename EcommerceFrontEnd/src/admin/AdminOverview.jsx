import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AC, aCard, aSecTitle, aSecSub } from './admin.styles';

const STATS = [
  { label: 'Total Revenue',  value: '₹2,84,512', icon: '💰', trend: '+18%', up: true,  sub: 'This month' },
  { label: 'Total Orders',   value: '1,284',      icon: '📦', trend: '+9%',  up: true,  sub: 'This month' },
  { label: 'Active Users',   value: '8,432',      icon: '👥', trend: '+24%', up: true,  sub: 'Registered' },
  { label: 'Active Sellers', value: '143',         icon: '🏪', trend: '+5%',  up: true,  sub: 'Verified'   },
  { label: 'Pending Sellers',value: '12',          icon: '⏳', trend: '',     up: null,  sub: 'Awaiting approval' },
  { label: 'Cancelled Orders',value: '38',         icon: '✕',  trend: '-2%',  up: false, sub: 'This month' },
];

const REVENUE_DATA = [
  { month: 'Sep', revenue: 84000, orders: 320 },
  { month: 'Oct', revenue: 96000, orders: 410 },
  { month: 'Nov', revenue: 122000, orders: 520 },
  { month: 'Dec', revenue: 158000, orders: 680 },
  { month: 'Jan', revenue: 134000, orders: 590 },
  { month: 'Feb', revenue: 171000, orders: 740 },
  { month: 'Mar', revenue: 284512, orders: 1284 },
];

const RECENT_ORDERS = [
  { id: '#ORD-1091', customer: 'Priya Sharma',  seller: 'Arjun Gift Studio', amount: '₹1,299', status: 'Delivered' },
  { id: '#ORD-1090', customer: 'Rahul Verma',   seller: 'BloomBox',          amount: '₹599',   status: 'Shipped'   },
  { id: '#ORD-1089', customer: 'Sneha Iyer',    seller: 'Sweet Cakes Co.',   amount: '₹875',   status: 'Pending'   },
  { id: '#ORD-1088', customer: 'Karan Singh',   seller: 'Jewel Palace',      amount: '₹2,100', status: 'Cancelled' },
  { id: '#ORD-1087', customer: 'Meera Pillai',  seller: 'Arjun Gift Studio', amount: '₹349',   status: 'Delivered' },
];

const STATUS_COLOR = {
  Delivered: '#4ade80', Shipped: '#60a5fa', Pending: '#facc15', Cancelled: '#f87171',
};

const StatCard = memo(({ label, value, icon, trend, up, sub }) => (
  <div style={{ ...aCard, position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s' }}
    className="admin-stat-card"
  >
    <div style={{ position: 'absolute', top: 0, right: 0, width: 70, height: 70, background: 'radial-gradient(circle at top right, rgba(99,102,241,0.12), transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ fontSize: 26 }}>{icon}</div>
      {trend && (
        <span style={{ fontSize: 11, fontWeight: 600, color: up ? AC.green : AC.red }}>
          {trend}
        </span>
      )}
    </div>
    <div style={{ marginTop: 14, color: '#fff', fontSize: 26, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{value}</div>
    <div style={{ color: AC.muted, fontSize: 12, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
    <div style={{ color: AC.dim, fontSize: 11, marginTop: 3 }}>{sub}</div>
  </div>
));

const RevenueTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a3e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, padding: '10px 16px' }}>
      <div style={{ color: AC.muted, fontSize: 11, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#818cf8', fontWeight: 700 }}>₹{payload[0]?.value?.toLocaleString()}</div>
      <div style={{ color: AC.muted, fontSize: 12 }}>{payload[1]?.value} orders</div>
    </div>
  );
});

export default function AdminOverview() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .admin-stat-card:hover { border-color: rgba(99,102,241,0.3) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.1); }
        .admin-recent-row { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .admin-recent-row:hover { background: rgba(99,102,241,0.05) !important; }
      `}</style>

      <div style={{ marginBottom: 28 }}>
        <h1 style={aSecTitle}>Overview</h1>
        <p style={aSecSub}>Platform-wide metrics at a glance</p>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Revenue area chart */}
        <div style={{ ...aCard, padding: '24px 24px 16px' }}>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Revenue & Orders</div>
          <div style={{ color: AC.muted, fontSize: 12, marginBottom: 20 }}>Last 7 months</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: AC.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AC.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<RevenueTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.2)', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#adminGrad)"
                dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                activeDot={{ fill: '#fff', r: 5, stroke: '#6366f1', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders bar chart */}
        <div style={{ ...aCard, padding: '24px 16px 16px' }}>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Monthly Orders</div>
          <div style={{ color: AC.muted, fontSize: 12, marginBottom: 20 }}>Bar breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: AC.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AC.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(99,102,241,0.05)' }} contentStyle={{ background: '#1a1a3e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick action chips */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: '⏳ Review Sellers (12)', path: '/admin/sellers' },
          { label: '📦 All Orders', path: '/admin/orders' },
          { label: '👥 Manage Users', path: '/admin/users' },
        ].map(a => (
          <button key={a.path} onClick={() => navigate(a.path)} style={{
            background: AC.indigoSub, border: '1px solid rgba(99,102,241,0.2)',
            color: '#818cf8', borderRadius: 8, padding: '9px 18px',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = AC.indigo; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = AC.indigoSub; e.currentTarget.style.color = '#818cf8'; }}
          >{a.label}</button>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ ...aCard, overflow: 'hidden', padding: 0 }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontWeight: 600 }}>Recent Orders</div>
          <button onClick={() => navigate('/admin/orders')} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            View all →
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Order ID', 'Customer', 'Seller', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: AC.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map((o, i) => (
              <tr key={o.id} className="admin-recent-row" style={{ background: i % 2 !== 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <td style={{ padding: '12px 18px', color: '#818cf8', fontWeight: 600, fontSize: 13 }}>{o.id}</td>
                <td style={{ padding: '12px 18px', color: '#fff', fontSize: 13 }}>{o.customer}</td>
                <td style={{ padding: '12px 18px', color: AC.muted, fontSize: 13 }}>{o.seller}</td>
                <td style={{ padding: '12px 18px', color: '#fff', fontWeight: 600, fontSize: 13 }}>{o.amount}</td>
                <td style={{ padding: '12px 18px' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLOR[o.status], background: `${STATUS_COLOR[o.status]}18`, padding: '3px 10px', borderRadius: 20 }}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}