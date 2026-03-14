import React, { useState, useCallback, useMemo, memo } from 'react';
import { sectionTitle, sectionSub } from './seller.styles';

const TRANSACTIONS = [
  { id: 'TXN-001', type: 'Credit',     desc: 'Order #ORD-001 payment',   amount: '+₹569',   date: '01 Mar 2026', balance: '₹11,644' },
  { id: 'TXN-002', type: 'Credit',     desc: 'Order #ORD-003 payment',   amount: '+₹831',   date: '28 Feb 2026', balance: '₹11,075' },
  { id: 'TXN-003', type: 'Debit',      desc: 'Platform fee — Feb batch', amount: '-₹583',   date: '28 Feb 2026', balance: '₹10,244' },
  { id: 'TXN-004', type: 'Debit',      desc: 'Refund: Order #ORD-004',   amount: '-₹1,200', date: '27 Feb 2026', balance: '₹10,827' },
  { id: 'TXN-005', type: 'Credit',     desc: 'Order #ORD-005 payment',   amount: '+₹565',   date: '26 Feb 2026', balance: '₹12,027' },
  { id: 'TXN-006', type: 'Withdrawal', desc: 'Bank withdrawal',          amount: '-₹5,000', date: '20 Feb 2026', balance: '₹11,462' },
  { id: 'TXN-007', type: 'Credit',     desc: 'Order #ORD-007 payment',   amount: '+₹2,100', date: '18 Feb 2026', balance: '₹16,462' },
];

const TYPE_META = {
  Credit:     { color: '#22c55e', icon: '↑' },
  Debit:      { color: '#ef4444', icon: '↓' },
  Withdrawal: { color: '#e8006f', icon: '⇥' },
};

const FILTERS = ['All', 'Credit', 'Debit', 'Withdrawal'];

const TxnRow = memo(({ t }) => {
  const m = TYPE_META[t.type] || {};
  return (
    <div className="txn-row" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px' }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: m.color, fontWeight: 700 }}>
        {m.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{t.desc}</div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>{t.id} · {t.date}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: m.color, fontSize: 16, fontWeight: 700 }}>{t.amount}</div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 2 }}>Bal: {t.balance}</div>
      </div>
    </div>
  );
});

export default function SellerTransaction() {
  const [filter, setFilter] = useState('All');
  const handleFilter = useCallback(f => () => setFilter(f), []);

  const filtered = useMemo(() =>
    filter === 'All' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter),
  [filter]);

  return (
    <>
      <style>{`
        .txn-row { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .txn-row:hover { background: rgba(232,0,111,0.04); }
        .txn-row:last-child { border-bottom: none; }
        .txn-filter { padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: background 0.2s, color 0.2s; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{ marginBottom: 28 }}>
        <h1 style={sectionTitle}>Transactions</h1>
        <p style={sectionSub}>Full ledger of your account activity</p>
      </div>

      {/* Balance card */}
      <div style={{ background: 'linear-gradient(135deg, #e8006f, #c4005d)', borderRadius: 16, padding: '24px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxShadow: '0 8px 32px rgba(232,0,111,0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Current Balance</div>
          <div style={{ color: '#fff', fontSize: 36, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>₹11,644</div>
        </div>
        <div style={{ display: 'flex', gap: 24, position: 'relative' }}>
          {[{ label: 'Total In', value: '+₹14,627' }, { label: 'Total Out', value: '-₹6,783' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {FILTERS.map(f => (
          <button key={f} className="txn-filter" onClick={handleFilter(f)} style={{ background: filter === f ? '#e8006f' : 'rgba(255,255,255,0.06)', color: filter === f ? '#fff' : 'rgba(255,255,255,0.5)' }}>{f}</button>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e1128, #16091d)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        {filtered.map(t => <TxnRow key={t.id} t={t} />)}
      </div>
    </>
  );
}