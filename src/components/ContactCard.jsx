export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <article className="contact-card">
      <div>
        <h3>{contact.nome}</h3>
        <p>{contact.relacao}</p>
        <a href={`tel:${contact.telefone}`}>{contact.telefone}</a>
      </div>
      <div className="contact-actions">
        <button type="button" onClick={() => onEdit(contact)}>Editar</button>
        <button type="button" className="danger" onClick={() => onDelete(contact.id)}>
          Remover
        </button>
      </div>
    </article>
  )
}
