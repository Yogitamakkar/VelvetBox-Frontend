import React, { useReducer, useCallback, useState, memo } from 'react';
import { sectionTitle, sectionSub, inputBase, fieldLabel } from './seller.styles';

const INITIAL = {
  name: 'Arjun Mehta', email: 'arjun@velvetbox.in',
  phone: '9876543210', storeName: "Arjun's Gift Studio",
  storeDesc: 'Premium handcrafted gifts for all occasions.',
  bank: 'HDFC Bank', accountNo: '••••4821', ifsc: 'HDFC0001234',
};

const formReducer = (state, { field, value }) => ({ ...state, [field]: value });

const onFocus = e => { e.target.style.borderColor = '#e8006f'; };
const onBlur  = e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; };

const cardStyle = {
  background: 'linear-gradient(135deg, #1e1128, #16091d)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16, padding: 24,
};

const sectionLabel = {
  fontSize: 13, fontWeight: 600, color: '#e8006f',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20,
};

const InputField = memo(({ label, field, value, onChange, type = 'text' }) => (
  <div>
    <label style={fieldLabel}>{label}</label>
    <input type={type} style={inputBase} value={value}
      onChange={e => onChange(field, e.target.value)}
      onFocus={onFocus} onBlur={onBlur}
    />
  </div>
));

export default function SellerAccount() {
  const [form, dispatch] = useReducer(formReducer, INITIAL);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((field, value) => dispatch({ field, value }), []);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={sectionTitle}>Account</h1>
        <p style={sectionSub}>Manage your seller profile and settings</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Personal */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Personal Info</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #e8006f, #ff4da6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', fontWeight: 700, flexShrink: 0 }}>
              {form.name.charAt(0)}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600 }}>{form.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>Seller since Jan 2025</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="Full Name" field="name"  value={form.name}  onChange={handleChange} />
            <InputField label="Email"     field="email" value={form.email} onChange={handleChange} type="email" />
            <InputField label="Phone"     field="phone" value={form.phone} onChange={handleChange} type="tel" />
          </div>
        </div>

        {/* Store */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Store Details</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="Store Name" field="storeName" value={form.storeName} onChange={handleChange} />
            <div>
              <label style={fieldLabel}>Store Description</label>
              <textarea style={{ ...inputBase, height: 90, resize: 'none' }}
                value={form.storeDesc}
                onChange={e => handleChange('storeDesc', e.target.value)}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
          </div>
        </div>

        {/* Bank */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Bank Account</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputField label="Bank Name"   field="bank"      value={form.bank}      onChange={handleChange} />
            </div>
            <InputField label="Account No" field="accountNo" value={form.accountNo} onChange={handleChange} />
            <InputField label="IFSC Code"  field="ifsc"      value={form.ifsc}      onChange={handleChange} />
          </div>
        </div>

        {/* Security */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Security</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['Current Password', 'New Password', 'Confirm Password'].map(l => (
              <div key={l}>
                <label style={fieldLabel}>{l}</label>
                <input type="password" style={inputBase} placeholder="••••••••" onFocus={onFocus} onBlur={onBlur} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSave} style={{
          background: saved ? '#22c55e' : '#e8006f', color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 32px', fontWeight: 700, fontSize: 15,
          cursor: 'pointer', transition: 'background 0.3s, box-shadow 0.3s',
          boxShadow: saved ? '0 4px 14px rgba(34,197,94,0.3)' : '0 4px 14px rgba(232,0,111,0.35)',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {saved ? '✓ Changes Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}