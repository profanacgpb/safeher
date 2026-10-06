import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, Link } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import History from './pages/History'
import Learn from './pages/Learn'
import ContentDetail from './pages/ContentDetail'
import Profile from './pages/Profile'
import Sos from './pages/Sos'
import DemoMode from './pages/DemoMode'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import './App.css'

function AppLayout({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">SAFEHER</div>
        <nav className="sidebar-nav" aria-label="Menu lateral">
          <Link to="/app">Início</Link>
          <Link to="/app/contatos">Contatos</Link>
          <Link to="/app/historico">Histórico</Link>
          <Link to="/app/aprender">Aprender</Link>
          <Link to="/app/perfil">Perfil</Link>
        </nav>
      </aside>

      <div className="main-panel">
        <Header title="SAFEHER" onMenuClick={() => setMenuOpen((value) => !value)} />
        <Outlet />
        <BottomNavigation />
      </div>
    </div>
  )
}

function App() {
  const { user, setUser, logout } = useAuth()

  const handleAuth = (nextUser) => {
    setUser(nextUser)
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  const appRoutes = useMemo(
    () => (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/cadastro" element={<Register onAuth={handleAuth} />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home user={user} onSos={() => window.location.assign('/app/sos')} />} />
          <Route path="contatos" element={<Contacts />} />
          <Route path="sos" element={<Sos />} />
          <Route path="historico" element={<History />} />
          <Route path="aprender" element={<Learn />} />
          <Route path="aprender/:id" element={<ContentDetail />} />
          <Route path="perfil" element={<Profile onLogout={handleLogout} />} />
          <Route path="demo" element={<DemoMode />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? '/app' : '/'} replace />} />
      </Routes>
    ),
    [user],
  )

  return <BrowserRouter>{appRoutes}</BrowserRouter>
}

export default App
