import React from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from './RevealOnScroll.jsx'
import MagneticButton from './MagneticButton.jsx'
import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <RevealOnScroll>
          <div className={styles.box}>
            <h2 className={styles.heading}>Your developer workspace starts here.</h2>
            <p className={styles.sub}>Everything you need, in one canvas.</p>
            <MagneticButton as={Link} to="/signup" className="btn btn-primary" style={{ padding: '16px 34px', fontSize: '15.5px' }}>
              Get Started — it's free →
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
