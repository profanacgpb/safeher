import { Link } from 'react-router-dom'
import SosButton from '../components/SosButton'
import { getContacts } from '../services/contacts'
import { useMemo } from 'react'

export default function Home({ user, onSos }) {
  const contacts = useMemo(() => getContacts(), [])

  return (
    <main className="page-shell">
      <section className="content-section">
        <div className="welcome-block">
          <p className="eyebrow">SAFEHER</p>
          <h2>Olá, {user?.nome || 'Ana'}!</h2>
          <p className="subheading">Você está segura?</p>
        </div>

        <div className="sos-panel">
          <SosButton onClick={onSos} />
        </div>

        <div className="feature-box">
          <div className="feature-header">
            <span className="feature-dot" />
            <strong>Rede de apoio</strong>
          </div>
          <p>{contacts.length > 0 ? `${contacts.length} contato(s) cadastrado(s)` : 'Cadastre contatos de confiança'}</p>
        </div>

        <div className="quick-actions">
          <Link to="/app/contatos" className="secondary-button wide-button">MEUS CONTATOS</Link>
        </div>

        <div className="emergency-grid">
          <a href="tel:190" className="emergency-button primary" aria-label="Ligar para 190">
            <span>190</span>
            <small>Emergência</small>
          </a>
          <a href="tel:180" className="emergency-button secondary" aria-label="Ligar para 180">
            <span>180</span>
            <small>Apoio</small>
          </a>
        </div>

        <div className="quick-actions">
          <Link to="/app/aprender" className="secondary-button wide-button">APRENDER</Link>
        </div>

        <Link to="/app/demo" className="secondary-button demo-button">MODO DEMONSTRAÇÃO</Link>

        {contacts.length === 0 ? (
          <p className="empty-state small">Você ainda não cadastrou contatos de confiança.</p>
        ) : null}
      </section>
    </main>
  )
}
