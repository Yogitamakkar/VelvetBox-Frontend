import React, { useState, useCallback, useReducer, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sectionTitle, sectionSub, inputBase, fieldLabel } from './seller.styles';

const CATEGORIES = ['Flowers', 'Cakes', 'Food', 'Personalised', 'Jewellery', 'Tech & Gadgets', 'Home & Decor'];
const COLORS     = ['Red', 'Pink', 'White', 'Blue', 'Black', 'Yellow', 'Green', 'Purple', 'Multi'];
const MAX_IMAGES = 5;

const formReducer = (state, { field, value }) => ({ ...state, [field]: value });
const INITIAL_FORM = {
  name: '', category: '', secondCategory: '', mrpPrice: '',
  sellingPrice: '', color: '', stock: '', description: '',
};

const cardStyle = {
  background: 'linear-gradient(135deg, #1e1128, #16091d)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16, padding: 28,
};

const onFocus = e => { e.target.style.borderColor = '#e8006f'; };
const onBlur  = e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; };

const Field = memo(({ label, children }) => (
  <div>
    <label style={fieldLabel}>{label}</label>
    {children}
  </div>
));

// ── Image thumbnail with remove button ────────────────────────────────────────
const ImageThumb = memo(({ src, onRemove }) => (
  <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
    <img src={src} alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <button
      type="button"
      onClick={onRemove}
      style={{
        position: 'absolute', top: 4, right: 4,
        width: 20, height: 20, borderRadius: '50%',
        background: 'rgba(0,0,0,0.75)', border: '1.5px solid rgba(255,255,255,0.4)',
        color: '#fff', fontSize: 11, fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        lineHeight: 1, padding: 0,
      }}
    >✕</button>
  </div>
));

// ── Add more slot ─────────────────────────────────────────────────────────────
const AddSlot = memo(({ onChange, disabled }) => (
  <label style={{
    width: 80, height: 80, borderRadius: 10, flexShrink: 0,
    border: `2px dashed ${disabled ? 'rgba(255,255,255,0.1)' : 'rgba(232,0,111,0.35)'}`,
    background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(232,0,111,0.04)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 4, cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 0.2s, background 0.2s',
  }}
    onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(232,0,111,0.7)'; e.currentTarget.style.background = 'rgba(232,0,111,0.08)'; } }}
    onMouseLeave={e => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(232,0,111,0.35)'; e.currentTarget.style.background = 'rgba(232,0,111,0.04)'; } }}
  >
    <span style={{ fontSize: 22, color: disabled ? 'rgba(255,255,255,0.2)' : '#e8006f' }}>＋</span>
    <span style={{ fontSize: 10, color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.2 }}>
      {disabled ? 'Max 5' : 'Add'}
    </span>
    <input type="file" accept="image/*" multiple onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
  </label>
));

export default function SellerAddProduct() {
  const navigate = useNavigate();
  const [form, dispatch]  = useReducer(formReducer, INITIAL_FORM);
  const [images, setImages] = useState([]); // [{ id, url }]
  const [status, setStatus] = useState('idle');

  const handleField = useCallback(field => e => dispatch({ field, value: e.target.value }), []);

  // Add images — respect MAX_IMAGES cap
  const handleAddImages = useCallback(e => {
    const files = Array.from(e.target.files);
    setImages(prev => {
      const slots = MAX_IMAGES - prev.length;
      if (slots <= 0) return prev;
      const newImgs = files.slice(0, slots).map(f => ({
        id: `${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(f),
      }));
      return [...prev, ...newImgs];
    });
    // Reset input so same file can be re-added after removal
    e.target.value = '';
  }, []);

  // Remove a single image by id
  const handleRemove = useCallback(id => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.url); // free memory
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => navigate('/seller/products'), 1200);
    }, 1500);
  }, [navigate]);

  const atMax = images.length >= MAX_IMAGES;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={sectionTitle}>Add Product</h1>
        <p style={sectionSub}>List a new product in your store</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ── Image upload row ── */}
          <div style={cardStyle}>
            <div style={{ ...fieldLabel, marginBottom: 14 }}>
              Product Images
              <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, marginLeft: 8, textTransform: 'none', letterSpacing: 0 }}>
                ({images.length}/{MAX_IMAGES})
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Existing images */}
              {images.map(img => (
                <ImageThumb
                  key={img.id}
                  src={img.url}
                  onRemove={() => handleRemove(img.id)}
                />
              ))}

              {/* Add slot — hidden when at max */}
              {!atMax && <AddSlot onChange={handleAddImages} disabled={false} />}
              {atMax && (
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>
                  Maximum 5 images reached
                </div>
              )}
            </div>

            {images.length === 0 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 10, marginBottom: 0 }}>
                Click + to add up to 5 product images
              </p>
            )}
          </div>

          {/* ── Fields ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* Left column */}
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Product Name">
                <input style={inputBase} placeholder="e.g. Rose Bouquet"
                  value={form.name} onChange={handleField('name')}
                  onFocus={onFocus} onBlur={onBlur} required />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="MRP Price (₹)">
                  <input style={inputBase} type="number" placeholder="0.00"
                    value={form.mrpPrice} onChange={handleField('mrpPrice')}
                    onFocus={onFocus} onBlur={onBlur} required />
                </Field>
                <Field label="Selling Price (₹)">
                  <input style={inputBase} type="number" placeholder="0.00"
                    value={form.sellingPrice} onChange={handleField('sellingPrice')}
                    onFocus={onFocus} onBlur={onBlur} required />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Color">
                  <select style={{ ...inputBase, appearance: 'none' }}
                    value={form.color} onChange={handleField('color')}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select color</option>
                    {COLORS.map(c => <option key={c} value={c} style={{ background: '#1e1128' }}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Stock Quantity">
                  <input style={inputBase} type="number" placeholder="0"
                    value={form.stock} onChange={handleField('stock')}
                    onFocus={onFocus} onBlur={onBlur} required />
                </Field>
              </div>
            </div>

            {/* Right column */}
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Category">
                <select style={{ ...inputBase, appearance: 'none' }}
                  value={form.category} onChange={handleField('category')}
                  onFocus={onFocus} onBlur={onBlur} required>
                  <option value="" disabled>Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1e1128' }}>{c}</option>)}
                </select>
              </Field>

              <Field label="Second Category (optional)">
                <select style={{ ...inputBase, appearance: 'none' }}
                  value={form.secondCategory} onChange={handleField('secondCategory')}
                  onFocus={onFocus} onBlur={onBlur}>
                  <option value="">None</option>
                  {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1e1128' }}>{c}</option>)}
                </select>
              </Field>

              <Field label="Description">
                <textarea style={{ ...inputBase, height: 130, resize: 'vertical' }}
                  placeholder="Describe your product..."
                  value={form.description} onChange={handleField('description')}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </Field>
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={status !== 'idle'}
            style={{
              width: '100%', padding: 16, borderRadius: 12, border: 'none',
              background: status === 'done' ? '#22c55e' : '#e8006f',
              color: '#fff', fontWeight: 700, fontSize: 15,
              cursor: status === 'idle' ? 'pointer' : 'default',
              boxShadow: status === 'done' ? '0 4px 14px rgba(34,197,94,0.3)' : '0 4px 14px rgba(232,0,111,0.35)',
              transition: 'background 0.3s, box-shadow 0.3s',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {status === 'loading' ? 'Listing...' : status === 'done' ? '✓ Listed! Redirecting...' : 'Add Product'}
          </button>

        </div>
      </form>
    </div>
  );
}