import React from 'react'
import styles from './CanvasBackground.module.css'

// Signature visual motif: a subtle dot-grid "canvas" texture with soft drifting
// gradient orbs behind it - ties directly to the product name, CodeCanvas.
export default function CanvasBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />
    </div>
  )
}
