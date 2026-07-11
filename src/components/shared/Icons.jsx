import React from 'react'

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const DashboardIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" />
  </svg>
)
export const SnippetIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <polyline points="8 6 3 12 8 18" /><polyline points="16 6 21 12 16 18" />
  </svg>
)
export const NoteIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 4h12l4 4v12H4z" /><path d="M16 4v4h4" /><path d="M8 12h8" /><path d="M8 16h5" />
  </svg>
)
export const ApiIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M8 3L3 12l5 9" /><path d="M16 3l5 9-5 9" /><path d="M11 21L13 3" />
  </svg>
)
export const SqlIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
)
export const SearchIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.6" y2="16.6" />
  </svg>
)
export const StarIcon = ({ filled, ...p }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} fill={filled ? 'currentColor' : 'none'} {...p}>
    <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
  </svg>
)
export const TimelineIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
  </svg>
)
export const SunIcon = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" />
  </svg>
)
export const MoonIcon = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
  </svg>
)
export const MenuIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
export const LogoutIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)
export const SparkleIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9z" />
  </svg>
)
export const SettingsIcon = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
  </svg>
)
