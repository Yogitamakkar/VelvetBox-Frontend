import React, { useState, useCallback, memo, useMemo } from 'react';
import { sectionTitle, sectionSub, tableHeaderCell, tableCell, STATUS_STYLES } from './seller.styles';

const ORDERS = [
  { id: '#ORD-001', customer: 'Priya Sharma',  product: 'Rose Bouquet',       amount: '₹599',  status: 'Delivered', date: '01 Mar 2026' },
  { id: '#ORD-002', customer: 'Rahul Verma',   product: 'Chocolate Box',       amount: '₹349',  status: 'Pending',   date: '01 Mar 2026' },
  { id: '#ORD-003', customer: 'Sneha Iyer',    product: 'Birthday Cake',       amount: '₹875',  status: 'Shipped',   date: '28 Feb 2026' },
  { id: '#ORD-004', customer: 'Arjun Mehta',   product: 'Custom Photo Frame',  amount: '₹1200', status: 'Cancelled', date: '27 Feb 2026' },
  { id: '#ORD-005', customer: 'Divya Nair',    product: 'Floral Delight Cake', amount: '₹595',  status: 'Delivered', date: '26 Feb 2026' },
  { id: '#ORD-006', customer: 'Karan Singh',   product: 'Truffle Cake',        amount: '₹499',  status: 'Pending',   date: '25 Feb 2026' },
  { id: '#ORD-007', customer: 'Meera Pillai',  product: 'Jewellery Set',       amount: '₹2100', status: 'Shipped',   date: '24 Feb 2026' },
];

const FILTERS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];
const HEADERS = ['Order ID', 'Customer', 'Product', 'Amount', 'Date', 'Status'];

const StatusBadge = memo(({ status }) => {
  const s = STATUS_STYLES[status] || {};
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: '4px 12px', borderRadius: 20,
      fontSize: 12, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
});

const OrderRow = memo(({ order, odd }) => (
  <tr className="order-row" style={{ background: odd ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
    <td style={{ ...tableCell, color: '#e8006f', fontWeight: 600 }}>{order.id}</td>
    <td style={{ ...tableCell, color: '#fff' }}>{order.customer}</td>
    <td style={{ ...tableCell, color: 'rgba(255,255,255,0.6)' }}>{order.product}</td>
    <td style={{ ...tableCell, color: '#fff', fontWeight: 600 }}>{order.amount}</td>
    <td style={{ ...tableCell, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{order.date}</td>
    <td style={tableCell}><StatusBadge status={order.status} /></td>
  </tr>
));

export default function SellerOrders() {
  const [filter, setFilter] = useState('All');
  const handleFilter = useCallback(f => () => setFilter(f), []);

  const filtered = useMemo(() =>
    filter === 'All' ? ORDERS : ORDERS.filter(o => o.status === filter),
  [filter]);

  return (
    <>
      <style>{`
        .order-row { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .order-row:hover { background: rgba(232,0,111,0.05) !important; }
        .filter-btn { padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: background 0.2s, color 0.2s, box-shadow 0.2s; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{ marginBottom: 28 }}>
        <h1 style={sectionTitle}>Orders</h1>
        <p style={sectionSub}>Manage and track all your orders</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} className="filter-btn" onClick={handleFilter(f)} style={{
            background: filter === f ? '#e8006f' : 'rgba(255,255,255,0.06)',
            color: filter === f ? '#fff' : 'rgba(255,255,255,0.5)',
            boxShadow: filter === f ? '0 4px 14px rgba(232,0,111,0.3)' : 'none',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e1128, #16091d)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {HEADERS.map(h => <th key={h} style={tableHeaderCell}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => <OrderRow key={o.id} order={o} odd={i % 2 !== 0} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}