import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth'

export default function Login({ onAuth }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await loginUser(form)
      onAuth?.(user)
      navigate('/app')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            <span>E-mail</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Senha</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
          <button type="button" className="secondary-button ghost-button">
            ESQUECI MINHA SENHA
          </button>
        </form>
        <p className="helper-text">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}
