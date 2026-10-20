import { requireSupabase } from './supabase'

function toAppUser(user) {
  if (!user) return null

  return {
    ...user,
    nome: user.user_metadata?.nome || '',
  }
}

export async function getCurrentUser() {
  const client = requireSupabase()
  const { data, error } = await client.auth.getSession()

  if (error) throw error
  return toAppUser(data.session?.user)
}

export async function loginUser({ email, password }) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signInWithPassword({ email, password })

  if (error) throw error
  return toAppUser(data.user)
}

export async function registerUser({ nome, email, password }) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { nome } },
  })

  if (error) throw error
  return toAppUser(data.user)
}

export async function logoutUser() {
  const client = requireSupabase()
  const { error } = await client.auth.signOut()

  if (error) throw error
}
