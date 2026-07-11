import React from 'react'
import RevealOnScroll from './RevealOnScroll.jsx'
import styles from './FeatureGrid.module.css'

const FEATURES = [
  { icon: '⌘', title: 'Code Snippets', desc: 'Save reusable code with language, difficulty, and tags — searchable in seconds.' },
  { icon: '✎', title: 'Interview Notes', desc: 'Markdown notes organized by topic — Java, Spring, SQL, AWS, all in one place.' },
  { icon: '⇄', title: 'API Collection', desc: 'A personal Postman — save requests, headers, and example responses for reference.' },
  { icon: '▤', title: 'SQL Playground', desc: 'Store the joins, CTEs, and window functions you always forget the syntax for.' },
  { icon: '◈', title: 'Unified Search', desc: 'One search bar across snippets, notes, SQL, and APIs — find anything instantly.' },
  { icon: '◷', title: 'Learning Timeline', desc: 'Every save becomes a timeline entry — watch your knowledge compound day by day.' },
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
