import type { Redirect } from 'next/dist/lib/load-custom-routes'

/**
 * Redirects 301 para URLs antiguas reportadas en GSC o enlaces legacy.
 * Centralizado para mantener next.config.ts legible.
 */
export const SEO_REDIRECTS: Redirect[] = [
  // ═══ ALIASES DE SLUGS GESTORÍA ═══
  {
    source: '/gestoria/alquiler-vivienda-lau',
    destination: '/gestoria/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/contrato-alquiler-temporal',
    destination: '/gestoria/solicitar/alquiler-temporada',
    permanent: true,
  },
  {
    source: '/gestoria/solicitar/alquiler-vivienda-lau',
    destination: '/gestoria/solicitar/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/solicitar/contrato-alquiler-temporal',
    destination: '/gestoria/solicitar/alquiler-temporada',
    permanent: true,
  },

  // ═══ RESCISIÓN — VARIANTES ANTIGUAS ═══
  {
    source: '/gestoria/rescision-contrato',
    destination: '/gestoria/solicitar/rescision-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/rescision-contrato-alquiler',
    destination: '/gestoria/solicitar/rescision-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/rescision-alquiler-contrato',
    destination: '/gestoria/solicitar/rescision-alquiler',
    permanent: true,
  },

  // ═══ SERVICIOS RENOMBRADOS ═══
  {
    source: '/gestoria/acompanamiento-venta',
    destination: '/gestoria/venta-completa-reserva-escritura',
    permanent: true,
  },
  {
    source: '/gestoria/revision-alquiler',
    destination: '/gestoria/revision-contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/revision-arras',
    destination: '/gestoria/revision-contrato-arras',
    permanent: true,
  },
  {
    source: '/gestoria/due-diligence',
    destination: '/gestoria/due-diligence-precompra',
    permanent: true,
  },
  {
    source: '/gestoria/pack-due-diligence-precompra',
    destination: '/gestoria/due-diligence-precompra',
    permanent: true,
  },
  {
    source: '/gestoria/alquiler-habitacion',
    destination: '/gestoria/contrato-alquiler-habitacion',
    permanent: true,
  },
  {
    source: '/gestoria/burofax-desistimiento-alquiler',
    destination: '/gestoria/solicitar/rescision-alquiler',
    permanent: true,
  },

  // ═══ CIUDADES — ATAJOS RAÍZ ═══
  {
    source: '/mallorca',
    destination: '/mallorca/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/coruna',
    destination: '/coruna/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/palma',
    destination: '/palma/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/mallorca',
    destination: '/mallorca/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/coruna',
    destination: '/coruna/contrato-alquiler',
    permanent: true,
  },

  // ═══ BLOG — POSTS MOVIDOS O RENOMBRADOS ═══
  {
    source: '/blog/gestoria-inmobiliaria',
    destination: '/blog/que-es-gestoria-inmobiliaria',
    permanent: true,
  },
  {
    source: '/blog/vender-sin-comisiones',
    destination: '/blog/vender-piso-sin-comisiones',
    permanent: true,
  },
  {
    source: '/blog/due-diligence',
    destination: '/blog/due-diligence-compra-vivienda',
    permanent: true,
  },

  // ═══ GESTORÍA POR CIUDAD — HUBS LEGACY ═══
  {
    source: '/gestoria/:ciudad/gestoria-online',
    destination: '/gestoria/:ciudad',
    permanent: true,
  },
  {
    source: '/gestoria/:ciudad/contratos-alquiler',
    destination: '/:ciudad/contrato-alquiler',
    permanent: true,
  },
  {
    source: '/gestoria/:ciudad/contrato-arras',
    destination: '/:ciudad/contrato-arras',
    permanent: true,
  },
]
