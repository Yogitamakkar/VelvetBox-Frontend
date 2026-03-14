// components/ImageUploadZone.jsx
import React, { useCallback, useRef, memo } from 'react';

// ── Single image tile with progress / remove ──────────────────────────────────
const ImageTile = memo(({ img, onRemove, theme = 'dark' }) => {
  const isDark     = theme === 'dark';
  const borderCol  = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb';
  const overlayCol = 'rgba(0,0,0,0.55)';

  return (
    <div style={{
      position: 'relative', width: 80, height: 80,
      borderRadius: 10, overflow: 'hidden', flexShrink: 0,
      border: `1px solid ${borderCol}`,
    }}>
      {/* Image / placeholder */}
      <img
        src={img.url}
        alt="upload"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          opacity: img.status === 'done' ? 1 : 0.55, transition: 'opacity 0.3s' }}
      />

      {/* Progress overlay */}
      {img.status === 'uploading' && (
        <div style={{
          position: 'absolute', inset: 0, background: overlayCol,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <div style={{ width: 48, height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }}>
            <div style={{ width: `${img.progress}%`, height: '100%', background: '#e8006f', borderRadius: 2, transition: 'width 0.2s' }} />
          </div>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>{img.progress}%</span>
        </div>
      )}

      {/* Error overlay */}
      {img.status === 'error' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(220,38,38,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 18 }}>⚠️</span>
        </div>
      )}

      {/* Done checkmark */}
      {img.status === 'done' && (
        <div style={{
          position: 'absolute', bottom: 4, right: 4,
          width: 16, height: 16, borderRadius: '50%',
          background: '#16a34a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(img.id)}
        style={{
          position: 'absolute', top: 3, right: 3,
          width: 18, height: 18, borderRadius: '50%',
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.35)',
          color: '#fff', fontSize: 9, fontWeight: 700,
          cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          lineHeight: 1, padding: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.8)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
      >✕</button>
    </div>
  );
});

// ── Add more slot ─────────────────────────────────────────────────────────────
const AddSlot = memo(({ onChange, disabled, theme }) => {
  const isDark = theme === 'dark';
  const borderC = disabled
    ? (isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb')
    : (isDark ? 'rgba(232,0,111,0.35)' : 'rgba(232,0,111,0.3)');
  const bgC = disabled
    ? 'transparent'
    : (isDark ? 'rgba(232,0,111,0.04)' : 'rgba(232,0,111,0.03)');

  return (
    <label style={{
      width: 80, height: 80, borderRadius: 10, flexShrink: 0,
      border: `2px dashed ${borderC}`,
      background: bgC,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 4, cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.2s, background 0.2s',
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = '#e8006f'; e.currentTarget.style.background = 'rgba(232,0,111,0.08)'; }}}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.borderColor = borderC; e.currentTarget.style.background = bgC; }}}
    >
      <span style={{ fontSize: 20, color: disabled ? (isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db') : '#e8006f', lineHeight: 1 }}>＋</span>
      <span style={{ fontSize: 10, color: disabled ? (isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db') : (isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af'), textAlign: 'center' }}>
        {disabled ? 'Max' : 'Add'}
      </span>
      <input type="file" accept="image/*" multiple onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
    </label>
  );
});

// ── Main component ────────────────────────────────────────────────────────────
/**
 * <ImageUploadZone
 *   images={images}         from useImageUpload()
 *   onAdd={addFiles}        from useImageUpload()
 *   onRemove={removeImage}  from useImageUpload()
 *   maxFiles={5}
 *   isUploading={bool}
 *   theme="dark" | "light"
 *   label="Product Images"
 * />
 */
const ImageUploadZone = memo(({
  images,
  onAdd,
  onRemove,
  maxFiles   = 5,
  isUploading = false,
  theme      = 'dark',
  label      = 'Images',
}) => {
  const isDark       = theme === 'dark';
  const dropRef      = useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const handleFiles = useCallback((files) => {
    if (files?.length) onAdd(files);
  }, [onAdd]);

  const handleInputChange = useCallback(e => {
    handleFiles(e.target.files);
    e.target.value = ''; // reset so same file can be re-added
  }, [handleFiles]);

  const onDragOver  = useCallback(e => { e.preventDefault(); setDragging(true);  }, []);
  const onDragLeave = useCallback(e => { e.preventDefault(); setDragging(false); }, []);
  const onDrop      = useCallback(e => {
    e.preventDefault(); setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const atMax = images.length >= maxFiles;

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 10,
    color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.07em',
  };

  const countStyle = {
    fontWeight: 400, marginLeft: 6, fontSize: 11,
    color: isDark ? 'rgba(255,255,255,0.25)' : '#9ca3af',
    textTransform: 'none', letterSpacing: 0,
  };

  return (
    <div>
      <label style={labelStyle}>
        {label}
        <span style={countStyle}>({images.length}/{maxFiles})</span>
      </label>

      {/* Drop zone wrapper */}
      <div
        ref={dropRef}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
          padding: 12, borderRadius: 12,
          border: `1.5px dashed ${dragging ? '#e8006f' : (isDark ? 'rgba(255,255,255,0.07)' : '#e5e7eb')}`,
          background: dragging
            ? 'rgba(232,0,111,0.04)'
            : (isDark ? 'rgba(255,255,255,0.02)' : '#fafafa'),
          transition: 'border-color 0.2s, background 0.2s',
          minHeight: 104,
        }}
      >
        {images.map(img => (
          <ImageTile key={img.id} img={img} onRemove={onRemove} theme={theme} />
        ))}

        {!atMax && (
          <AddSlot onChange={handleInputChange} disabled={false} theme={theme} />
        )}

        {images.length === 0 && (
          <div style={{
            flex: 1, textAlign: 'center',
            color: isDark ? 'rgba(255,255,255,0.2)' : '#9ca3af',
            fontSize: 13, pointerEvents: 'none',
          }}>
            Drag & drop images here, or click <span style={{ color: '#e8006f' }}>＋</span> to add
          </div>
        )}
      </div>

      {/* Status line */}
      <div style={{ marginTop: 6, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.25)' : '#9ca3af' }}>
        {isUploading
          ? '⏫ Uploading to Cloudinary...'
          : atMax
          ? `Maximum ${maxFiles} images reached`
          : `Up to ${maxFiles} images · max ${5}MB each · PNG, JPG, WEBP`
        }
      </div>
    </div>
  );
});

export default ImageUploadZone;