import React from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { SunIcon, MoonIcon } from './Icons.jsx'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className={styles.toggle} onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
      <span className={`${styles.track} ${theme === 'dark' ? styles.dark : ''}`}>
        <span className={styles.thumb}>
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </span>
      </span>
    </button>
  )
}
