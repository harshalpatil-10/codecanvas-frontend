import React from 'react'
import RevealOnScroll from './RevealOnScroll.jsx'
import styles from './AiHighlight.module.css'

export default function AiHighlight() {
  return (
    <section id="ai" className={styles.section}>
      <div className="container">
        <div className={styles.wrap}>
          <RevealOnScroll className={styles.textCol}>
            <span className="badge badge-gold">✨ AI-Powered</span>
            <h2 className={styles.heading}>Revision that actually happens.</h2>
            <p className={styles.desc}>
              CodeCanvas quietly tracks when you last revisited a note. When something's overdue,
              it doesn't just nag you — it generates a short quiz from your own notes using Gemini,
              so revision becomes active recall instead of a guilty popup.
            </p>
            <ul className={styles.list}>
              <li><span>◷</span> Background scheduler checks revision status automatically</li>
              <li><span>✨</span> AI-generated quiz questions from your real content</li>
              <li><span>⇄</span> Optimistic locking keeps concurrent edits safe</li>
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className={styles.visualCol}>
            <div className={styles.quizCard}>
              <div className={styles.quizHeader}>
                <span className="badge badge-gold">Revision Reminder</span>
              </div>
              <p className={styles.quizNote}>"Spring Security — JWT Filters"</p>
              <p className={styles.quizMeta}>You haven't revised this in 32 days.</p>
              <div className={styles.quizDivider} />
              <p className={styles.quizGenLabel}>✨ Generated quiz</p>
              <div className={styles.quizQ}>1. What does the JwtAuthenticationFilter check on each request?</div>
              <div className={styles.quizQ}>2. Why is SessionCreationPolicy set to STATELESS?</div>
              <div className={styles.quizQ}>3. Where does the filter place the authenticated principal?</div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
