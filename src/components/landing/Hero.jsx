import React from 'react'
import { Link } from 'react-router-dom'
import CanvasBackground from './CanvasBackground.jsx'
//import MagneticButton from './MagneticButton.jsx'
import RevealOnScroll from './RevealOnScroll.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <CanvasBackground />
      <div className={styles.content}>
        <RevealOnScroll>
          <span className="badge badge-accent">Your Personal Dev Workspace</span>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <h1 className={styles.headline}>
            Every snippet, note, and query<br />you'll ever need — <em>in one canvas.</em>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <p className={styles.sub}>
            CodeCanvas brings your snippets, notes, SQL queries, and API references into one workspace — then lets you chat with your own knowledge, get quizzed on it, and even take a mock interview built entirely from what you've saved.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={240}>
          <div className={styles.ctaRow}>
            <Link
  to="/signup"
  className="btn btn-primary"
  style={{ padding: '15px 30px', fontSize: '15px' }}
>
  Get Started →
</Link>
            <a href="#features" className="btn btn-outline" style={{ padding: '15px 26px' }}>See how it works</a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={320}>
          <div className={styles.mockup}>
            <div className={styles.mockupBar}>
              <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
              <span className={styles.mockupUrl}>codecanvas.app/dashboard</span>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockCard}>
                <span className="badge badge-accent">Snippet</span>
                <p className={styles.mockTitle}>Binary Search — Java</p>
                <div className={styles.codeLine} style={{ width: '78%' }} />
                <div className={styles.codeLine} style={{ width: '54%' }} />
                <div className={styles.codeLine} style={{ width: '66%' }} />
              </div>
              <div className={styles.mockCard}>
                <span className="badge badge-gold">Revision Due</span>
                <p className={styles.mockTitle}>Spring Security Notes</p>
                <p className={styles.mockMeta}>Last viewed 32 days ago</p>
                <div className={styles.mockQuizBtn}>✨ Generate AI Quiz</div>
              </div>
              <div className={styles.mockCard}>
                <span className="badge badge-success">Timeline</span>
                <p className={styles.mockTitle}>Today</p>
                <p className={styles.mockMeta}>✓ Learned JWT refresh flow</p>
                <p className={styles.mockMeta}>✓ Solved Sliding Window</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
