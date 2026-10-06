export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
          <button type="button" className="danger" onClick={onConfirm}>Sim, encerrar</button>
        </div>
      </div>
    </div>
  )
}
