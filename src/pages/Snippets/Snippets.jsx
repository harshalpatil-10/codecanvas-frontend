import React, { useEffect, useState } from 'react'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import Modal from '../../components/app/Modal.jsx'
import { snippetService } from '../../services/snippetService.js'
import { StarIcon } from '../../components/shared/Icons.jsx'
import CodeBlock from '../../components/shared/CodeBlock.jsx'
import styles from './Snippets.module.css'

const EMPTY_FORM = { title: '', language: 'Java', code: '', difficulty: 'Easy', tags: '' }
const LANGUAGES = ['Java', 'Python', 'JavaScript', 'SQL', 'C++', 'Other']
const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export default function Snippets() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      setSnippets(await snippetService.getAll())
      setError('')
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const filtered = snippets.filter(s =>
    `${s.title} ${s.language} ${s.tags}`.toLowerCase().includes(search.toLowerCase())
  )

  async function handleCreate() {
    if (!form.title.trim() || !form.code.trim()) { setFormError('Title and code are required.'); return }
    setSaving(true)
    try {
      await snippetService.create(form)
      await load()
      setModalOpen(false)
      setForm(EMPTY_FORM)
    } catch (err) { setFormError(err.message) } finally { setSaving(false) }
  }

  async function handleDelete(s) {
    if (!window.confirm(`Delete "${s.title}"?`)) return
    try { await snippetService.remove(s.id); await load() } catch (err) { setError(err.message) }
  }

  async function handleFavorite(s) {
    try { await snippetService.toggleFavorite(s.id); await load() } catch (err) { setError(err.message) }
  }

  if (loading) return <Loader label="Loading snippets..." />

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Snippets</h1>
          <p className={styles.subtitle}>{filtered.length} snippet{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setFormError(''); setModalOpen(true) }}>+ New Snippet</button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <input className={styles.search} placeholder="Search snippets..." value={search} onChange={e => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <EmptyState icon="⌘" title="No snippets yet" subtitle="Save your first reusable code snippet." />
      ) : (
        <div className={styles.grid}>
          {filtered.map(s => (
            <div key={s.id} className={`card ${styles.card}`}>
              <div className={styles.cardTop}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-accent">{s.language}</span>
                  <span className="badge badge-gold">{s.difficulty}</span>
                </div>
                <button className={styles.favBtn} onClick={() => handleFavorite(s)}><StarIcon filled={s.favorite} /></button>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <div className={styles.codeWrap}><CodeBlock code={s.code} language={s.language} /></div>
              {s.tags && <p className={styles.tags}>{s.tags.split(',').map(t => `#${t.trim()}`).join('  ')}</p>}
              <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => handleDelete(s)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title="New Snippet"
        onClose={() => setModalOpen(false)}
        wide
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCreate} disabled={saving}>{saving ? 'Saving...' : 'Save Snippet'}</button>
          </>
        }
      >
        <div className="formfield"><label>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
        <div style={{ display: 'flex', gap: 14 }}>
          <div className="formfield" style={{ flex: 1 }}>
            <label>Language</label>
            <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="formfield" style={{ flex: 1 }}>
            <label>Difficulty</label>
            <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="formfield"><label>Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Array, Binary Search" /></div>
        <div className="formfield"><label>Code</label><textarea rows={7} style={{ fontFamily: 'monospace' }} value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} /></div>
        {formError && <p className="error">{formError}</p>}
      </Modal>
    </div>
  )
}
