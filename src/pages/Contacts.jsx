import { useEffect, useState } from 'react'
import { getContacts, addContact, updateContact, removeContact } from '../services/contacts'

const emptyForm = { nome: '', telefone: '', relacao: '' }

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const limitReached = contacts.length >= 5

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (limitReached && !editingId) {
      setMessage('Você atingiu o limite de 5 contatos.')
      return
    }

    setSaving(true)
    try {
      if (editingId) {
        const updated = await updateContact(editingId, form)
        setContacts((current) => current.map((contact) => contact.id === updated.id ? updated : contact))
        setEditingId(null)
      } else {
        const created = await addContact(form)
        setContacts((current) => [...current, created])
      }

      setForm(emptyForm)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id)
    setForm({ nome: contact.nome, telefone: contact.telefone, relacao: contact.relacao })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Deseja realmente remover este contato?')
    if (!confirmed) return

    setMessage('')
    try {
      await removeContact(id)
      setContacts((current) => current.filter((contact) => contact.id !== id))
    } catch (error) {
      setMessage(error.message)
    }
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
          <button type="submit" className="primary-button" disabled={saving || (limitReached && !editingId)}>
            {saving ? 'SALVANDO...' : editingId ? 'SALVAR ALTERAÇÕES' : '+ ADICIONAR CONTATO'}
          </button>
        </form>

        {loading ? <p role="status">Carregando contatos...</p> : null}
        {!loading && contacts.length === 0 ? (
          <p className="empty-state">Você ainda não cadastrou contatos de confiança.</p>
        ) : null}
        {!loading && contacts.length > 0 ? (
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
        ) : null}
      </section>
    </main>
  )
}
