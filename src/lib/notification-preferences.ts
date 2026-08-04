import { createAdminClient } from '@/lib/supabase/admin'

export type GestoriaNotificationPrefs = {
  email_gestoria_pago: boolean
  email_gestoria_documentos: boolean
  email_gestoria_expediente: boolean
  email_gestoria_contrato: boolean
  email_marketing: boolean
}

export type NotificationEvent =
  | 'gestoria_pago'
  | 'gestoria_documentos'
  | 'gestoria_expediente'
  | 'gestoria_contrato'
  | 'marketing'

export const DEFAULT_GESTORIA_PREFS: GestoriaNotificationPrefs = {
  email_gestoria_pago: true,
  email_gestoria_documentos: true,
  email_gestoria_expediente: true,
  email_gestoria_contrato: true,
  email_marketing: false,
}

const EVENT_TO_PREF: Record<NotificationEvent, keyof GestoriaNotificationPrefs> = {
  gestoria_pago: 'email_gestoria_pago',
  gestoria_documentos: 'email_gestoria_documentos',
  gestoria_expediente: 'email_gestoria_expediente',
  gestoria_contrato: 'email_gestoria_contrato',
  marketing: 'email_marketing',
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function getNotificationPrefs(opts: {
  userId?: string | null
  email?: string | null
}): Promise<GestoriaNotificationPrefs> {
  try {
    const admin = createAdminClient()

    if (opts.userId) {
      const { data } = await admin
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', opts.userId)
        .maybeSingle()

      if (data) {
        return {
          email_gestoria_pago: data.email_gestoria_pago ?? true,
          email_gestoria_documentos: data.email_gestoria_documentos ?? true,
          email_gestoria_expediente: data.email_gestoria_expediente ?? true,
          email_gestoria_contrato: data.email_gestoria_contrato ?? true,
          email_marketing: data.email_marketing ?? false,
        }
      }
    }

    const emailNorm = opts.email ? normalizeEmail(opts.email) : null
    if (emailNorm) {
      const { data } = await admin
        .from('guest_notification_preferences')
        .select('*')
        .eq('email', emailNorm)
        .maybeSingle()

      if (data) {
        return {
          email_gestoria_pago: data.email_gestoria_pago ?? true,
          email_gestoria_documentos: data.email_gestoria_documentos ?? true,
          email_gestoria_expediente: data.email_gestoria_expediente ?? true,
          email_gestoria_contrato: data.email_gestoria_contrato ?? true,
          email_marketing: data.email_marketing ?? false,
        }
      }
    }
  } catch {
    /* tabla aún no migrada — defaults */
  }

  return { ...DEFAULT_GESTORIA_PREFS }
}

export async function saveNotificationPrefs(
  userId: string,
  email: string | null | undefined,
  prefs: Partial<GestoriaNotificationPrefs>,
): Promise<GestoriaNotificationPrefs> {
  const admin = createAdminClient()
  const current = await getNotificationPrefs({ userId, email })
  const merged: GestoriaNotificationPrefs = { ...current, ...prefs }

  try {
    await admin.from('user_notification_preferences').upsert({
      user_id: userId,
      ...merged,
      updated_at: new Date().toISOString(),
    })

    const emailNorm = email ? normalizeEmail(email) : null
    if (emailNorm) {
      await admin.from('guest_notification_preferences').upsert({
        email: emailNorm,
        ...merged,
        updated_at: new Date().toISOString(),
      })
    }
  } catch {
    /* tabla aún no migrada */
  }

  return merged
}

export async function shouldNotifyGestoria(
  event: NotificationEvent,
  opts: { userId?: string | null; email?: string | null },
): Promise<boolean> {
  const prefs = await getNotificationPrefs(opts)
  const key = EVENT_TO_PREF[event]
  return Boolean(prefs[key])
}
