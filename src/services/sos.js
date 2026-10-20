import { requireSupabase } from './supabase'

const sessionFields = 'id, usuario_id, inicio, fim, latitude, longitude, status, created_at'

async function getAuthenticatedUserId(client) {
  const { data, error } = await client.auth.getUser()

  if (error) throw error
  if (!data.user) throw new Error('Faça login para registrar um SOS.')
  return data.user.id
}

export async function getSosHistory() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('sessoes_sos')
    .select(sessionFields)
    .order('inicio', { ascending: false })

  if (error) throw error
  return data
}

export async function createSosSession({ latitude, longitude }) {
  const client = requireSupabase()
  const usuario_id = await getAuthenticatedUserId(client)
  const { data, error } = await client
    .from('sessoes_sos')
    .insert({ usuario_id, latitude, longitude, status: 'ATIVO' })
    .select(sessionFields)
    .single()

  if (error) throw error
  return data
}

export async function closeSosSession(id) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('sessoes_sos')
    .update({ status: 'ENCERRADO', fim: new Date().toISOString() })
    .eq('id', id)
    .select(sessionFields)
    .single()

  if (error) throw error
  return data
}
