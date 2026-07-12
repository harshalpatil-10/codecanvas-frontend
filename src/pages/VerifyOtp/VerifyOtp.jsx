import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/authService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import CanvasBackground from '../../components/landing/CanvasBackground.jsx'
import Logo from '../../components/shared/Logo.jsx'
import styles from '../Login/Login.module.css'

export default function VerifyOtp() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const email = location.state?.email || ''

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  async function handleVerify(e) {
    e.preventDefault()
    setError(''); setInfo('')
    if (!otp.trim()) { setError('Enter the OTP sent to your email.'); return }
    setLoading(true)
    try {
      const data = await authService.verifyOtp({ email, otp: otp.trim() })
      localStorage.setItem('codecanvas_token', data.token)
      localStorage.setItem('codecanvas_user', JSON.stringify({ name: data.name, email: data.email }))
      navigate('/app')
      window.location.reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResending(true); setError(''); setInfo('')
    try {
      await authService.resendOtp({ email })
      setInfo('A new OTP has been sent to your email.')
    } catch (err) {
      setError(err.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className={styles.page}>
      <CanvasBackground />
      <Link to="/" className={styles.brand}><Logo size={20} /> CodeCanvas</Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Verify your email</h1>
        <p className={styles.subtitle}>We sent a 6-digit code to <b>{email}</b></p>

        <form onSubmit={handleVerify}>
          <div className="formfield">
            <label>OTP Code</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6} autoFocus />
          </div>

          {error && <p className="error" style={{ marginBottom: 14, fontSize: 13 }}>{error}</p>}
          {info && <p style={{ color: 'var(--success)', fontSize: 13, marginBottom: 14 }}>{info}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '13px 0' }}>
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <p className={styles.footerText}>
          Didn't get it?{' '}
          <button onClick={handleResend} disabled={resending} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        </p>
      </div>
    </div>
  )
}
