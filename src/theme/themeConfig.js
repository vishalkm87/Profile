/**
 * Central Theme Class Tokens
 * Use these standard classes across all components for effortless theme consistency.
 */

export const themeTokens = {
  // Page container
  pageCanvas: 'bg-[var(--bg-canvas)] text-[var(--text-primary)] min-h-screen transition-colors duration-200',
  
  // Cards and Panels
  card: 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--card-shadow)] rounded-2xl transition-all',
  cardHover: 'hover:border-[var(--border-strong)] hover:shadow-[var(--card-shadow-hover)]',
  subCard: 'bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl',
  
  // Headers & Text
  title: 'text-[var(--text-primary)] font-bold',
  body: 'text-[var(--text-secondary)] leading-relaxed',
  muted: 'text-[var(--text-muted)]',
  
  // Interactive Buttons
  primaryBtn: 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-semibold rounded-xl transition-all shadow-sm',
  secondaryBtn: 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-strong)] font-semibold rounded-xl transition-all shadow-sm',
  
  // Tags & Badges
  pill: 'bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] text-xs px-2.5 py-1 rounded-md font-medium shadow-xs',
  badge: 'bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs',
  metricBox: 'bg-[var(--metric-bg)] text-[var(--metric-text)] border border-[var(--metric-border)] rounded-xl p-3 shadow-xs',
  
  // Navigation & Borders
  navBar: 'bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]',
  divider: 'border-b border-[var(--border-subtle)]',
};

