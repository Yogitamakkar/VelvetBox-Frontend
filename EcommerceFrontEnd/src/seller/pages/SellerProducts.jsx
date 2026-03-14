import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sectionTitle, sectionSub, pinkBtn } from './seller.styles';

const PRODUCTS = [
  { id: 1, name: 'Rose Bouquet',       category: 'Flowers',     price: '₹599',  stock: 24, sales: 87,  img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc47?w=200&h=140&fit=crop' },
  { id: 2, name: 'Chocolate Box',      category: 'Food',        price: '₹349',  stock: 52, sales: 143, img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=200&h=140&fit=crop' },
  { id: 3, name: 'Birthday Cake',      category: 'Cakes',       price: '₹875',  stock: 8,  sales: 61,  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=140&fit=crop' },
  { id: 4, name: 'Custom Photo Frame', category: 'Personalised',price: '₹1200', stock: 15, sales: 34,  img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=200&h=140&fit=crop' },
  { id: 5, name: 'Jewellery Set',      category: 'Jewellery',   price: '₹2100', stock: 6,  sales: 22,  img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=140&fit=crop' },
];

const ProductCard = memo(({ p }) => (
  <div className="product-card">
    <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 11, color: '#e8006f', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{p.category}</div>
      <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
      <div style={{ color: '#ff4da6', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{p.price}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        <span>Stock: <span style={{ color: p.stock < 10 ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{p.stock}</span></span>
        <span>Sales: <span style={{ color: '#fff', fontWeight: 600 }}>{p.sales}</span></span>
      </div>
    </div>
  </div>
));

export default function SellerProducts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const handleSearch = useCallback(e => setSearch(e.target.value), []);

  const filtered = useMemo(() =>
    PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
  [search]);

  return (
    <>
      <style>{`
        .product-card {
          background: linear-gradient(135deg, #1e1128, #16091d);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
        }
        .product-card:hover {
          border-color: rgba(232,0,111,0.3);
          transform: translateY(-3px);
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={sectionTitle}>Products</h1>
          <p style={sectionSub}>{PRODUCTS.length} products in your store</p>
        </div>
        <button style={pinkBtn} onClick={() => navigate('/seller/add-product')}>+ Add Product</button>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, maxWidth: 340 }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>🔍</span>
        <input value={search} onChange={handleSearch} placeholder="Search products..."
          style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 14, width: '100%', fontFamily: 'DM Sans, sans-serif' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}