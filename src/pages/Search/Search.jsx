import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../../components/app/EmptyState.jsx'
import Loader from '../../components/app/Loader.jsx'
import { searchService } from '../../services/searchService.js'
import styles from './Search.module.css'

const TYPE_BADGES = { note: 'badge-accent', snippet: 'badge-gold', sql: 'badge-success', api: 'badge-danger' }

export default function Search() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [keyword, setKeyword] = useState(initialQuery)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialQuery) runSearch(initialQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  async function runSearch(term) {
    setLoading(true); setError('')
    try {
      const data = await searchService.search(term)
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!keyword.trim()) return
    runSearch(keyword.trim())
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Search</h1>
        <p className={styles.subtitle}>Search across notes, snippets, SQL queries, and API requests — all at once.</p>
      </div>

      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Try searching 'jwt', 'binary search', 'join'..."
          autoFocus
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {loading && <Loader label="Searching..." />}

      {!loading && results && results.length === 0 && (
        <EmptyState icon="◈" title="No results found" subtitle={`Nothing matched "${keyword}" across your workspace.`} />
      )}

      {!loading && results && results.length > 0 && (
        <div className={styles.results}>
          {results.map((r, i) => (
            <div key={i} className={`card ${styles.resultCard}`}>
              <span className={`badge ${TYPE_BADGES[r.type] || 'badge-accent'}`}>{r.type}</span>
              <div className={styles.resultBody}>
                <p className={styles.resultTitle}>{r.title}</p>
                <p className={styles.resultSnippet}>{r.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!results && !loading && (
        <EmptyState icon="◈" title="Search your second brain" subtitle="Results from notes, snippets, SQL, and API collection appear here." />
      )}
    </div>
  )
}
