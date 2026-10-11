/** Perfil de empresa Google — enlaces y copy (actualizar si cambia el GBP). */

/** Ruta corta interna → redirige al formulario de reseña en Google */
export const GOOGLE_REVIEW_SHORT_PATH = '/resena' as const

export const GOOGLE_REVIEW_SHORT_PATHS = [
  GOOGLE_REVIEW_SHORT_PATH,
  '/reseña',
  '/dejar-resena',
  '/review',
] as const

/** Formulario «Escribir reseña» — Perfil Inmonest */
export const GOOGLE_WRITE_REVIEW_URL =
  'https://g.page/r/CTKk9C4H6GgPEBM/review'

/** Ficha pública (mapa / perfil) */
export const GOOGLE_BUSINESS_PROFILE_URL =
  'https://g.page/r/CTKk9C4H6GgPEBM'

export const GOOGLE_BUSINESS_PHONE_DISPLAY = '745 02 28 62'
export const GOOGLE_BUSINESS_PHONE_E164 = '+34745022862'

export function getGoogleWriteReviewUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || GOOGLE_WRITE_REVIEW_URL
}

/** Ver reseñas publicadas */
export const GOOGLE_REVIEWS_LIST_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() ||
  'https://www.google.com/search?q=opiniones+de+inmonest'

/** Copy para pegar en Google Business Profile (descripción corta). */
export const GBP_DESCRIPTION =
  'Inmonest es gestoría inmobiliaria online para particulares en toda España. Contrato de alquiler LAU, arras, alquiler temporada y habitación, revisión legal y compraventa integral. Precio cerrado, gestor asignado y entrega en 48 h. No publicamos anuncios ni cobramos comisiones de agencia.'

/** Servicios sugeridos en el panel de Google (uno por línea al crear en GBP). */
export const GBP_SERVICES = [
  'Contrato de alquiler LAU vivienda habitual',
  'Contrato de arras penitenciales',
  'Alquiler por temporada',
  'Contrato alquiler de habitación',
  'Revisión contrato de alquiler',
  'Revisión contrato de arras',
  'Compra de vivienda — acompañamiento integral',
  'Venta entre particulares — documentación y arras',
] as const

/** Preguntas frecuentes sugeridas en GBP → sección Preguntas. */
export const GBP_QA = [
  {
    q: '¿Inmonest publica pisos en venta o alquiler?',
    a: 'No. Somos gestoría inmobiliaria online: redactamos y revisamos contratos. Tú encuentras piso, inquilino o comprador y nosotros formalizamos la operación.',
  },
  {
    q: '¿Cuánto cuesta un contrato de alquiler LAU?',
    a: '145 € IVA incluido en toda España, con personalización, gestor asignado y entrega orientativa en 48 horas.',
  },
  {
    q: '¿Atendéis fuera de Barcelona?',
    a: 'Sí. Tramitación 100 % online en toda España, adaptando cláusulas a la comunidad autónoma cuando corresponde.',
  },
] as const

/** Texto email/WhatsApp tras entregar contrato (pedir reseña). */
export function buildPostDeliveryReviewRequest(serviceName?: string): {
  subject: string
  body: string
  whatsapp: string
} {
  const service = serviceName?.trim() || 'tu contrato'
  const reviewUrl = getGoogleWriteReviewUrl()
  return {
    subject: '¿Cómo fue tu experiencia con Inmonest?',
    body: `Hola,

Esperamos que ${service} te haya servido bien.

Si te ha resultado útil nuestro trabajo, ¿nos ayudas con una reseña breve en Google? Tarda menos de un minuto y nos ayuda a que más particulares nos encuentren como gestoría:

${reviewUrl}

Muchas gracias,
Equipo Inmonest
Gestoría inmobiliaria online · inmonest.com/gestoria`,
    whatsapp: `Hola, ya recibí ${service}. ¿Podéis enviarme el enlace para dejar una reseña en Google? Gracias.`,
  }
}
