import { requireSupabase } from './supabase'

const contactFields = 'id, nome, telefone, relacao, created_at'

async function getAuthenticatedUserId(client) {
  const { data, error } = await client.auth.getUser()

  if (error) throw error
  if (!data.user) throw new Error('Faça login para acessar seus contatos.')
  return data.user.id
}

export async function getContacts() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('contatos')
    .select(contactFields)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function addContact(contact) {
  const client = requireSupabase()
  const usuario_id = await getAuthenticatedUserId(client)
  const { data, error } = await client
    .from('contatos')
    .insert({ ...contact, usuario_id })
    .select(contactFields)
    .single()

  if (error) throw error
  return data
}

export async function updateContact(id, payload) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('contatos')
    .update(payload)
    .eq('id', id)
    .select(contactFields)
    .single()

  if (error) throw error
  return data
}

export async function removeContact(id) {
  const client = requireSupabase()
  const { error } = await client.from('contatos').delete().eq('id', id)

  if (error) throw error
}
