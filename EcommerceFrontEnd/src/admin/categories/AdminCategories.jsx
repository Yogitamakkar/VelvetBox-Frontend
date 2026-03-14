// src/admin/AdminCategories.jsx
import { aCard, aSecTitle, aSecSub, AC } from "../admin.styles";

export default function AdminCategories() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={aSecTitle}>Shop By Category</h1>
        <p style={aSecSub}>Manage Shop By Category content</p>
      </div>
      <div style={{ ...aCard, padding: 40, textAlign: "center" }}>
        <div style={{ color: AC.text, fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Shop By Category</div>
        <div style={{ color: AC.muted, fontSize: 13 }}>Wire your Spring Boot API endpoint here.</div>
      </div>
    </div>
  );
}