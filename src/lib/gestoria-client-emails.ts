import { sendEmail, baseLayout, esc } from '@/lib/email'
import { getDocMeta } from '@/lib/gestoria-service-docs'

const PANEL_URL = 'https://inmonest.com/mi-cuenta/contratos'

function ctaPanel(label = 'Ver mi panel →') {
  return `<a href="${PANEL_URL}"
     style="display:inline-block;background:#c9962a;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-top:8px">
    ${label}
  </a>`
}

export async function notifyClientDocReceived(opts: {
  to: string
  clientName?: string | null
  docKey: string
  serviceName?: string | null
}): Promise<boolean> {
  const docLabel = getDocMeta(opts.docKey)?.label ?? opts.docKey
  const nombre = opts.clientName?.trim() || 'cliente'
  return sendEmail({
    to: opts.to,
    subject: `Documento recibido: ${docLabel} — Inmonest`,
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Documento recibido ✅</h1>
      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
        Hola <strong>${esc(nombre)}</strong>, hemos recibido tu documento
        <strong>${esc(docLabel)}</strong>${opts.serviceName ? ` para <em>${esc(opts.serviceName)}</em>` : ''}.
      </p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0;font-size:14px;color:#166534">
          Nuestro equipo lo revisará en breve. Te avisaremos por email cuando esté validado o si necesitamos que lo vuelvas a subir.
        </p>
      </div>
      ${ctaPanel()}
    `),
  })
}

export async function notifyClientDocValidated(opts: {
  to: string
  clientName?: string | null
  docKey: string
}): Promise<boolean> {
  const docLabel = getDocMeta(opts.docKey)?.label ?? opts.docKey
  const nombre = opts.clientName?.trim() || 'cliente'
  return sendEmail({
    to: opts.to,
    subject: `Documento validado: ${docLabel} — Inmonest`,
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Documento validado ✅</h1>
      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
        Hola <strong>${esc(nombre)}</strong>, tu documento <strong>${esc(docLabel)}</strong> ha sido revisado y <strong>está correcto</strong>.
      </p>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px">
        Sigue completando el checklist en tu panel si aún faltan documentos.
      </p>
      ${ctaPanel()}
    `),
  })
}

export async function notifyClientDocRejected(opts: {
  to: string
  clientName?: string | null
  docKey: string
  reason?: string | null
}): Promise<boolean> {
  const docLabel = getDocMeta(opts.docKey)?.label ?? opts.docKey
  const nombre = opts.clientName?.trim() || 'cliente'
  const reasonText = opts.reason?.trim()
  const motivoBlock = reasonText
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px 20px;margin:0 0 24px">
         <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#991b1b">Motivo</p>
         <p style="margin:0;font-size:14px;color:#7f1d1d;line-height:1.5">${esc(reasonText)}</p>
       </div>`
    : `<p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px">
         Por favor, vuelve a subirlo desde tu panel (foto nítida o PDF legible).
       </p>`

  return sendEmail({
    to: opts.to,
    subject: `Documento a corregir: ${docLabel} — Inmonest`,
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Necesitamos que revises un documento</h1>
      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
        Hola <strong>${esc(nombre)}</strong>, hemos revisado <strong>${esc(docLabel)}</strong> y necesitamos que lo vuelvas a enviar.
      </p>
      ${motivoBlock}
      ${ctaPanel('Subir de nuevo →')}
    `),
  })
}

export async function notifyClientContractReady(opts: {
  to: string
  clientName?: string | null
  serviceName: string
}): Promise<boolean> {
  const nombre = opts.clientName?.trim() || 'cliente'
  return sendEmail({
    to: opts.to,
    subject: 'Tu contrato está listo — Inmonest',
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827">¡Tu contrato está listo! 🎉</h1>
      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
        Hola <strong>${esc(nombre)}</strong>, tu servicio <strong>${esc(opts.serviceName)}</strong> ha sido completado.
      </p>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0;font-size:14px;color:#92400e">
          Ya puedes descargar el contrato desde tu panel de cliente.
        </p>
      </div>
      ${ctaPanel('Descargar contrato →')}
    `),
  })
}
