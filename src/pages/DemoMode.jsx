import { useState } from 'react'
import { Link } from 'react-router-dom'
import { buildLocationUrl, getDemoLocation } from '../services/location'

export default function DemoMode() {
  const [active, setActive] = useState(false)
  const location = getDemoLocation()
  const url = buildLocationUrl(location.latitude, location.longitude)

  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>Modo demonstração</h2>
        <p className="notice">
          Este modo não envia alertas reais. Use esta funcionalidade para apresentações, aulas, feiras científicas e demonstrações.
        </p>

        {!active ? (
          <button type="button" className="primary-button" onClick={() => setActive(true)}>
            SIMULAR SOS
          </button>
        ) : (
          <div className="demo-card">
            <p className="small-label">SOS SIMULADO</p>
            <p>Localização simulada obtida.</p>
            <ul className="demo-list">
              <li>Contato Demo 1</li>
              <li>Contato Demo 2</li>
            </ul>
            <div className="stacked-actions vertical">
              <a href={url} target="_blank" rel="noreferrer" className="secondary-button">
                SIMULAR COMPARTILHAMENTO
              </a>
              <button type="button" className="danger-button" onClick={() => setActive(false)}>
                ENCERRAR DEMONSTRAÇÃO
              </button>
            </div>
          </div>
        )}

        <Link to="/app" className="secondary-button">VOLTAR</Link>
      </section>
    </main>
  )
}
