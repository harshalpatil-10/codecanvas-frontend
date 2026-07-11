import React from 'react'
import RevealOnScroll from './RevealOnScroll.jsx'
import styles from './HowItWorks.module.css'

const STEPS = [
  { n: '01', title: 'Save anything', desc: 'A snippet, a note, a query, an API call — drop it in as you learn.' },
  { n: '02', title: 'It organizes itself', desc: 'Everything is tagged, timestamped, and searchable automatically.' },
  { n: '03', title: 'Revisit with purpose', desc: 'CodeCanvas reminds you what to revisit — and quizzes you on it.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <RevealOnScroll><span className="badge badge-accent">How it works</span></RevealOnScroll>
        <RevealOnScroll delay={60}><h2 className={styles.heading}>Three steps. Zero friction.</h2></RevealOnScroll>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <RevealOnScroll key={s.n} delay={i * 100}>
              <div className={styles.step}>
                <div className={styles.num}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
