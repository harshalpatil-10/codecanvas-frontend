import React, { useEffect, useState } from 'react'
import StatCard from '../../components/app/StatCard.jsx'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import DistributionBar from '../../components/app/DistributionBar.jsx'
import { SnippetIcon, NoteIcon, ApiIcon, SqlIcon, TimelineIcon, SparkleIcon } from '../../components/shared/Icons.jsx'
import { dashboardService } from '../../services/dashboardService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatRelative } from '../../utils/dateUtils.js'
import styles from './Dashboard.module.css'
import { interviewService } from '../../services/interviewService.js'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [interviewStats, setInterviewStats] = useState({ count: 0, avgScore: 0 })

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [s, t, interviews] = await Promise.all([
  dashboardService.getStats(),
  dashboardService.getTimeline(),
  interviewService.getHistory(),
])
const completed = interviews.filter(i => i.status === 'COMPLETED')
const avg = completed.length > 0 ? completed.reduce((sum, i) => sum + i.overallScore, 0) / completed.length : 0
setInterviewStats({ count: interviews.length, avgScore: avg })
        setStats(s)
        setTimeline(t)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Loader label="Loading your dashboard..." />

  const segments = [
    { label: 'Snippets', value: stats?.totalSnippets ?? 0, color: 'var(--accent)' },
    { label: 'Notes', value: stats?.totalNotes ?? 0, color: 'var(--gold)' },
    { label: 'SQL', value: stats?.totalSqlQueries ?? 0, color: 'var(--success)' },
    { label: 'APIs', value: stats?.totalApis ?? 0, color: 'var(--danger)' },
  ]

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.greeting}>Welcome back, {user?.name?.split(' ')[0] || 'there'}.</h1>
        <p className={styles.subtitle}>Here's what your canvas looks like today.</p>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.statGrid}>
        <StatCard label="Snippets" value={stats?.totalSnippets ?? 0} icon={<SnippetIcon />} tone="accent" />
        <StatCard label="Notes" value={stats?.totalNotes ?? 0} icon={<NoteIcon />} tone="accent" />
        <StatCard label="API Requests" value={stats?.totalApis ?? 0} icon={<ApiIcon />} tone="accent" />
        <StatCard label="SQL Queries" value={stats?.totalSqlQueries ?? 0} icon={<SqlIcon />} tone="accent" />
        <StatCard label="Revision Due" value={stats?.revisionDue ?? 0} icon={<TimelineIcon />} tone="gold" />
        <StatCard label="Interviews Taken" value={interviewStats.count} icon={<SparkleIcon />} tone="accent" />

      </div>

      <div className={styles.midRow}>
        <div className={`card ${styles.distCard}`}>
          <h3 className={styles.cardHeading}>Content Distribution</h3>
          <p className={styles.cardSub}>How your knowledge is spread across the canvas.</p>
          <DistributionBar segments={segments} />
        </div>

      <div className={`card ${styles.timelineCard}`}>
        <div className={styles.timelineHeader}>
          <h3>Learning Timeline</h3>
          <span className="badge badge-accent">{timeline.length} entries</span>
        </div>

        {timeline.length === 0 ? (
          <EmptyState icon="◷" title="Nothing here yet" subtitle="Save a note or snippet to start your timeline." />
        ) : (
          <div className={styles.timelineList}>
            {timeline.slice(0, 12).map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <span className={`badge badge-accent ${styles.typeBadge}`}>{item.type}</span>
                <span className={styles.timelineTitle}>{item.title}</span>
                <span className={styles.timelineTime}>{formatRelative(item.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
