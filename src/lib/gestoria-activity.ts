import { createAdminClient } from '@/lib/supabase/admin'

export type GestoriaActivityRow = {
  id: string
  request_id: string
  activity_type: string
  description: string
  metadata: Record<string, unknown> | null
  created_by: string | null
  created_at: string
}

export async function logGestoriaActivity(opts: {
  requestId: string
  activityType: string
  description: string
  metadata?: Record<string, unknown>
  createdBy?: string | null
}): Promise<void> {
  try {
    const admin = createAdminClient()
    await admin.from('gestoria_activity').insert({
      request_id: opts.requestId,
      activity_type: opts.activityType,
      description: opts.description,
      metadata: opts.metadata ?? {},
      created_by: opts.createdBy ?? 'system',
    })
  } catch (err) {
    console.warn('[gestoria-activity] log falló:', err)
  }
}

export async function fetchGestoriaActivity(requestId: string): Promise<GestoriaActivityRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('gestoria_activity')
    .select('*')
    .eq('request_id', requestId)
    .order('created_at', { ascending: false })

  return (data ?? []) as GestoriaActivityRow[]
}

const ACTIVITY_ICONS: Record<string, string> = {
  payment: '💳',
  status_change: '📋',
  doc_uploaded: '📤',
  email_sent: '✉️',
  contract_delivered: '✅',
  note_added: '📝',
}

export function activityIcon(type: string): string {
  return ACTIVITY_ICONS[type] ?? '•'
}
