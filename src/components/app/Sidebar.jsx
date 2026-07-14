import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../shared/Logo.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { DashboardIcon, NoteIcon, SnippetIcon, SqlIcon, ApiIcon, SearchIcon, SettingsIcon, LogoutIcon ,SparkleIcon } from '../shared/Icons.jsx'
import styles from './Sidebar.module.css'

const ITEMS = [
  { to: '/app', label: 'Dashboard', Icon: DashboardIcon, end: true },
  { to: '/app/notes', label: 'Notes', Icon: NoteIcon },
  { to: '/app/snippets', label: 'Snippets', Icon: SnippetIcon },
  { to: '/app/sql', label: 'SQL Playground', Icon: SqlIcon },
  { to: '/app/api-collection', label: 'API Collection', Icon: ApiIcon },
  { to: '/app/search', label: 'Search', Icon: SearchIcon },
  { to: '/app/interview', label: 'AI Interview', Icon: SparkleIcon },
]

export default function Sidebar({ open }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <div className={styles.logo}><Logo size={26} /> <span>Code</span><span style={{ color: 'var(--accent)' }}>Canvas</span></div>
      <nav className={styles.nav}>
        {ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}><item.Icon /></span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        <NavLink to="/app/settings" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
          <span className={styles.icon}><SettingsIcon /></span>
          Settings
        </NavLink>
        <div className={styles.profileRow}>
          <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <span className={styles.profileName}>{user?.name || 'User'}</span>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Log out"><LogoutIcon /></button>
        </div>
      </div>
    </aside>
  )
}
