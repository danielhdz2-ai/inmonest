/**
 * Plantillas de campaña admin → leads (contratos alquiler LAU 2026)
 */
import { baseLayout, esc } from '@/lib/email'

export type BulkEmailTemplateId =
  | 'revision-contrato-alquiler'
  | 'redaccion-contrato-alquiler'

export type BulkEmailTemplate = {
  id: BulkEmailTemplateId
  name: string
  subject: string
  buildHtml: (nombre: string) => string
}

const CTA_STYLE =
  'display:inline-block;background:#c9962a;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px'

function emailRevisionContratoAlquiler(nombre: string) {
  const displayName = nombre?.trim() || 'hola'
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Antes de firmar tu alquiler, revisa el contrato</h1>
    <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
      Hola <strong>${esc(displayName)}</strong>, vimos que estás buscando piso en alquiler en Inmonest.
      Muchos contratos incluyen cláusulas abusivas o ilegales según la <strong>Ley de Vivienda / LAU 2026</strong>
      (fianzas excesivas, actualizaciones ilegales, prórrogas nulas…).
    </p>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px">Revisión de contrato de alquiler</p>
      <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#111827">Desde 60 €</p>
      <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5">
        Gestores revisan tu contrato en 24h: cláusulas ilegales, fianza, garantías e informe de conformidad.
      </p>
    </div>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px">
      No firmes sin saber si te protege. Te devolvemos un informe claro para negociar con el propietario.
    </p>
    <a href="https://inmonest.com/gestoria/solicitar/revision-alquiler" style="${CTA_STYLE}">
      Solicitar revisión →
    </a>
    <p style="margin:16px 0 0;font-size:13px;color:#9ca3af">
      Más info:
      <a href="https://inmonest.com/gestoria/revision-contrato-alquiler" style="color:#c9962a;text-decoration:none">
        inmonest.com/gestoria/revision-contrato-alquiler
      </a>
    </p>
    <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;line-height:1.5">
      ¿Dudas? Escríbenos a <a href="mailto:info@inmonest.com" style="color:#c9962a">info@inmonest.com</a>.
    </p>
  `)
}

function emailRedaccionContratoAlquiler(nombre: string) {
  const displayName = nombre?.trim() || 'hola'
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Contrato de alquiler LAU adaptado a 2026</h1>
    <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 20px">
      Hola <strong>${esc(displayName)}</strong>, si vas a alquilar una vivienda, un contrato genérico de internet
      puede dejarte desprotegido. En Inmonest redactamos <strong>contratos de alquiler LAU</strong> por gestores expertos,
      alineados con la Ley de Vivienda 2026.
    </p>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px">Redacción contrato alquiler vivienda</p>
      <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#111827">145 €</p>
      <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5">
        Actualización de renta, fianza y garantías, cláusulas legales y PDF firmable en 48h.
      </p>
    </div>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px">
      Ideal si el propietario aún no tiene un contrato profesional o quieres proponer uno correcto desde el principio.
    </p>
    <a href="https://inmonest.com/gestoria/solicitar/contrato-alquiler" style="${CTA_STYLE}">
      Solicitar contrato LAU →
    </a>
    <p style="margin:16px 0 0;font-size:13px;color:#9ca3af">
      Más info:
      <a href="https://inmonest.com/gestoria/cuanto-cuesta-contrato-alquiler" style="color:#c9962a;text-decoration:none">
        Cuánto cuesta un contrato de alquiler
      </a>
    </p>
    <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;line-height:1.5">
      ¿Dudas? Escríbenos a <a href="mailto:info@inmonest.com" style="color:#c9962a">info@inmonest.com</a>.
    </p>
  `)
}

export const BULK_EMAIL_TEMPLATES: BulkEmailTemplate[] = [
  {
    id: 'revision-contrato-alquiler',
    name: 'Revisión contrato alquiler LAU 2026',
    subject: 'Antes de firmar tu alquiler: revisamos tu contrato LAU (desde 60€)',
    buildHtml: emailRevisionContratoAlquiler,
  },
  {
    id: 'redaccion-contrato-alquiler',
    name: 'Redacción contrato alquiler LAU 2026',
    subject: 'Contrato de alquiler LAU profesional adaptado a 2026 (145€)',
    buildHtml: emailRedaccionContratoAlquiler,
  },
]

export function getBulkEmailTemplate(id: string): BulkEmailTemplate | undefined {
  return BULK_EMAIL_TEMPLATES.find((t) => t.id === id)
}

export function listBulkEmailTemplates() {
  return BULK_EMAIL_TEMPLATES.map((t) => ({
    id: t.id,
    name: t.name,
    subject: t.subject,
    previewHtml: t.buildHtml('María'),
  }))
}
