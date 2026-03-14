// seller.styles.js — all shared styles as stable objects (defined once, never recreated)

export const COLORS = {
  bg:          '#0d0a10',
  sidebar:     '#100815',
  card:        'linear-gradient(135deg, #1e1128, #16091d)',
  border:      'rgba(255,255,255,0.07)',
  pink:        '#e8006f',
  pinkDark:    '#c4005d',
  pinkGlow:    'rgba(232,0,111,0.35)',
  pinkSubtle:  'rgba(232,0,111,0.08)',
  text:        '#fff',
  textMuted:   'rgba(255,255,255,0.4)',
  textDim:     'rgba(255,255,255,0.25)',
  green:       '#22c55e',
  red:         '#ef4444',
  yellow:      '#eab308',
  blue:        '#3b82f6',
};

export const cardBase = {
  background:   COLORS.card,
  border:       `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding:      20,
};

export const tableHeaderCell = {
  padding:       '14px 20px',
  textAlign:     'left',
  fontSize:      11,
  fontWeight:    600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         'rgba(255,255,255,0.3)',
};

export const tableCell = {
  padding:  '13px 20px',
  fontSize: 13,
};

export const pinkBtn = {
  background:  COLORS.pink,
  color:       '#fff',
  border:      'none',
  borderRadius: 10,
  padding:     '10px 22px',
  fontWeight:  600,
  fontSize:    14,
  cursor:      'pointer',
  boxShadow:   `0 4px 14px ${COLORS.pinkGlow}`,
  fontFamily:  'DM Sans, sans-serif',
  transition:  'background 0.2s',
};

export const inputBase = {
  width:       '100%',
  background:  'rgba(255,255,255,0.05)',
  border:      '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding:     '11px 16px',
  color:       '#fff',
  fontSize:    14,
  fontFamily:  'DM Sans, sans-serif',
  outline:     'none',
  boxSizing:   'border-box',
  transition:  'border-color 0.2s',
};

export const fieldLabel = {
  display:       'block',
  fontSize:      12,
  fontWeight:    600,
  color:         'rgba(255,255,255,0.45)',
  marginBottom:  8,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
};

export const sectionTitle = {
  fontFamily: 'Playfair Display, serif',
  fontSize:   26,
  color:      '#fff',
  fontWeight: 700,
  margin:     0,
};

export const sectionSub = {
  color:     'rgba(255,255,255,0.35)',
  fontSize:  13,
  marginTop: 4,
};

export const STATUS_STYLES = {
  Delivered: { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e', dot: '#22c55e' },
  Pending:   { bg: 'rgba(234,179,8,0.12)',  color: '#eab308', dot: '#eab308' },
  Shipped:   { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', dot: '#3b82f6' },
  Cancelled: { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444', dot: '#ef4444' },
  Success:   { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e', dot: '#22c55e' },
  Refunded:  { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444', dot: '#ef4444' },
};