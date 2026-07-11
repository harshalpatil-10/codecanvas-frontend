import React from 'react'
import Logo from '../shared/Logo.jsx'
import styles from './LandingFooter.module.css'

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <span className={styles.logo}><Logo size={18} /> CodeCanvas</span>
          <span className={styles.tag}>The Developer's Second Brain</span>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} CodeCanvas</span>
          <a href="https://github.com/harshalpatil-10" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
