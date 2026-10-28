export default function SosButton({ onClick, loading = false, active = false, label = 'SOS' }) {
  return (
    <button
      type="button"
      className={`sos-button ${active ? 'active' : ''}`}
      aria-label={label}
      onClick={onClick}
      disabled={loading}
    >
      <span className="sos-text">{loading ? 'LOCALIZANDO...' : label}</span>
      <span className="sos-sub">{loading ? 'AGUARDE' : 'PRECISO DE AJUDA'}</span>
    </button>
  )
}
