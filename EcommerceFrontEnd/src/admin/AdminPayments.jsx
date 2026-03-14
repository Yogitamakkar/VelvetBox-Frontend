import React, { memo } from 'react';
import { AC, aCard, aTh, aTd, aSecTitle, aSecSub, STATUS_MAP } from './admin.styles';

const PAYMENTS = [
  { id: 'PAY-001', order: '#ORD-1091', customer: 'Priya Sharma',  seller: 'Arjun Gift Studio', amount: '₹1,299', fee: '₹65',  net: '₹1,234', method: 'Razorpay', status: 'Success',  date: '01 Mar 2026' },
  { id: 'PAY-002', order: '#ORD-1090', customer: 'Rahul Verma',   seller: 'BloomBox',          amount: '₹599',  fee: '₹30',  net: '₹569',   method: 'Stripe',   status: 'Success',  date: '01 Mar 2026' },
  { id: 'PAY-003', order: '#ORD-1089', customer: 'Sneha Iyer',    seller: 'Sweet Cakes Co.',   amount: '₹875',  fee: '—',    net: '—',      method: 'Razorpay', status: 'Pending',  date: '28 Feb 2026' },
  { id: 'PAY-004', order: '#ORD-1088', customer: 'Karan Singh',   seller: 'Jewel Palace',      amount: '₹2,100',fee: '₹105', net: '₹0',     method: 'Stripe',   status: 'Refunded', date: '27 Feb 2026' },
  { id: 'PAY-005', order: '#ORD-1087', customer: 'Meera Pillai',  seller: 'Arjun Gift Studio', amount: '₹349',  fee: '₹18',  net: '₹331',   method: 'Razorpay', status: 'Success',  date: '26 Feb 2026' },
];

const SUMMARY = [
  { label: 'Total Collected', value: '₹2,84,512', color: '#4ade80', icon: '💰' },
  { label: 'Platform Revenue', value: '₹14,226',  color: '#e8006f', icon: '🏛️' },
  { label: 'Paid to Sellers',  value: '₹2,70,286',color: '#60a5fa', icon: '↗️' },
  { label: 'Pending Payouts',  value: '₹875',     color: '#facc15', icon: '⏳' },
];

const PayRow = memo(({ p, odd }) => {
  const sb = STATUS_MAP[p.status] || {};
  return (
    <tr className="admin-row" style={{ background: odd ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
      <td style={{ ...aTd, color: '#e8006f', fontWeight: 600, fontSize: 12 }}>{p.id}</td>
      <td style={{ ...aTd, color: 'rgba(255,255,255,0.6)' }}>{p.order}</td>
      <td style={{ ...aTd, color: '#fff' }}>{p.customer}</td>
      <td style={{ ...aTd, color: AC.muted }}>{p.seller}</td>
      <td style={{ ...aTd, color: '#fff', fontWeight: 600 }}>{p.amount}</td>
      <td style={{ ...aTd, color: AC.red }}>{p.fee}</td>
      <td style={{ ...aTd, color: '#4ade80', fontWeight: 600 }}>{p.net}</td>
      <td style={{ ...aTd, color: AC.muted }}>{p.method}</td>
      <td style={{ ...aTd, color: AC.muted, fontSize: 12 }}>{p.date}</td>
      <td style={aTd}><span style={{ background: sb.bg, color: sb.color, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.status}</span></td>
    </tr>
  );
});

export default function AdminPayments() {
  return (
    <>
      <style>{`.admin-row{border-bottom:1px solid #f3f4f6;transition:background 0.12s}.admin-row:hover td,.admin-row:hover{background:rgba(232,0,111,0.025)!important}`}</style>
      <div style={{ marginBottom: 28 }}><h1 style={aSecTitle}>Payments</h1><p style={aSecSub}>All platform payment activity</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 24 }}>
        {SUMMARY.map(s => (
          <div key={s.label} style={{ background: AC.card, border: `1px solid ${AC.border}`, borderRadius: 13, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: AC.muted, fontSize: 11, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...aCard, overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{['Pay ID','Order','Customer','Seller','Amount','Fee','Net','Method','Date','Status'].map(h=><th key={h} style={aTh}>{h}</th>)}</tr></thead>
          <tbody>{PAYMENTS.map((p,i) => <PayRow key={p.id} p={p} odd={i%2!==0} />)}</tbody>
        </table>
      </div>
    </>
  );
}