/** Destino principal tras cierre del portal inmobiliario (pivot gestoría). */
export const GESTORIA_ALQUILER_HUB = '/gestoria/contrato-alquiler'
import { GESTORIA_LAU_CHECKOUT, GESTORIA_SOLICITAR_HUB } from '@/lib/gestoria-nav'

export const GESTORIA_ALQUILER_SOLICITAR = GESTORIA_LAU_CHECKOUT
export { GESTORIA_SOLICITAR_HUB }
export const GESTORIA_HUB = '/gestoria'

export const PORTAL_CLOSED_REDIRECTS: Record<string, string> = {
  '/pisos': GESTORIA_ALQUILER_HUB,
  '/publicar': GESTORIA_SOLICITAR_HUB,
  '/publicar-anuncio': GESTORIA_SOLICITAR_HUB,
}

export const MI_CUENTA_PORTAL_LEGACY_PREFIXES = [
  '/mi-cuenta/anuncios',
  '/mi-cuenta/favoritos',
  '/mi-cuenta/mensajes',
  '/mi-cuenta/alertas',
] as const

export function isPortalListingApi(pathname: string): boolean {
  return (
    pathname === '/api/scraper' ||
    pathname === '/api/ingest' ||
    pathname.startsWith('/api/cron/') ||
    pathname === '/api/maintenance' ||
    pathname === '/api/generar-descripcion' ||
    pathname === '/api/test-alertas' ||
    pathname === '/api/debug-db' ||
    pathname.startsWith('/api/listings') ||
    pathname.startsWith('/api/pisos') ||
    pathname.startsWith('/api/publicar') ||
    pathname.startsWith('/api/mensajes') ||
    pathname.startsWith('/api/favoritos') ||
    pathname.startsWith('/api/alertas') ||
    pathname.startsWith('/api/mis-anuncios') ||
    pathname.startsWith('/api/push/')
  )
}
