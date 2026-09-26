import { SITE_URL } from '@/lib/gestoria-indexar-urls'
import { LANDINGS_CIUDAD_PREMIUM_SLUGS } from '@/lib/landings-ciudad-premium'
import { CIUDADES_PORTAL_EXTENDIDAS_SLUGS } from '@/lib/ciudades-portal'
import { GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'

/** URLs nuevas de la fase local (Castellón, temporada, revisión arras, portal ampliado, Mallorca contratos). */
export function getLocalLandingsPathsParaIndexar(): string[] {
  const castellon = GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA.flatMap((c) => [
    `/gestoria/${c}`,
    `/gestoria/due-diligence-precompra/${c}`,
    `/gestoria/contrato-alquiler-habitacion/${c}`,
    `/gestoria/alquiler-local-comercial/${c}`,
    `/gestoria/prestamo-particulares/${c}`,
    `/${c}/contrato-arras`,
    `/${c}/contrato-alquiler`,
    `/contratos-inmobiliarios/${c}`,
  ])

  const temporada = LANDINGS_CIUDAD_PREMIUM_SLUGS.map((c) => `/${c}/alquiler-temporada`)
  const revisionArras = LANDINGS_CIUDAD_PREMIUM_SLUGS.map(
    (c) => `/gestoria/revision-correccion-arras/${c}`,
  )

  const portalNuevo = CIUDADES_PORTAL_EXTENDIDAS_SLUGS.flatMap((c) => [
    `/${c}/alquiler-particulares`,
    `/${c}/alquiler-sin-agencia`,
    `/${c}/vender-piso`,
    `/${c}/pisos`,
  ]).filter(
    (path) =>
      ![
        '/madrid/alquiler-particulares',
        '/barcelona/alquiler-particulares',
        '/valencia/alquiler-particulares',
        '/sevilla/alquiler-particulares',
        '/malaga/alquiler-particulares',
        '/bilbao/alquiler-particulares',
        '/zaragoza/alquiler-particulares',
        '/alicante/alquiler-particulares',
      ].includes(path),
  )

  const mallorcaExtra = ['/contratos-inmobiliarios/mallorca']

  return [...new Set([...castellon, ...temporada, ...revisionArras, ...portalNuevo, ...mallorcaExtra])].sort()
}

export function getLocalLandingsUrlsCompletasParaIndexar(): string[] {
  return getLocalLandingsPathsParaIndexar().map((p) => `${SITE_URL}${p}`)
}
