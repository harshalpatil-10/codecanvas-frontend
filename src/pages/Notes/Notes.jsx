import React, { useEffect, useState } from 'react'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import Modal from '../../components/app/Modal.jsx'
import { noteService } from '../../services/noteService.js'
import { quizService } from '../../services/quizService.js'
import { exportService } from '../../services/exportService.js'
import { formatRelative } from '../../utils/dateUtils.js'
import { StarIcon, SparkleIcon } from '../../components/shared/Icons.jsx'
import styles from './Notes.module.css'

const EMPTY_FORM = { title: '', content: '', type: 'Java' }
const TYPES = ['Java', 'Spring', 'SQL', 'AWS', 'System Design', 'Other']

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [modalMode, setModalMode] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [activeNote, setActiveNote] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [quizOpen, setQuizOpen] = useState(false)
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizData, setQuizData] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      const data = await noteService.getAll()
      setNotes(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filtered = notes.filter(n =>
    `${n.title} ${n.content} ${n.type}`.toLowerCase().includes(search.toLowerCase())
  )

  function openCreate() {
    setForm(EMPTY_FORM); setFormError(''); setModalMode('create')
  }
  function openEdit(note) {
    setForm({ title: note.title, content: note.content, type: note.type })
    setActiveNote(note); setFormError(''); setModalMode('edit')
  }
  function closeModal() { setModalMode(null); setActiveNote(null) }

  async function handleSave() {
    if (!form.title.trim() || !form.content.trim()) {
      setFormError('Title and content are required.')
      return
    }
    setSaving(true)
    try {
      if (modalMode === 'create') {
        await noteService.create(form)
      } else {
        await noteService.update(activeNote.id, form, activeNote.version)
      }
      await load()
      closeModal()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(note) {
    if (!window.confirm(`Delete "${note.title}"? This can't be undone.`)) return
    try {
      await noteService.remove(note.id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleFavorite(note) {
    try {
      await noteService.toggleFavorite(note.id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleGenerateQuiz(note) {
    setQuizOpen(true); setQuizLoading(true); setQuizData(null)
    try {
      const data = await quizService.generate(note.id)
      setQuizData(data)
    } catch (err) {
      setQuizData({ noteTitle: note.title, quizText: 'Could not generate quiz: ' + err.message })
    } finally {
      setQuizLoading(false)
    }
  }

  if (loading) return <Loader label="Loading notes..." />

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Notes</h1>
          <p className={styles.subtitle}>{filtered.length} note{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ New Note</button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <input
        className={styles.search}
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <EmptyState icon="✎" title="No notes yet" subtitle="Create your first note to start building your knowledge base." />
      ) : (
        <div className={styles.grid}>
          {filtered.map(note => (
            <div key={note.id} className={`card ${styles.noteCard}`}>
              <div className={styles.cardTop}>
                <span className="badge badge-accent">{note.type}</span>
                <button className={styles.favBtn} onClick={() => handleFavorite(note)}>
                  <StarIcon filled={note.favorite} />
                </button>
              </div>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.notePreview}>{note.content}</p>
              <p className={styles.noteMeta}>Last viewed {formatRelative(note.lastViewed)}</p>

              <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={() => openEdit(note)}>Edit</button>
                <button className={styles.actionBtn} onClick={() => handleGenerateQuiz(note)}><SparkleIcon /> Quiz</button>
                <button className={styles.actionBtn} onClick={() => exportService.downloadNotePdf(note.id, note.title)}>⬇ PDF</button>
                <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => handleDelete(note)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalMode === 'create' || modalMode === 'edit'}
        title={modalMode === 'create' ? 'New Note' : 'Edit Note'}
        onClose={closeModal}
        wide
        footer={
          <>
            <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Note'}
            </button>
          </>
        }
      >
        <div className="formfield">
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="formfield">
          <label>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="formfield">
          <label>Content (Markdown supported)</label>
          <textarea rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        </div>
        {formError && <p className="error">{formError}</p>}
      </Modal>

      <Modal open={quizOpen} title="✨ AI-Generated Revision Quiz" onClose={() => setQuizOpen(false)}>
        {quizLoading ? (
          <Loader label="Generating quiz from your notes..." />
        ) : (
          <div>
            <p className={styles.quizNoteTitle}>{quizData?.noteTitle}</p>
            <div className={styles.quizText}>{quizData?.quizText}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
