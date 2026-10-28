export default function EmergencyButton({ label, href, onClick, variant = 'primary' }) {
  const content = (
    <>
      <span>{label}</span>
      <small>{variant === 'primary' ? 'Emergência' : 'Apoio'}</small>
    </>
  )

  if (href) {
    return (
      <a href={href} className={`emergency-button ${variant}`} aria-label={label}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={`emergency-button ${variant}`} onClick={onClick}>
      {content}
    </button>
  )
}
