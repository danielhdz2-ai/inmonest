import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'

const UPSELL_BY_SERVICE: Record<string, string[]> = {
  'contrato-alquiler': ['revision-alquiler', 'pack-revision-reserva-alquiler', 'liquidacion-fianza', 'rescision-alquiler'],
  'contrato-alquiler-barcelona': ['revision-alquiler', 'liquidacion-fianza'],
  'arras-penitenciales': ['pack-due-diligence-precompra', 'compra-completa-reserva-escritura', 'revision-arras'],
  'arras-confirmatorias': ['pack-due-diligence-precompra', 'compra-completa-reserva-escritura'],
  'reserva-compra': ['arras-penitenciales', 'asesoria-compra', 'pack-due-diligence-precompra'],
  'alquiler-temporada': ['contrato-alquiler', 'revision-alquiler'],
  'revision-alquiler': ['contrato-alquiler', 'pack-revision-reserva-alquiler'],
  'revision-arras': ['arras-penitenciales', 'pack-due-diligence-precompra'],
}

const DEFAULT_UPSELL = [
  'contrato-alquiler',
  'arras-penitenciales',
  'reserva-compra',
  'asesoria-compra',
  'pack-due-diligence-precompra',
]

export type UpsellService = {
  key: string
  nombre: string
  precio: number
  categoria: string
  incluye: string[]
  reason?: string
}

export function getRecommendedServices(
  activeServiceKey: string | null,
  ownedServiceKeys: string[],
): UpsellService[] {
  const owned = new Set(ownedServiceKeys)
  const candidates = activeServiceKey
    ? [...(UPSELL_BY_SERVICE[activeServiceKey] ?? []), ...DEFAULT_UPSELL]
    : DEFAULT_UPSELL

  const seen = new Set<string>()
  const result: UpsellService[] = []

  for (const key of candidates) {
    if (seen.has(key) || owned.has(key)) continue
    const svc = GESTORIA_SERVICIOS[key]
    if (!svc) continue
    seen.add(key)
    result.push({
      key,
      nombre: svc.nombre,
      precio: svc.precio,
      categoria: svc.categoria,
      incluye: svc.incluye.slice(0, 3),
      reason: activeServiceKey ? 'Complementa tu servicio actual' : undefined,
    })
    if (result.length >= 6) break
  }

  return result
}

export function getAllCatalogServices(): UpsellService[] {
  return Object.entries(GESTORIA_SERVICIOS).map(([key, svc]) => ({
    key,
    nombre: svc.nombre,
    precio: svc.precio,
    categoria: svc.categoria,
    incluye: svc.incluye.slice(0, 3),
  }))
}
