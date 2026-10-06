import { useMemo } from 'react'
import { getSosHistory } from '../services/sos'

export default function History() {
  const history = useMemo(() => getSosHistory(), [])

  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>Histórico</h2>
        {history.length === 0 ? (
          <p className="empty-state">Ainda não há registros de SOS.</p>
        ) : (
          <div className="history-list compact">
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <strong>🔴 SOS iniciado</strong>
                <span>{new Date(entry.inicio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
