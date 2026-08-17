import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { isAdminEmail } from '@/lib/admin'
import {
  getBulkEmailTemplate,
  listBulkEmailTemplates,
} from '@/lib/email-templates/contratos-alquiler'

/** Envíos secuenciales a ~128 leads pueden superar el timeout por defecto. */
export const maxDuration = 300

const MAX_RECIPIENTS = 200
const DELAY_MS = 120
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    return null
  }
  return user
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * GET /api/admin/bulk-email
 * Lista plantillas disponibles para campañas a leads.
 */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }
  return NextResponse.json({ templates: listBulkEmailTemplates() })
}

type Recipient = { email: string; name?: string }

/**
 * POST /api/admin/bulk-email
 * Body: { templateId: string, recipients: { email, name? }[] }
 */
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  let body: { templateId?: string; recipients?: Recipient[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const template = getBulkEmailTemplate(body.templateId || '')
  if (!template) {
    return NextResponse.json({ error: 'Plantilla no válida' }, { status: 400 })
  }

  const raw = Array.isArray(body.recipients) ? body.recipients : []
  if (raw.length === 0) {
    return NextResponse.json({ error: 'Sin destinatarios' }, { status: 400 })
  }
  if (raw.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { error: `Máximo ${MAX_RECIPIENTS} destinatarios por envío` },
      { status: 400 }
    )
  }

  const seen = new Set<string>()
  const recipients: Recipient[] = []
  for (const r of raw) {
    const email = String(r?.email || '')
      .trim()
      .toLowerCase()
    if (!EMAIL_RE.test(email) || seen.has(email)) continue
    seen.add(email)
    recipients.push({
      email,
      name: typeof r?.name === 'string' ? r.name.trim() : undefined,
    })
  }

  if (recipients.length === 0) {
    return NextResponse.json({ error: 'Ningún email válido' }, { status: 400 })
  }

  const sent: string[] = []
  const failed: string[] = []

  for (let i = 0; i < recipients.length; i++) {
    const { email, name } = recipients[i]
    const html = template.buildHtml(name || email.split('@')[0] || 'hola')
    const ok = await sendEmail({
      to: email,
      subject: template.subject,
      html,
      reply_to: 'info@inmonest.com',
    })
    if (ok) sent.push(email)
    else failed.push(email)

    if (i < recipients.length - 1) {
      await sleep(DELAY_MS)
    }
  }

  return NextResponse.json({
    templateId: template.id,
    total: recipients.length,
    sent,
    failed,
  })
}
