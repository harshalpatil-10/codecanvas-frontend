import React from 'react'
import styles from './StatCard.module.css'

export default function StatCard({ label, value, icon, tone = 'accent' }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={`${styles.iconWrap} ${styles[tone]}`}>{icon}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
