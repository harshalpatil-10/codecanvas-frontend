import React from 'react'
import Logo from '../shared/Logo.jsx'
import styles from './LandingFooter.module.css'

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <span className={styles.logo}><Logo size={25}/><span><span>Code</span><span style={{ color: 'var(--accent)' }}>Canvas</span></span></span>
          <span className={styles.tag}>Your developer workspace starts here.</span>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} CodeCanvas</span>
          <a href="https://github.com/harshalpatil-10" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
