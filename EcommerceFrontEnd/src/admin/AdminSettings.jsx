import React from 'react';

export default function AdminSettings() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: '#fff', fontWeight: 700, margin: 0 }}>Settings</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>Manage platform Settings — wire your API here</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #16112a, #110e22)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: 14, padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>🚧</div>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Settings — Coming Soon</div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Wire your Spring Boot API endpoint here next.</div>
      </div>
    </div>
  );
}