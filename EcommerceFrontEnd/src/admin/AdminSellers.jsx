import React, { useState, useMemo, useCallback, memo } from 'react';
import { AC, aCard, aSecTitle, aSecSub } from './admin.styles';

const TXN = [
  { id: 'TXN-001', type: 'Credit',     desc: 'Order #ORD-1091 collected',       amount: '+₹1,299', date: '01 Mar 2026', from: 'Priya Sharma',  balance: '₹2,84,512' },
  { id: 'TXN-002', type: 'Payout',     desc: 'Seller payout — Arjun Gift Studio',amount: '-₹1,234',date: '01 Mar 2026', from: 'System',        balance: '₹2,83,278' },
  { id: 'TXN-003', type: 'Credit',     desc: 'Order #ORD-1090 collected',        amount: '+₹599',  date: '01 Mar 2026', from: 'Rahul Verma',   balance: '₹2,83,877' },
  { id: 'TXN-004', type: 'Payout',     desc: 'Seller payout — BloomBox',         amount: '-₹569',  date: '01 Mar 2026', from: 'System',        balance: '₹2,83,308' },
  { id: 'TXN-005', type: 'Refund',     desc: 'Refund: Order #ORD-1088',          amount: '-₹2,100',date: '27 Feb 2026', from: 'Karan Singh',   balance: '₹2,83,877' },
  { id: 'TXN-006', type: 'Fee',        desc: 'Platform fee collected',           amount: '+₹14,226',date: '28 Feb 2026',from: 'System',        balance: '₹2,86,103' },
  { id: 'TXN-007', type: 'Credit',     desc: 'Order #ORD-1087 collected',        amount: '+₹349',  date: '26 Feb 2026', from: 'Meera Pillai',  balance: '₹2,71,877' },
];

const TYPE_META = {
  Credit: { color: '#4ade80', icon: '↑', bg: 'rgba(34,197,94,0.12)'  },
  Payout: { color: '#60a5fa', icon: '↗', bg: 'rgba(59,130,246,0.12)' },
  Refund: { color: '#f87171', icon: '↩', bg: 'rgba(239,68,68,0.12)'  },
  Fee:    { color: '#e8006f', icon: '🏛', bg: 'rgba(99,102,241,0.12)' },
};

const FILTERS = ['All', 'Credit', 'Payout', 'Refund', 'Fee'];

const TxnRow = memo(({ t }) => {
  const m = TYPE_META[t.type] || {};
  return (
    <div className="admin-txn-row" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 22px' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: m.color, fontWeight: 700, flexShrink: 0 }}>{m.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{t.desc}</div>
        <div style={{ color: AC.muted, fontSize: 12, marginTop: 2 }}>{t.id} · {t.date} · {t.from}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: m.color, fontSize: 15, fontWeight: 700 }}>{t.amount}</div>
        <div style={{ color: AC.dim, fontSize: 11, marginTop: 2 }}>Bal: {t.balance}</div>
      </div>
    </div>
  );
});

export default function AdminTransactions() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? TXN : TXN.filter(t => t.type === filter), [filter]);

  return (
    <>
      <style>{`.admin-txn-row{border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.15s}.admin-txn-row:hover{background:rgba(99,102,241,0.04)}.admin-txn-row:last-child{border-bottom:none}`}</style>
      <div style={{ marginBottom: 28 }}><h1 style={aSecTitle}>Transactions</h1><p style={aSecSub}>Full platform ledger — collections, payouts, refunds, fees</p></div>
      {/* Balance */}
      <div style={{ background: 'linear-gradient(135deg, #e8006f, #c4005d)', borderRadius: 16, padding: '22px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxShadow: '0 8px 32px rgba(232,0,111,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div><div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Platform Balance</div><div style={{ color: '#fff', fontSize: 34, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>₹2,84,512</div></div>
        <div style={{ display: 'flex', gap: 28 }}>
          {[['Total In','+₹2,98,738'],['Total Out','-₹14,226']].map(([l,v]) => (
            <div key={l} style={{ textAlign: 'center' }}><div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{v}</div><div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        {FILTERS.map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', background: filter === f ? AC.pink : 'rgba(255,255,255,0.06)', color: filter === f ? '#fff' : AC.muted }}>{f}</button>)}
      </div>
      <div style={{ ...aCard, overflow: 'hidden', padding: 0 }}>
        {filtered.map(t => <TxnRow key={t.id} t={t} />)}
      </div>
    </>
  );
}