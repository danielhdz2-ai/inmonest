import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'

/** Servicios que tienen landing SEO /{ciudad}/{slug} */
const SERVICIOS_LANDING_CIUDAD = new Set(['contrato-alquiler', 'contrato-arras'])

const SERVICIO_ALIASES: Record<string, string> = {
  alquiler: 'contrato-alquiler',
  lau: 'contrato-alquiler',
  'contrato-alquiler-lau': 'contrato-alquiler',
  'alquiler-vivienda': 'contrato-alquiler',
  'alquiler-vivienda-lau': 'contrato-alquiler',
  arras: 'arras-penitenciales',
  señal: 'arras-penitenciales',
  senal: 'arras-penitenciales',
  'arras-penitenciales': 'arras-penitenciales',
  'arras-confirmatorias': 'arras-confirmatorias',
  habitacion: 'alquiler-habitaciones',
  habitación: 'alquiler-habitaciones',
  coliving: 'alquiler-habitaciones',
  temporada: 'alquiler-temporada',
  temporal: 'alquiler-temporada',
  rescision: 'rescision-alquiler',
  rescisión: 'rescision-alquiler',
  fianza: 'liquidacion-fianza',
  compraventa: 'contrato-compraventa',
  'due-diligence': 'pack-due-diligence-precompra',
  diligencia: 'pack-due-diligence-precompra',
}

const CIUDAD_ALIASES: Record<string, string> = {
  'san-sebastian': 'san-sebastian',
  donostia: 'san-sebastian',
  'a-coruna': 'coruna',
  'la-coruna': 'coruna',
  coruña: 'coruna',
  palma: 'mallorca',
  'palma-de-mallorca': 'mallorca',
  'vitoria-gasteiz': 'vitoria',
}

export type GestoriaChatParsed = {
  servicio?: string
  ciudad?: string
  mensaje?: string
  error?: string
}

export type GestoriaChatNavigation = {
  href: string
  label: string
  mensaje?: string
}

export function normalizeGestoriaServicioSlug(raw?: string): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined
  const key = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .replace(/\s+/g, '-')
  if (GESTORIA_SERVICIOS[key]) return key
  if (SERVICIO_ALIASES[key]) return SERVICIO_ALIASES[key]
  return undefined
}

export function normalizeGestoriaCiudadSlug(raw?: string): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined
  let slug = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .replace(/\s+/g, '-')
  if (CIUDAD_ALIASES[slug]) slug = CIUDAD_ALIASES[slug]
  return slug || undefined
}

export function buildGestoriaChatHref(servicio: string, ciudad?: string): string {
  if (ciudad && SERVICIOS_LANDING_CIUDAD.has(servicio)) {
    return `/${ciudad}/${servicio}`
  }
  return `/gestoria/${servicio}`
}

export function resolveGestoriaChatNavigation(
  parsed: GestoriaChatParsed,
): GestoriaChatNavigation | { error: string } {
  if (parsed.error) return { error: parsed.error }

  const servicio = normalizeGestoriaServicioSlug(parsed.servicio)
  if (!servicio) {
    return {
      error:
        'No identifiqué el servicio. Prueba con: contrato de alquiler LAU, arras penitenciales, alquiler de habitación o revisión de contrato.',
    }
  }

  const cfg = GESTORIA_SERVICIOS[servicio]
  if (!cfg) {
    return { error: 'Servicio no disponible en catálogo.' }
  }

  const ciudad = normalizeGestoriaCiudadSlug(parsed.ciudad)
  const href = buildGestoriaChatHref(servicio, ciudad)
  const cityLabel = ciudad ? ` (${ciudad})` : ''
  const label = `${cfg.nombre}${cityLabel}`

  const mensaje =
    parsed.mensaje?.trim() ||
    `Te llevo a ${cfg.nombre}${ciudad ? ` para ${parsed.ciudad}` : ''}. Desde ${cfg.precio} € IVA incl.`

  return { href, label, mensaje }
}

/** Lista compacta para el system prompt de la IA */
export function gestoriaChatServiciosParaPrompt(): string {
  const priority = [
    'contrato-alquiler',
    'arras-penitenciales',
    'arras-confirmatorias',
    'alquiler-habitaciones',
    'revision-alquiler',
    'reserva-compra',
    'contrato-compraventa',
    'alquiler-temporada',
    'rescision-alquiler',
    'liquidacion-fianza',
    'pack-due-diligence-precompra',
    'revision-correccion-arras',
  ]
  return priority
    .filter((s) => GESTORIA_SERVICIOS[s])
    .map((s) => `- ${s}: ${GESTORIA_SERVICIOS[s].nombre}`)
    .join('\n')
}
