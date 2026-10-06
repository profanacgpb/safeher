const CONTACTS_KEY = 'safeher_contacts'

export function getContacts() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONTACTS_KEY) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

export function saveContacts(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
}

export function addContact(contact) {
  const contacts = getContacts()
  const next = [...contacts, { ...contact, id: crypto.randomUUID() }]
  saveContacts(next)
  return next
}

export function updateContact(id, payload) {
  const contacts = getContacts().map((contact) =>
    contact.id === id ? { ...contact, ...payload } : contact,
  )
  saveContacts(contacts)
  return contacts
}

export function removeContact(id) {
  const contacts = getContacts().filter((contact) => contact.id !== id)
  saveContacts(contacts)
  return contacts
}
