const safeStorage = {
  get(key, fallback = []) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

export const supabase = {
  auth: {
    async signUp({ email, password }) {
      const users = safeStorage.get('safeher_users', [])
      const existing = users.find((user) => user.email === email)

      if (existing) {
        return { data: { user: null }, error: { message: 'Usuária já cadastrada.' } }
      }

      const user = {
        id: crypto.randomUUID(),
        email,
        password,
        nome: 'Usuária Demo',
        created_at: new Date().toISOString(),
      }

      users.push(user)
      safeStorage.set('safeher_users', users)
      return { data: { user }, error: null }
    },

    async signInWithPassword({ email, password }) {
      const users = safeStorage.get('safeher_users', [])
      const user = users.find(
        (item) => item.email === email && item.password === password,
      )

      if (!user) {
        return {
          data: { user: null },
          error: { message: 'E-mail ou senha inválidos.' },
        }
      }

      safeStorage.set('safeher_session', { userId: user.id, email: user.email })
      return { data: { user }, error: null }
    },

    async signOut() {
      localStorage.removeItem('safeher_session')
      return { error: null }
    },
  },
  from(table) {
    return {
      select: () => ({ data: safeStorage.get(`safeher_${table}`, []), error: null }),
      insert: (rows) => {
        const current = safeStorage.get(`safeher_${table}`, [])
        const next = Array.isArray(rows) ? rows : [rows]
        const updated = [...current, ...next]
        safeStorage.set(`safeher_${table}`, updated)
        return { data: next, error: null }
      },
      update: (updates) => {
        const current = safeStorage.get(`safeher_${table}`, [])
        const updated = current.map((item) => ({ ...item, ...updates }))
        safeStorage.set(`safeher_${table}`, updated)
        return { data: updated, error: null }
      },
      delete: () => ({ data: [], error: null }),
      eq: (field, value) => {
        const current = safeStorage.get(`safeher_${table}`, [])
        return {
          data: current.filter((item) => item[field] === value),
          error: null,
        }
      },
    }
  },
}
