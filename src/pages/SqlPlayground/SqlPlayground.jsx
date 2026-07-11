import React, { useEffect, useState } from 'react'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import Modal from '../../components/app/Modal.jsx'
import { sqlService } from '../../services/sqlService.js'
import { StarIcon } from '../../components/shared/Icons.jsx'
import CodeBlock from '../../components/shared/CodeBlock.jsx'
import styles from './SqlPlayground.module.css'

const EMPTY_FORM = { title: '', query: '', category: 'Joins' }
const CATEGORIES = ['Joins', 'Window Functions', 'CTE', 'Indexes', 'Other']

export default function SqlPlayground() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    try { setLoading(true); setQueries(await sqlService.getAll()); setError('') }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const filtered = queries.filter(q => `${q.title} ${q.category}`.toLowerCase().includes(search.toLowerCase()))

  async function handleCreate() {
    if (!form.title.trim() || !form.query.trim()) { setFormError('Title and query are required.'); return }
    setSaving(true)
    try { await sqlService.create(form); await load(); setModalOpen(false); setForm(EMPTY_FORM) }
    catch (err) { setFormError(err.message) } finally { setSaving(false) }
  }

  async function handleDelete(q) {
    if (!window.confirm(`Delete "${q.title}"?`)) return
    try { await sqlService.remove(q.id); await load() } catch (err) { setError(err.message) }
  }

  async function handleFavorite(q) {
    try { await sqlService.toggleFavorite(q.id); await load() } catch (err) { setError(err.message) }
  }

  if (loading) return <Loader label="Loading SQL playground..." />

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>SQL Playground</h1>
          <p className={styles.subtitle}>{filtered.length} quer{filtered.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setFormError(''); setModalOpen(true) }}>+ New Query</button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}
      <input className={styles.search} placeholder="Search queries..." value={search} onChange={e => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <EmptyState icon="▤" title="No queries yet" subtitle="Save the SQL syntax you always forget." />
      ) : (
        <div className={styles.grid}>
          {filtered.map(q => (
            <div key={q.id} className={`card ${styles.card}`}>
              <div className={styles.cardTop}>
                <span className="badge badge-accent">{q.category}</span>
                <button className={styles.favBtn} onClick={() => handleFavorite(q)}><StarIcon filled={q.favorite} /></button>
              </div>
              <h3 className={styles.cardTitle}>{q.title}</h3>
              <div className={styles.codeWrap}><CodeBlock code={q.query} language="sql" /></div>
              <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => handleDelete(q)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen} title="New SQL Query" onClose={() => setModalOpen(false)} wide
        footer={<><button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleCreate} disabled={saving}>{saving ? 'Saving...' : 'Save Query'}</button></>}
      >
        <div className="formfield"><label>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Inner Join Example" /></div>
        <div className="formfield">
          <label>Category</label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="formfield"><label>Query</label><textarea rows={7} style={{ fontFamily: 'monospace' }} value={form.query} onChange={e => setForm({ ...form, query: e.target.value })} /></div>
        {formError && <p className="error">{formError}</p>}
      </Modal>
    </div>
  )
}
