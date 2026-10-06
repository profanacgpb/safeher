import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <main className="welcome-screen">
      <div className="welcome-card">
        <p className="eyebrow">SAFEHER</p>
        <h1>Sua segurança.<br />Sua rede.<br />Seu apoio.</h1>
        <p className="notice">
          O SafeHer é uma ferramenta complementar de segurança e não substitui os serviços oficiais de emergência.
        </p>
        <div className="stacked-actions">
          <Link to="/login" className="primary-button">ENTRAR</Link>
          <Link to="/cadastro" className="secondary-button">CRIAR CONTA</Link>
        </div>
      </div>
    </main>
  )
}
