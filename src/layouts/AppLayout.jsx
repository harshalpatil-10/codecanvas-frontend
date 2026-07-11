import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/app/Sidebar.jsx'
import Topbar from '../components/app/Topbar.jsx'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.layout}>
      <Sidebar open={open} />
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
      <div className={styles.main}>
        <Topbar onMenuClick={() => setOpen(o => !o)} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
