import React from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from './RevealOnScroll.jsx'
//import MagneticButton from './MagneticButton.jsx'
import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className="container">
       <RevealOnScroll>
  <div className={styles.content}>
    <h2 className={styles.heading}>
      Your entire dev workspace,
      <br />
      one AI conversation away.
    </h2>

    <p className={styles.sub}>
      Snippets, notes, SQL, and APIs — searchable, revisable, and now, chattable.
    </p>

    <Link
      to="/signup"
      className="btn btn-primary"
      style={{ padding: "16px 36px", fontSize: "16px" }}
    >
      Get Started →
    </Link>
  </div>
</RevealOnScroll>
      </div>
    </section>
  )
}
