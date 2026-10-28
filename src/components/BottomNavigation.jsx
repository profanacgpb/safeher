import { NavLink } from 'react-router-dom'

const items = [
  { to: '/app', label: 'Início', icon: '🏠' },
  { to: '/app/contatos', label: 'Contatos', icon: '👥' },
  { to: '/app/historico', label: 'Histórico', icon: '📋' },
  { to: '/app/aprender', label: 'Aprender', icon: '📚' },
  { to: '/app/perfil', label: 'Perfil', icon: '👤' },
]

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className="nav-item">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
