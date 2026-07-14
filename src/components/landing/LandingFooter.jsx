import React from 'react'
import Logo from '../shared/Logo.jsx'
import styles from './LandingFooter.module.css'

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <span className={styles.logo}><Logo size={50}/><span><span>Code</span><span style={{ color: 'var(--accent)' }}>Canvas</span></span></span>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} CodeCanvas</span>
          <div className={styles.rightGroup}>
  <div className={styles.credit}>
    Designed &amp; Developed by <span className={styles.name}>Harshal Patil</span>
  </div>

  <div className={styles.links}>
    <a href="https://github.com/harshalpatil-10" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
    <a href="https://www.linkedin.com/in/harshalpatil5/" target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>
    <a href="mailto:patilharshal39730@gmail.com">
      Email
    </a>
  </div>
</div>
      </div>
    </footer>
  )
}
