import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

export default function Profile({ onLogout }) {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = async () => {
    await onLogout()
    navigate('/login')
  }

  return (
    <main className="page-shell">
      <section className="content-section profile-section">
        <h2>Meu perfil</h2>
        <div className="profile-card">
          <p><strong>Nome</strong></p>
          <p>{user?.nome || 'Usuária Demo'}</p>
          <p><strong>E-mail</strong></p>
          <p>{user?.email || 'demo@safeher.app'}</p>
        </div>
        <div className="stacked-actions vertical">
          <button type="button" className="secondary-button">EDITAR PERFIL</button>
          <button type="button" className="danger-button" onClick={handleLogout}>SAIR</button>
        </div>
      </section>
    </main>
  )
}
