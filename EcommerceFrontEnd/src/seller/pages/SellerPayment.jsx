import React, { useState } from 'react';

const payments = [
  { id: 'PAY-001', order: '#ORD-001', customer: 'Priya Sharma',  amount: '₹599',  method: 'Razorpay', status: 'Success',  date: '01 Mar 2026', settled: '₹569' },
  { id: 'PAY-002', order: '#ORD-003', customer: 'Sneha Iyer',    amount: '₹875',  method: 'Stripe',   status: 'Success',  date: '28 Feb 2026', settled: '₹831' },
  { id: 'PAY-003', order: '#ORD-002', customer: 'Rahul Verma',   amount: '₹349',  method: 'Razorpay', status: 'Pending',  date: '01 Mar 2026', settled: '—'    },
  { id: 'PAY-004', order: '#ORD-004', customer: 'Arjun Mehta',   amount: '₹1200', method: 'Stripe',   status: 'Refunded', date: '27 Feb 2026', settled: '₹0'   },
  { id: 'PAY-005', order: '#ORD-005', customer: 'Divya Nair',    amount: '₹595',  method: 'Razorpay', status: 'Success',  date: '26 Feb 2026', settled: '₹565' },
];

const statusStyle = {
  Success:  { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' },
  Pending:  { bg: 'rgba(234,179,8,0.12)',  color: '#eab308' },
  Refunded: { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' },
};

const summaryCards = [
  { label: 'Total Received', value: '₹11,644', icon: '💰', color: '#22c55e' },
  { label: 'Pending Payout', value: '₹349',    icon: '⏳', color: '#eab308' },
  { label: 'Total Refunded', value: '₹1,200',  icon: '↩️', color: '#ef4444' },
  { label: 'Platform Fee',   value: '₹583',    icon: '🏛️', color: '#e8006f' },
];

export default function SellerPayment() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: '#fff', fontWeight: 700, margin: 0 }}>Payment</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>Track your earnings and payouts</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {summaryCards.map(c => (
          <div key={c.label} style={{
            background: 'linear-gradient(135deg, #1e1128, #16091d)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14, padding: '18px 20px',
          }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ color: c.color, fontSize: 22, fontWeight: 700 }}>{c.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Bank details CTA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(232,0,111,0.1), rgba(196,0,93,0.05))',
        border: '1px solid rgba(232,0,111,0.2)', borderRadius: 14,
        padding: '18px 24px', marginBottom: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Bank Account Connected</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 3 }}>HDFC Bank •••• 4821 — Next payout on 5 Mar 2026</div>
        </div>
        <button style={{
          background: '#e8006f', color: '#fff', border: 'none', borderRadius: 8,
          padding: '9px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
        }}>Withdraw ₹11,644</button>
      </div>

      {/* Table */}
      <div style={{ background: 'linear-gradient(135deg, #1e1128, #16091d)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Payment ID', 'Order', 'Customer', 'Amount', 'Settled', 'Method', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '14px 18px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => {
              const s = statusStyle[p.status];
              return (
                <tr key={p.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,0,111,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'}
                >
                  <td style={{ padding: '13px 18px', color: '#e8006f', fontSize: 12, fontWeight: 600 }}>{p.id}</td>
                  <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{p.order}</td>
                  <td style={{ padding: '13px 18px', color: '#fff', fontSize: 13 }}>{p.customer}</td>
                  <td style={{ padding: '13px 18px', color: '#fff', fontWeight: 600, fontSize: 13 }}>{p.amount}</td>
                  <td style={{ padding: '13px 18px', color: '#22c55e', fontWeight: 600, fontSize: 13 }}>{p.settled}</td>
                  <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{p.method}</td>
                  <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{p.date}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}