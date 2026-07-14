import React from 'react'
import RevealOnScroll from './RevealOnScroll.jsx'
import styles from './FeatureGrid.module.css'

const FEATURES = [
  { icon: '✨', title: 'Canvas AI', desc: 'Chat with your own saved content — it retrieves the right notes before answering, not just generic AI replies.' },
  { icon: '🎯', title: 'AI Mock Interview', desc: 'A real, adaptive interview built entirely from your notes and snippets — it follows up when you answer weak.' },
  { icon: '⌘', title: 'Code Snippets', desc: 'Save reusable code with language, difficulty, and tags — rendered with real syntax highlighting.' },
  { icon: '✎', title: 'Interview Notes', desc: 'Markdown notes organized by topic — Java, Spring, SQL, AWS, all in one place.' },
  { icon: '⇄', title: 'API Collection', desc: 'A personal Postman — save requests, headers, and example responses for reference.' },
  { icon: '▤', title: 'SQL Playground', desc: 'Store the joins, CTEs, and window functions you always forget the syntax for.' },
]

export default function FeatureGrid() {
  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <RevealOnScroll>
          <span className="badge badge-accent">Everything, organized</span>
        </RevealOnScroll>
        <RevealOnScroll delay={60}>
          <h2 className={styles.heading}>One workspace. Every kind of knowledge.</h2>
        </RevealOnScroll>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 70}>
              <div className={`card ${styles.card}`}>
                <div className={styles.icon}>{f.icon}</div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
