import React, { useEffect, useState } from 'react'
import Loader from '../../components/app/Loader.jsx'
import EmptyState from '../../components/app/EmptyState.jsx'
import Modal from '../../components/app/Modal.jsx'
import { apiCollectionService } from '../../services/apiCollectionService.js'
import { StarIcon } from '../../components/shared/Icons.jsx'
import styles from './ApiCollection.module.css'

const EMPTY_FORM = { method: 'GET', url: '', headers: '', body: '', exampleResponse: '', description: '' }
const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const METHOD_COLORS = { GET: 'badge-success', POST: 'badge-accent', PUT: 'badge-gold', DELETE: 'badge-danger', PATCH: 'badge-gold' }

export default function ApiCollection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    try { setLoading(true); setItems(await apiCollectionService.getAll()); setError('') }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const filtered = items.filter(i => `${i.url} ${i.description}`.toLowerCase().includes(search.toLowerCase()))

  async function handleCreate() {
    if (!form.url.trim()) { setFormError('URL is required.'); return }
    setSaving(true)
    try { await apiCollectionService.create(form); await load(); setModalOpen(false); setForm(EMPTY_FORM) }
    catch (err) { setFormError(err.message) } finally { setSaving(false) }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.url}"?`)) return
    try { await apiCollectionService.remove(item.id); await load() } catch (err) { setError(err.message) }
  }

  async function handleFavorite(item) {
    try { await apiCollectionService.toggleFavorite(item.id); await load() } catch (err) { setError(err.message) }
  }

  if (loading) return <Loader label="Loading API collection..." />

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>API Collection</h1>
          <p className={styles.subtitle}>{filtered.length} request{filtered.length !== 1 ? 's' : ''} saved</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setFormError(''); setModalOpen(true) }}>+ New Request</button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}
      <input className={styles.search} placeholder="Search API requests..." value={search} onChange={e => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <EmptyState icon="⇄" title="No API requests saved" subtitle="Save requests you'd normally keep in Postman." />
      ) : (
        <div className={styles.list}>
          {filtered.map(item => (
            <div key={item.id} className={`card ${styles.row}`}>
              <span className={`badge ${METHOD_COLORS[item.method] || 'badge-accent'}`}>{item.method}</span>
              <div className={styles.rowContent}>
                <p className={styles.url}>{item.url}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
              <button className={styles.favBtn} onClick={() => handleFavorite(item)}><StarIcon filled={item.favorite} /></button>
              <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => handleDelete(item)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen} title="New API Request" onClose={() => setModalOpen(false)} wide
        footer={<><button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleCreate} disabled={saving}>{saving ? 'Saving...' : 'Save Request'}</button></>}
      >
        <div style={{ display: 'flex', gap: 14 }}>
          <div className="formfield" style={{ width: 120 }}>
            <label>Method</label>
            <select value={form.method} onChange={e => setForm({ ...form, method: e.target.value })}>
              {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="formfield" style={{ flex: 1 }}>
            <label>URL</label>
            <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="/api/auth/login" />
          </div>
        </div>
        <div className="formfield"><label>Description</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <div className="formfield"><label>Headers</label><textarea rows={2} value={form.headers} onChange={e => setForm({ ...form, headers: e.target.value })} placeholder="Content-Type: application/json" /></div>
        <div className="formfield"><label>Body</label><textarea rows={3} style={{ fontFamily: 'monospace' }} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} /></div>
        <div className="formfield"><label>Example Response</label><textarea rows={3} style={{ fontFamily: 'monospace' }} value={form.exampleResponse} onChange={e => setForm({ ...form, exampleResponse: e.target.value })} /></div>
        {formError && <p className="error">{formError}</p>}
      </Modal>
    </div>
  )
}
