import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import { interviewService } from '../../services/interviewService.js'
import { formatRelative } from '../../utils/dateUtils.js'
import styles from './Interview.module.css'

export default function InterviewHistory() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    interviewService.getHistory()
      .then(setSessions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Loading interview history..." />

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>Interview History</h1>
        <Link to="/app/interview" className="btn btn-primary">+ New Interview</Link>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {sessions.length === 0 ? (
        <EmptyState icon="🎯" title="No interviews yet" subtitle="Start your first AI mock interview to see your history here." />
      ) : (
        <div className={styles.historyList}>
          {sessions.map(s => (
            <div key={s.id} className={`card ${styles.historyItem}`}>
              <div>
                <p className={styles.historyTopic}>{s.interviewType} · {s.difficulty}</p>
                <p className={styles.historyMeta}>{s.questionsAsked} questions · {formatRelative(s.startedAt)}</p>
              </div>
              <div className={styles.historyScore}>
                {s.status === 'COMPLETED' ? `${(s.overallScore * 10).toFixed(0)}%` : 'In Progress'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
