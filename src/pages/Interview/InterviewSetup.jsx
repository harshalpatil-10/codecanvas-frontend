import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/app/Loader.jsx'
import { noteService } from '../../services/noteService.js'
import { snippetService } from '../../services/snippetService.js'
import { sqlService } from '../../services/sqlService.js'
import { interviewService } from '../../services/interviewService.js'
import styles from './Interview.module.css'

export default function InterviewSetup() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [snippets, setSnippets] = useState([])
  const [sqlQueries, setSqlQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [starting, setStarting] = useState(false)

  const [selectedNotes, setSelectedNotes] = useState([])
  const [selectedSnippets, setSelectedSnippets] = useState([])
  const [selectedSql, setSelectedSql] = useState([])
  const [difficulty, setDifficulty] = useState('Intermediate')
  const [interviewType, setInterviewType] = useState('Technical')
  const [questionCount, setQuestionCount] = useState(5)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      const [n, s, q] = await Promise.all([noteService.getAll(), snippetService.getAll(), sqlService.getAll()])
      setNotes(n); setSnippets(s); setSqlQueries(q)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function toggle(list, setList, id) {
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])
  }

  async function handleStart() {
    if (selectedNotes.length + selectedSnippets.length + selectedSql.length === 0) {
      setError('Select at least one note, snippet, or SQL query.')
      return
    }
    setStarting(true); setError('')
    try {
      const result = await interviewService.start({
        noteIds: selectedNotes,
        snippetIds: selectedSnippets,
        sqlIds: selectedSql,
        difficulty,
        interviewType,
        questionCount,
      })
      navigate(`/app/interview/session/${result.sessionId}`, { state: { firstQuestion: result } })
    } catch (err) {
      setError(err.message)
    } finally {
      setStarting(false)
    }
  }

  if (loading) return <Loader label="Loading your content..." />

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>🎯 AI Interview Setup</h1>
      <p className={styles.subtitle}>Select the content you want to be quizzed on — CodeCanvas builds a fresh interview from it every time.</p>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>Notes</h3>
        {notes.length === 0 ? <p className={styles.empty}>No notes saved yet.</p> : (
          <div className={styles.checkGrid}>
            {notes.map(n => (
              <label key={n.id} className={styles.checkItem}>
                <input type="checkbox" checked={selectedNotes.includes(n.id)} onChange={() => toggle(selectedNotes, setSelectedNotes, n.id)} />
                {n.title} <span className={styles.tag}>{n.type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>Snippets</h3>
        {snippets.length === 0 ? <p className={styles.empty}>No snippets saved yet.</p> : (
          <div className={styles.checkGrid}>
            {snippets.map(s => (
              <label key={s.id} className={styles.checkItem}>
                <input type="checkbox" checked={selectedSnippets.includes(s.id)} onChange={() => toggle(selectedSnippets, setSelectedSnippets, s.id)} />
                {s.title} <span className={styles.tag}>{s.language}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>SQL Queries</h3>
        {sqlQueries.length === 0 ? <p className={styles.empty}>No SQL queries saved yet.</p> : (
          <div className={styles.checkGrid}>
            {sqlQueries.map(q => (
              <label key={q.id} className={styles.checkItem}>
                <input type="checkbox" checked={selectedSql.includes(q.id)} onChange={() => toggle(selectedSql, setSelectedSql, q.id)} />
                {q.title} <span className={styles.tag}>{q.category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>Interview Settings</h3>
        <div className={styles.settingsRow}>
          <div className="formfield" style={{ flex: 1 }}>
            <label>Difficulty</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </div>
          <div className="formfield" style={{ flex: 1 }}>
            <label>Interview Type</label>
            <select value={interviewType} onChange={e => setInterviewType(e.target.value)}>
              <option>Technical</option><option>HR</option><option>Coding</option><option>Rapid Fire</option>
            </select>
          </div>
          <div className="formfield" style={{ flex: 1 }}>
            <label>Number of Questions</label>
            <select value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))}>
              <option value={3}>3</option><option value={5}>5</option><option value={10}>10</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleStart} disabled={starting} style={{ width: '100%', padding: '13px 0', marginTop: 10 }}>
          {starting ? 'Preparing interview...' : 'Start Interview →'}
        </button>
      </div>
    </div>
  )
}
