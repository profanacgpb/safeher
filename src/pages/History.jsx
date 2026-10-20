import { useEffect, useState } from 'react'
import { getSosHistory } from '../services/sos'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSosHistory()
      .then(setHistory)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>Histórico</h2>
        {error ? <p className="form-error">{error}</p> : null}
        {loading ? <p role="status">Carregando histórico...</p> : null}
        {!loading && history.length === 0 ? (
          <p className="empty-state">Ainda não há registros de SOS.</p>
        ) : null}
        {!loading && history.length > 0 ? (
          <div className="history-list compact">
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <strong>🔴 SOS iniciado</strong>
                <span>{new Date(entry.inicio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
