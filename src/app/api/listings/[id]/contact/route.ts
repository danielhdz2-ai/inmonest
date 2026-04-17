import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const RESEND_API = 'https://api.resend.com/emails'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id: listingId } = await params

  let body: { from_name?: string; from_email?: string; from_phone?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { from_name, from_email, from_phone, message } = body

  if (!from_name?.trim() || !from_email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 422 })
  }

  // Validación básica de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const supabase = await createClient()

  // Verificar que el anuncio existe y está publicado
  const { data: listing, error: listingErr } = await supabase
    .from('listings')
    .select('id, title, status, city')
    .eq('id', listingId)
    .eq('status', 'published')
    .single()

  if (listingErr || !listing) {
    return NextResponse.json({ error: 'Anuncio no encontrado' }, { status: 404 })
  }

  const { error } = await supabase.from('listing_contacts').insert({
    listing_id: listingId,
    from_name:  from_name.trim().slice(0, 100),
    from_email: from_email.trim().slice(0, 200),
    from_phone: from_phone?.trim().slice(0, 30) ?? null,
    message:    message.trim().slice(0, 2000),
  })

  if (error) {
    console.error('listing_contacts insert error:', error)
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 })
  }

  // ── Notificar a info@inmonest.com ──────────────────────────────────────────
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (RESEND_KEY) {
    const safeName   = from_name.trim().replace(/</g, '&lt;')
    const safeEmail  = from_email.trim().replace(/</g, '&lt;')
    const safePhone  = (from_phone ?? '—').replace(/</g, '&lt;')
    const safeMsg    = message.trim().replace(/</g, '&lt;').replace(/\n/g, '<br>')
    const safeTitle  = (listing.title ?? listingId).replace(/</g, '&lt;')
    const safeCity   = (listing.city ?? '').replace(/</g, '&lt;')
    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;padding:24px">
        <div style="background:linear-gradient(to right,#7a5c1e,#c9962a);border-radius:12px;padding:20px 24px;margin-bottom:24px">
          <h2 style="color:#fff;margin:0">💬 Nuevo mensaje en un anuncio</h2>
          <p style="color:#ffedd5;margin:4px 0 0">${safeTitle}${safeCity ? ` — ${safeCity}` : ''}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555;width:30%">Nombre</td>
            <td style="padding:10px 14px">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Email</td>
            <td style="padding:10px 14px"><a href="mailto:${safeEmail}" style="color:#c9962a">${safeEmail}</a></td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555">Teléfono</td>
            <td style="padding:10px 14px">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Mensaje</td>
            <td style="padding:10px 14px">${safeMsg}</td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555">Anuncio</td>
            <td style="padding:10px 14px">
              <a href="https://inmonest.com/pisos/${listingId}" style="color:#c9962a">
                Ver anuncio ↗
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Fecha</td>
            <td style="padding:10px 14px">${fecha}</td>
          </tr>
        </table>
        <p style="font-size:11px;color:#9ca3af;margin-top:20px">
          Recibido desde inmonest.com · ${fecha}
        </p>
      </div>
    `

    try {
      await fetch(RESEND_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? 'Inmonest <info@inmonest.com>',
          to: ['info@inmonest.com'],
          reply_to: safeEmail,
          subject: `💬 Nuevo contacto en anuncio — ${safeTitle}`,
          html,
        }),
      })
    } catch {
      // No crítico — el mensaje ya está en BD
    }
  }

  return NextResponse.json({ ok: true })
}
