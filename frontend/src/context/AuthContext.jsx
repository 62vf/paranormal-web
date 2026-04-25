import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/authApi'
import { toErrorMessage } from '../utils/helpers'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('paranormal_user')
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(false)

  const clearSession = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('paranormal_user')
    setToken('')
    setUser(null)
  }

  useEffect(() => {
    const onExpired = () => clearSession()
    window.addEventListener('paranormal:auth-expired', onExpired)
    return () => window.removeEventListener('paranormal:auth-expired', onExpired)
  }, [])

  const register = async (payload) => {
    setLoading(true)
    try {
      const data = await authApi.register(payload)
      setUser(data.user || null)
      if (data.user) {
        localStorage.setItem('paranormal_user', JSON.stringify(data.user))
      }
      if (data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      }
      return data
    } catch (error) {
      throw new Error(toErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const login = async (payload) => {
    setLoading(true)
    try {
      const data = await authApi.login(payload)
      const guessedUser = {
        email: payload.email,
      }
      setUser(guessedUser)
      localStorage.setItem('paranormal_user', JSON.stringify(guessedUser))
      if (data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      }
      return data
    } catch (error) {
      throw new Error(toErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await authApi.logout()
    clearSession()
  }

  const isAuthenticated = Boolean(token)

  const value = useMemo(
    () => ({ user, token, isAuthenticated, loading, register, login, logout }),
    [user, token, isAuthenticated, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
