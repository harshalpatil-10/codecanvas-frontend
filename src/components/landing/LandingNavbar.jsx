import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo.jsx'
import ThemeToggle from '../shared/ThemeToggle.jsx'
import styles from './LandingNavbar.module.css'

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 12) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.mark}><Logo size={65} /></span><span><span>Code</span><span style={{ color: 'var(--accent)' }}>Canvas</span></span>
        </Link>
        <div className={styles.links}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#ai">AI Revision</a>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          <Link to="/login" className="btn btn-ghost">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  )
}
