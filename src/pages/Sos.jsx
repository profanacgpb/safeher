import { useEffect, useState } from 'react'
import SosButton from '../components/SosButton'
import ConfirmDialog from '../components/ConfirmDialog'
import { requestLocation, buildLocationUrl } from '../services/location'
import { shareLocation } from '../services/sharing'
import { createSosSession, closeSosSession, getSosHistory } from '../services/sos'

export default function Sos() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sosActive, setSosActive] = useState(false)
  const [sessionInfo, setSessionInfo] = useState(null)
  const [confirmingExit, setConfirmingExit] = useState(false)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    getSosHistory()
      .then((sessions) => {
        setHistory(sessions)
        const activeSession = sessions.find((session) => session.status === 'ATIVO')
        if (activeSession) {
          setSessionInfo({
            ...activeSession,
            url: buildLocationUrl(activeSession.latitude, activeSession.longitude),
          })
          setSosActive(true)
        }
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setHistoryLoading(false))
  }, [])

  const startSos = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const location = await requestLocation()
      const session = await createSosSession({
        latitude: location.latitude,
        longitude: location.longitude,
      })

      const url = buildLocationUrl(location.latitude, location.longitude)
      setSessionInfo({ ...session, latitude: location.latitude, longitude: location.longitude, url })
      setSosActive(true)
      setHistory((current) => [session, ...current])
      setMessage('Link de localização gerado. Use o compartilhamento do seu dispositivo para enviá-lo à sua rede de apoio.')
    } catch (locationError) {
      setError(locationError.message || 'Não foi possível iniciar o SOS.')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (!sessionInfo?.url) return
    setSharing(true)
    setError('')
    try {
      const result = await shareLocation(sessionInfo.url)
      setMessage(result.message)
    } catch (shareError) {
      setError(shareError.message || 'Não foi possível compartilhar a localização.')
    } finally {
      setSharing(false)
    }
  }

  const handleClose = async () => {
    if (!sessionInfo) return
    setClosing(true)
    setError('')
    try {
      const closedSession = await closeSosSession(sessionInfo.id)
      setHistory((current) => current.map((entry) => entry.id === closedSession.id ? closedSession : entry))
      setSosActive(false)
      setMessage('SOS encerrado com sucesso.')
      setSessionInfo(null)
      setConfirmingExit(false)
    } catch (closeError) {
      setError(closeError.message || 'Não foi possível encerrar o SOS.')
      setConfirmingExit(false)
    } finally {
      setClosing(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>{sosActive ? 'SOS ATIVO' : 'SOS'}</h2>

        {error ? <p className="form-error">{error}</p> : null}
        {message ? <p className="success-line">{message}</p> : null}

        {!sosActive ? (
          <div className="sos-panel inline">
            <SosButton onClick={startSos} loading={loading} />
          </div>
        ) : (
          <div className="sos-active-card">
            <p className="small-label">Início: {new Date(sessionInfo?.inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>📍 Localização obtida</p>
            <p>Latitude: {sessionInfo?.latitude}</p>
            <p>Longitude: {sessionInfo?.longitude}</p>
            <div className="stacked-actions vertical">
              <button type="button" className="primary-button" onClick={handleShare} disabled={sharing}>
                {sharing ? 'ABRINDO COMPARTILHAMENTO...' : 'COMPARTILHAR LOCALIZAÇÃO'}
              </button>
              <a href="tel:190" className="secondary-button">LIGAR 190</a>
              <a href="tel:180" className="secondary-button">LIGAR 180</a>
              <button type="button" className="danger-button" onClick={() => setConfirmingExit(true)}>ENCERRAR SOS</button>
            </div>
          </div>
        )}

        <div className="history-block">
          <h3>Histórico</h3>
          {historyLoading ? <p role="status">Carregando histórico...</p> : null}
          {!historyLoading && history.length === 0 ? (
            <p className="empty-state">Nenhum SOS registrado ainda.</p>
          ) : null}
          {!historyLoading && history.length > 0 ? (
            <ul className="history-list">
              {history.slice(0, 3).map((entry) => (
                <li key={entry.id}>
                  <strong>🔴 SOS iniciado</strong>
                  <span>{new Date(entry.inicio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <ConfirmDialog
        open={confirmingExit}
        title="Deseja realmente encerrar o SOS?"
        message="A sessão será encerrada e o status atualizado."
        onCancel={() => setConfirmingExit(false)}
        onConfirm={handleClose}
        loading={closing}
      />
    </main>
  )
}
