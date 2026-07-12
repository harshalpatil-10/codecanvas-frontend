import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import CanvasBackground from '../../components/landing/CanvasBackground.jsx'
import Logo from '../../components/shared/Logo.jsx'
import styles from '../Login/Login.module.css'
import { authService } from '../../services/authService.js'

export default function Signup() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
  e.preventDefault()
  setError('')
  if (!name.trim() || !email.trim() || !password.trim()) {
    setError('Please fill in all fields.')
    return
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters.')
    return
  }
  setLoading(true)
  try {
    await register(name.trim(), email.trim(), password)
    navigate('/app')
  } catch (err) {
    setError(err.message || 'Could not create account.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className={styles.page}>
      <CanvasBackground />
      <Link to="/" className={styles.brand}><Logo size={50} /> CodeCanvas</Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Build your developer workspace in minutes.</p>

        <form onSubmit={handleSubmit}>
          <div className="formfield">
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" autoFocus />
          </div>
          <div className="formfield">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="johndoe@example.com" />
          </div>
          <div className="formfield">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
          </div>

          {error && <p className="error" style={{ marginBottom: 14, fontSize: 13 }}>{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '13px 0' }}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
