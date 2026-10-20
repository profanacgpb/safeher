import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, user, loading }) {
  if (loading) {
    return <main className="page-shell"><p role="status">Carregando...</p></main>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
