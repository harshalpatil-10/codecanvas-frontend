import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon } from '../shared/Icons.jsx'
import styles from './Topbar.module.css'

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) navigate(`/app/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={styles.bar}>
      <button className={styles.menuBtn} onClick={onMenuClick}><MenuIcon /></button>

      <form className={styles.searchWrap} onSubmit={handleSubmit}>
        <SearchIcon className={styles.searchIcon} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search your canvas..."
          className={styles.searchInput}
        />
        <kbd className={styles.kbd}>⌘K</kbd>
      </form>

      <div className={styles.spacer} />
    </header>
  )
}
