import React from 'react'
import styles from './DistributionBar.module.css'

// Lightweight CSS-only stacked bar visualizing content distribution -
// no chart library needed, keeps bundle small while still feeling "fuller".
export default function DistributionBar({ segments }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {segments.map(s => (
          <div
            key={s.label}
            className={styles.segment}
            style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
            title={`${s.label}: ${s.value}`}
          />
        ))}
      </div>
      <div className={styles.legend}>
        {segments.map(s => (
          <div key={s.label} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: s.color }} />
            {s.label} <b>{s.value}</b>
          </div>
        ))}
      </div>
    </div>
  )
}
