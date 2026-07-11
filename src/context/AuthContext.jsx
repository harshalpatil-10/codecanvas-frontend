import React, { createContext, useContext, useState } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('codecanvas_user')
    return stored ? JSON.parse(stored) : null
  })

  async function login(email, password) {
    const data = await authService.login({ email, password })
    persist(data)
    return data
  }

  async function register(name, email, password) {
    const data = await authService.register({ name, email, password })
    persist(data)
    return data
  }

  function persist(data) {
    localStorage.setItem('codecanvas_token', data.token)
    const u = { name: data.name, email: data.email }
    localStorage.setItem('codecanvas_user', JSON.stringify(u))
    setUser(u)
  }

  function logout() {
    localStorage.removeItem('codecanvas_token')
    localStorage.removeItem('codecanvas_user')
    setUser(null)
  }

  function refreshUser(updated) {
    // Profile updates (especially email changes) return a fresh JWT, since the
    // old token's embedded email claim would otherwise point at a stale/nonexistent
    // user record. Must persist the new token, not just the display name/email.
    if (updated.token) {
      localStorage.setItem('codecanvas_token', updated.token)
    }
    const u = { name: updated.name, email: updated.email }
    localStorage.setItem('codecanvas_user', JSON.stringify(u))
    setUser(u)
  }

  function isAuthenticated() {
    return !!localStorage.getItem('codecanvas_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
