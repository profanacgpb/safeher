import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogout = async () => {
    setError('')
    try {
      await onLogout()
      navigate('/login')
    } catch (logoutError) {
      setError(logoutError.message || 'Não foi possível sair da conta.')
    }
  }

  return (
    <main className="page-shell">
      <section className="content-section profile-section">
        <h2>Meu perfil</h2>
        {error ? <p className="form-error">{error}</p> : null}
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
