// admin.styles.js — light theme matching Zosh Bazzar screenshot

export const AC = {
  bg:          '#f9fafb',
  sidebar:     '#ffffff',
  card:        '#ffffff',
  border:      '#e5e7eb',
  borderLight: '#f3f4f6',
  pink:        '#e8006f',
  pinkDark:    '#c4005d',
  pinkGlow:    'rgba(232,0,111,0.2)',
  pinkSubtle:  'rgba(232,0,111,0.06)',
  text:        '#111827',
  muted:       '#6b7280',
  dim:         '#9ca3af',
  green:       '#16a34a',
  greenBg:     'rgba(22,163,74,0.1)',
  red:         '#dc2626',
  redBg:       'rgba(220,38,38,0.1)',
  yellow:      '#ca8a04',
  yellowBg:    'rgba(202,138,4,0.1)',
  blue:        '#2563eb',
  blueBg:      'rgba(37,99,235,0.1)',
};

export const aCard = {
  background:   AC.card,
  border:       `1px solid ${AC.border}`,
  borderRadius: 12,
  padding:      20,
  boxShadow:    '0 1px 3px rgba(0,0,0,0.06)',
};

export const aTh = {
  padding:       '12px 16px',
  textAlign:     'left',
  fontSize:      12,
  fontWeight:    600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color:         AC.muted,
  background:    '#f9fafb',
  borderBottom:  `1px solid ${AC.border}`,
};

export const aTd = {
  padding:      '13px 16px',
  fontSize:     14,
  borderBottom: `1px solid ${AC.borderLight}`,
  color:        AC.text,
};

export const aSecTitle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize:   22,
  color:      AC.text,
  fontWeight: 700,
  margin:     0,
};

export const aSecSub = {
  color:     AC.muted,
  fontSize:  13,
  marginTop: 4,
};

export const ROLE_BADGE = {
  ROLE_ADMIN:    { bg: 'rgba(99,102,241,0.1)',  color: '#6366f1' },
  ROLE_SELLER:   { bg: 'rgba(232,0,111,0.1)',   color: '#e8006f' },
  ROLE_CUSTOMER: { bg: 'rgba(22,163,74,0.1)',   color: '#16a34a' },
};

export const STATUS_MAP = {
  Active:    { bg: 'rgba(22,163,74,0.1)',   color: '#16a34a' },
  Inactive:  { bg: 'rgba(220,38,38,0.1)',   color: '#dc2626' },
  Pending:   { bg: 'rgba(202,138,4,0.1)',   color: '#ca8a04' },
  Banned:    { bg: 'rgba(220,38,38,0.12)',  color: '#dc2626' },
  Delivered: { bg: 'rgba(22,163,74,0.1)',   color: '#16a34a' },
  Shipped:   { bg: 'rgba(37,99,235,0.1)',   color: '#2563eb' },
  Cancelled: { bg: 'rgba(220,38,38,0.1)',   color: '#dc2626' },
  Success:   { bg: 'rgba(22,163,74,0.1)',   color: '#16a34a' },
  Refunded:  { bg: 'rgba(220,38,38,0.1)',   color: '#dc2626' },
  Approved:  { bg: 'rgba(22,163,74,0.1)',   color: '#16a34a' },
  Rejected:  { bg: 'rgba(220,38,38,0.1)',   color: '#dc2626' },
};