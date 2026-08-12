/** Ruta corta interna → redirige al formulario de reseña en Google */
export const GOOGLE_REVIEW_SHORT_PATH = '/resena' as const

/** Alias con tilde (middleware redirige a /resena) */
export const GOOGLE_REVIEW_SHORT_PATHS = [
  GOOGLE_REVIEW_SHORT_PATH,
  '/reseña',
  '/dejar-resena',
  '/review',
] as const

/** Formulario «Escribir reseña» — Perfil de empresa Inmonest en Google */
export const GOOGLE_WRITE_REVIEW_URL =
  'https://g.page/r/CTKk9C4H6GgPEBM/review'

/**
 * URL del formulario de reseña (env opcional sobreescribe el valor por defecto).
 */
export function getGoogleWriteReviewUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || GOOGLE_WRITE_REVIEW_URL
}

/** Enlace para ver reseñas publicadas (no escribir) */
export const GOOGLE_REVIEWS_LIST_URL =
  'https://www.google.com/search?q=inmonest+rese%C3%B1as'
