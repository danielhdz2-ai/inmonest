import { SITE_URL } from '@/lib/gestoria-indexar-urls'
import { LANDINGS_CIUDAD_PREMIUM_SLUGS } from '@/lib/landings-ciudad-premium'
import { CIUDADES_PORTAL_EXTENDIDAS_SLUGS } from '@/lib/ciudades-portal'
import { GESTORIA_DUE_DILIGENCE_RUTA_DINAMICA } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'
import { GESTORIA_CIUDADES_EXPANSION_SLUGS } from '@/lib/gestoria-ciudades-expansion'

/** URLs nuevas de la fase local (Castellón, temporada, revisión arras, portal ampliado, Mallorca contratos). */
export function getLocalLandingsPathsParaIndexar(): string[] {
  const castellon = ['castellon'].flatMap((c) => [
    `/gestoria/${c}`,
    `/gestoria/due-diligence-precompra/${c}`,
    `/gestoria/contrato-alquiler-habitacion/${c}`,
    `/gestoria/alquiler-local-comercial/${c}`,
    `/gestoria/prestamo-particulares/${c}`,
    `/${c}/contrato-arras`,
    `/${c}/contrato-alquiler`,
    `/contratos-inmobiliarios/${c}`,
  ])

  const expansionGestoria = GESTORIA_CIUDADES_EXPANSION_SLUGS.flatMap((c) => [
    `/gestoria/${c}`,
    `/gestoria/due-diligence-precompra/${c}`,
  ])

  const expansionDueDiligenceOnly = GESTORIA_DUE_DILIGENCE_RUTA_DINAMICA.filter(
    (c) => !(GESTORIA_CIUDADES_EXPANSION_SLUGS as readonly string[]).includes(c) && c !== 'castellon',
  ).map((c) => `/gestoria/due-diligence-precompra/${c}`)

  const temporada = LANDINGS_CIUDAD_PREMIUM_SLUGS.map((c) => `/${c}/alquiler-temporada`)
  const revisionArras = LANDINGS_CIUDAD_PREMIUM_SLUGS.map(
    (c) => `/gestoria/revision-correccion-arras/${c}`,
  )

  const gestoriaCiudad = CIUDADES_PORTAL_EXTENDIDAS_SLUGS.flatMap((c) => [
    `/${c}/contrato-alquiler`,
    `/${c}/contrato-arras`,
    `/${c}`,
  ])

  const mallorcaExtra = ['/contratos-inmobiliarios/mallorca']

  return [
    ...new Set([
      ...castellon,
      ...expansionGestoria,
      ...expansionDueDiligenceOnly,
      ...temporada,
      ...revisionArras,
      ...gestoriaCiudad,
      ...mallorcaExtra,
    ]),
  ].sort()
}

export function getLocalLandingsUrlsCompletasParaIndexar(): string[] {
  return getLocalLandingsPathsParaIndexar().map((p) => `${SITE_URL}${p}`)
}
