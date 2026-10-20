import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', password: '' })
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
      await registerUser(form)
      navigate('/onboarding')
    } catch (registerError) {
      setError(registerError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            <span>Nome</span>
            <input name="nome" type="text" value={form.nome} onChange={handleChange} required />
          </label>
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
            {loading ? 'CADASTRANDO...' : 'CRIAR CONTA'}
          </button>
        </form>
        <p className="helper-text">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </main>
  )
}
