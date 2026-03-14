import React, { useEffect, useRef, useState } from "react";

export default function LocationPicker({ onLocationSelect, onClose }) {
  const mapRef = useRef(null);
  const [status, setStatus] = useState("init");
  const [address, setAddress] = useState(null);
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState("");
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useEffect(() => {
    // Load CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // If already loaded
    if (window.L) {
      setTimeout(initMap, 100);
      return;
    }

    // Load JS
    if (!document.getElementById("leaflet-js")) {
      setStatus("loading-leaflet");
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => { setStatus("leaflet-ok"); setTimeout(initMap, 100); };
      script.onerror = () => setStatus("ERR: CDN blocked — run: npm install leaflet");
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || mapInstance.current) return;
    setStatus("map-init");
    try {
      const L = window.L;
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(map);
      markerInstance.current = marker;

      marker.on("dragend", () => {
        const { lat, lng } = marker.getLatLng();
        fetchAddress(lat, lng);
      });

      map.on("click", (e) => {
        marker.setLatLng(e.latlng);
        fetchAddress(e.latlng.lat, e.latlng.lng);
      });

      setStatus("ready");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: c }) => {
            marker.setLatLng([c.latitude, c.longitude]);
            map.flyTo([c.latitude, c.longitude], 16);
            fetchAddress(c.latitude, c.longitude);
          },
          () => setError("Location denied — click map to pick manually")
        );
      }
    } catch (e) {
      setStatus("map-error");
      setError(e.message);
    }
  };

  const fetchAddress = async (lat, lng) => {
    setGeocoding(true);
    setError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const a = data.address || {};
      setAddress({
        street:      [a.house_number, a.road].filter(Boolean).join(", ") || "",
        locality:    a.neighbourhood || a.suburb || a.village || a.town || "",
        city:        a.city || a.town || a.county || "",
        state:       a.state || "",
        postalCode:  a.postcode || "",
        fullAddress: data.display_name || "",
      });
    } catch {
      setError("Could not fetch address. Check internet connection.");
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        width: "100%", maxWidth: 560,
        boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #e8006f, #ff4da6)",
          padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>📍 Select Delivery Location</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 3, fontFamily: "monospace" }}>
              [{status}]
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
            width: 32, height: 32, color: "#fff", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Map div — fixed px height is critical */}
        <div ref={mapRef} style={{ height: "300px", width: "100%", background: "#f3f4f6" }} />

        {/* Status / Address */}
        <div style={{ padding: "12px 16px", minHeight: 70, borderTop: "1px solid #f3f4f6" }}>
          {geocoding && <p style={{ color: "#9ca3af", fontSize: 13 }}>⏳ Fetching address...</p>}
          {error && <p style={{ color: "#ef4444", fontSize: 13 }}>⚠️ {error}</p>}
          {address && <p style={{ fontSize: 13, color: "#111", lineHeight: 1.5 }}>{address.fullAddress}</p>}
          {!geocoding && !error && !address && (
            <p style={{ color: "#9ca3af", fontSize: 13 }}>📌 Click the map or drag the pin</p>
          )}
        </div>

        {/* Actions */}
        <div style={{ padding: "12px 16px 16px", display: "flex", gap: 10, borderTop: "1px solid #f3f4f6" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, borderRadius: 8,
            border: "1.5px solid #e5e7eb", background: "#fff",
            color: "#6b7280", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Cancel</button>
          <button
            onClick={() => address && onLocationSelect({ ...address })}
            disabled={!address || geocoding}
            style={{
              flex: 2, padding: 10, borderRadius: 8, border: "none",
              background: address && !geocoding ? "#e8006f" : "#f3f4f6",
              color: address && !geocoding ? "#fff" : "#9ca3af",
              fontWeight: 700, fontSize: 14,
              cursor: address && !geocoding ? "pointer" : "not-allowed",
              boxShadow: address && !geocoding ? "0 4px 14px rgba(232,0,111,0.35)" : "none",
              transition: "all 0.2s",
            }}
          >Confirm Location</button>
        </div>

      </div>
    </div>
  );
}