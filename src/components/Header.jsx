export default function Header({ title = 'SAFEHER', onMenuClick }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-mark">S</span>
        <h1>{title}</h1>
      </div>
      <button type="button" className="menu-button" onClick={onMenuClick} aria-label="Abrir menu">
        ☰
      </button>
    </header>
  )
}
