// APEX AI FITNESS — PRO (Apple-Grade Premium Design System)
// Implements Dark Mode, Light Mode, OLED Mode, Glassmorphism, and Fluid Spacing.

export interface ThemeColors {
  background: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryGlow: string;
  accentGreen: string;
  accentOrange: string;
  accentPurple: string;
  accentCyan: string;
  error: string;
  glassOverlay: string;
}

export const APPLE_DARK_THEME: ThemeColors = {
  background: '#090A0F',
  cardBackground: 'rgba(255, 255, 255, 0.07)',
  cardBorder: 'rgba(255, 255, 255, 0.14)',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A8B8',
  textMuted: '#6B7280',
  primary: '#0A84FF',
  primaryGlow: 'rgba(10, 132, 255, 0.35)',
  accentGreen: '#30D158',
  accentOrange: '#FF9F0A',
  accentPurple: '#BF5AF2',
  accentCyan: '#64D2FF',
  error: '#FF453A',
  glassOverlay: 'rgba(20, 22, 30, 0.75)'
};

export const APPLE_LIGHT_THEME: ThemeColors = {
  background: '#F5F5F7',
  cardBackground: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(0, 0, 0, 0.08)',
  textPrimary: '#1D1D1F',
  textSecondary: '#6E6E73',
  textMuted: '#86868B',
  primary: '#0071E3',
  primaryGlow: 'rgba(0, 113, 227, 0.25)',
  accentGreen: '#34C759',
  accentOrange: '#FF9500',
  accentPurple: '#AF52DE',
  accentCyan: '#5AC8FA',
  error: '#FF3B30',
  glassOverlay: 'rgba(255, 255, 255, 0.75)'
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 24,
  full: 9999
};
