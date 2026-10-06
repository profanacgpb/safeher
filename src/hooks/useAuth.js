import { useEffect, useState } from 'react'
import { getCurrentUser, logoutUser } from '../services/auth'

export function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser())

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser())
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return { user, setUser, logout }
}
