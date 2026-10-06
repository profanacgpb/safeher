import { useMemo, useState } from 'react'
import { getContacts, addContact, updateContact, removeContact } from '../services/contacts'

const emptyForm = { nome: '', telefone: '', relacao: '' }

export default function Contacts() {
  const [contacts, setContacts] = useState(() => getContacts())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const limitReached = contacts.length >= 5

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const refreshContacts = () => setContacts(getContacts())

  const handleSubmit = (event) => {
    event.preventDefault()

    if (limitReached && !editingId) {
      setMessage('Você atingiu o limite de 5 contatos.')
      return
    }

    if (editingId) {
      updateContact(editingId, form)
      setEditingId(null)
    } else {
      addContact(form)
    }

    setForm(emptyForm)
    setMessage('')
    refreshContacts()
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id)
    setForm({ nome: contact.nome, telefone: contact.telefone, relacao: contact.relacao })
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Deseja realmente remover este contato?')
    if (!confirmed) return

    removeContact(id)
    refreshContacts()
  }

  return (
    <main className="page-shell">
      <section className="content-section">
        <h2>Meus contatos</h2>
        <form onSubmit={handleSubmit} className="form-stack compact-form">
          <label>
            <span>Nome</span>
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>
          <label>
            <span>Telefone</span>
            <input name="telefone" value={form.telefone} onChange={handleChange} required />
          </label>
          <label>
            <span>Relação</span>
            <input name="relacao" value={form.relacao} onChange={handleChange} required />
          </label>
          {message ? <p className="form-error">{message}</p> : null}
          <button type="submit" className="primary-button" disabled={limitReached && !editingId}>
            {editingId ? 'SALVAR ALTERAÇÕES' : '+ ADICIONAR CONTATO'}
          </button>
        </form>

        {contacts.length === 0 ? (
          <p className="empty-state">Você ainda não cadastrou contatos de confiança.</p>
        ) : (
          <div className="contact-list">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div>
                  <h3>{contact.nome}</h3>
                  <p>{contact.relacao}</p>
                  <a href={`tel:${contact.telefone}`}>{contact.telefone}</a>
                </div>
                <div className="contact-actions">
                  <button type="button" onClick={() => handleEdit(contact)}>Editar</button>
                  <button type="button" className="danger" onClick={() => handleDelete(contact.id)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
