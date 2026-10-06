const SESSION_KEY = 'safeher_session'
const USERS_KEY = 'safeher_users'

export function getStoredSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

export function getCurrentUser() {
  const session = getStoredSession()
  if (!session) return null

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  return users.find((user) => user.id === session.userId) || null
}

export async function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const user = users.find(
    (item) => item.email === email && item.password === password,
  )

  if (!user) {
    throw new Error('E-mail ou senha inválidos.')
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ userId: user.id, email: user.email }),
  )
  return user
}

export async function registerUser({ nome, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const existing = users.find((user) => user.email === email)

  if (existing) {
    throw new Error('Este e-mail já está cadastrado.')
  }

  const user = {
    id: crypto.randomUUID(),
    nome,
    email,
    password,
    created_at: new Date().toISOString(),
  }

  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ userId: user.id, email: user.email }),
  )
  return user
}

export async function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
  return true
}
