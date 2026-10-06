const SOS_KEY = 'safeher_sos_sessions'

export function getSosHistory() {
  try {
    const sessions = JSON.parse(localStorage.getItem(SOS_KEY) || '[]')
    return Array.isArray(sessions) ? sessions : []
  } catch {
    return []
  }
}

export function createSosSession({ latitude, longitude, userId = 'demo-user' }) {
  const now = new Date()
  const record = {
    id: crypto.randomUUID(),
    usuario_id: userId,
    inicio: now.toISOString(),
    fim: null,
    latitude,
    longitude,
    status: 'ATIVO',
    created_at: now.toISOString(),
  }

  const sessions = getSosHistory()
  sessions.unshift(record)
  localStorage.setItem(SOS_KEY, JSON.stringify(sessions))
  return record
}

export function closeSosSession(id) {
  const sessions = getSosHistory().map((session) =>
    session.id === id ? { ...session, status: 'ENCERRADO', fim: new Date().toISOString() } : session,
  )
  localStorage.setItem(SOS_KEY, JSON.stringify(sessions))
  return sessions
}
