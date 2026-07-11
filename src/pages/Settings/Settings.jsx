import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { authService } from '../../services/authService.js'
import styles from './Settings.module.css'

export default function Settings() {
  const { user, refreshUser } = useAuth()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [profileMsg, setProfileMsg] = useState(null)
  const [savingProfile, setSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState(null)
  const [savingPassword, setSavingPassword] = useState(false)

  async function handleSaveProfile(e) {
    e.preventDefault()
    setProfileMsg(null)
    if (!name.trim() || !email.trim()) {
      setProfileMsg({ type: 'error', text: 'Name and email are required.' })
      return
    }
    setSavingProfile(true)
    try {
      const updated = await authService.updateProfile({ name: name.trim(), email: email.trim() })
      refreshUser?.(updated)
      setProfileMsg({ type: 'success', text: 'Profile updated.' })
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message })
    } finally {
      setSavingProfile(false)
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setPasswordMsg(null)
    if (!currentPassword || !newPassword) {
      setPasswordMsg({ type: 'error', text: 'Both fields are required.' })
      return
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }
    setSavingPassword(true)
    try {
      await authService.changePassword({ currentPassword, newPassword })
      setPasswordMsg({ type: 'success', text: 'Password changed successfully.' })
      setCurrentPassword(''); setNewPassword('')
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message })
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Settings</h1>

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>Profile</h3>
        <p className={styles.sectionSub}>This is how you appear across CodeCanvas.</p>

        <form onSubmit={handleSaveProfile}>
          <div className="formfield">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="formfield">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          {profileMsg && (
            <p className={profileMsg.type === 'error' ? 'error' : styles.success} style={{ marginBottom: 14 }}>
              {profileMsg.text}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={savingProfile}>
            {savingProfile ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      </div>

      <div className={`card ${styles.section}`}>
        <h3 className={styles.sectionTitle}>Password</h3>
        <p className={styles.sectionSub}>Choose something you don't use anywhere else.</p>

        <form onSubmit={handleChangePassword}>
          <div className="formfield">
            <label>Current password</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </div>
          <div className="formfield">
            <label>New password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>

          {passwordMsg && (
            <p className={passwordMsg.type === 'error' ? 'error' : styles.success} style={{ marginBottom: 14 }}>
              {passwordMsg.text}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={savingPassword}>
            {savingPassword ? 'Changing...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  )
}
