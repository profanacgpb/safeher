import { useEffect, useState } from 'react'
import { getCurrentUser, logoutUser } from '../services/auth'
import { isSupabaseConfigured, supabase } from '../services/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined
    }

    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { ...session.user, nome: session.user.user_metadata?.nome || '' } : null)
      setLoading(false)
    })

    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch((error) => {
        console.error('Não foi possível restaurar a sessão:', error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await logoutUser()
  }

  return { user, setUser, logout, loading }
}
