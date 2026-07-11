import React from 'react'
import styles from './RevisionRing.module.css'

// SVG radial progress ring showing how much of the workspace is "fresh" vs
// due for revision - a quick-glance health indicator for the dashboard.
export default function RevisionRing({ due, total }) {
  const safeTotal = total || 1
  const freshPct = Math.max(0, Math.min(100, ((safeTotal - due) / safeTotal) * 100))
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (freshPct / 100) * circumference

  return (
    <div className={styles.wrap}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r={radius} fill="none" stroke="var(--paper-2)" strokeWidth="10" />
        <circle
          cx="52" cy="52" r={radius} fill="none" stroke="var(--accent)" strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 52 52)"
          className={styles.progress}
        />
      </svg>
      <div className={styles.center}>
        <div className={styles.pct}>{Math.round(freshPct)}%</div>
        <div className={styles.label}>fresh</div>
      </div>
    </div>
  )
}
