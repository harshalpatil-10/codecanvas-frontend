import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/app/Loader.jsx'
import { interviewService } from '../../services/interviewService.js'
import styles from './Interview.module.css'

export default function InterviewSession() {
  const { sessionId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [current, setCurrent] = useState(location.state?.firstQuestion || null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!answer.trim()) return
    setSubmitting(true); setError('')
    try {
      const result = await interviewService.submitAnswer(sessionId, { answer })
      setFeedback(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function handleNext() {
    if (feedback.completed) {
      navigate(`/app/interview/history`)
      return
    }
    setCurrent(feedback)
    setFeedback(null)
    setAnswer('')
  }

  if (!current) return <Loader label="Loading interview..." />

  return (
    <div className={styles.wrap}>
      <div className={styles.sessionHeader}>
        <span className="badge badge-accent">{feedback ? feedback.topic : current.topic}</span>
        <span className={styles.qCounter}>Question</span>
      </div>

      {!feedback && (
        <div className={`card ${styles.questionCard}`}>
          <p className={styles.questionText}>{current.question}</p>
          <textarea
            className={styles.answerBox}
            rows={6}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting} style={{ width: '100%', padding: '13px 0' }}>
            {submitting ? 'Evaluating...' : 'Submit Answer'}
          </button>
        </div>
      )}

      {feedback && (
        <div className={`card ${styles.feedbackCard}`}>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{feedback.score?.toFixed(1)} / 10</span>
          </div>

          <div className={styles.feedbackBlock}>
            <h4 className={styles.feedbackHeading}>✓ Strengths</h4>
            <p>{feedback.strengths}</p>
          </div>
          <div className={styles.feedbackBlock}>
            <h4 className={styles.feedbackHeading}>✗ Weaknesses</h4>
            <p>{feedback.weaknesses}</p>
          </div>
          <div className={styles.feedbackBlock}>
            <h4 className={styles.feedbackHeading}>Suggested Answer</h4>
            <p>{feedback.suggestedAnswer}</p>
          </div>

          {feedback.completed && (
            <div className={styles.completedBanner}>
              🎉 Interview Complete — Overall Score: <b>{(feedback.overallScore * 10).toFixed(0)}%</b>
            </div>
          )}

          <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%', padding: '13px 0', marginTop: 16 }}>
            {feedback.completed ? 'View History →' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  )
}
