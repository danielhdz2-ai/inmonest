/**
 * Auditoría SEO gestoría — problemas conocidos de indexación y datos estructurados.
 * Actualizar al corregir cada ítem.
 */

export type ProblemaSeo = {
  id: string
  severidad: 'critico' | 'alto' | 'medio'
  tipo: 'schema-reviews' | 'noindex' | 'sitemap' | 'canonical'
  url: string
  problema: string
  accion: string
}

/** Páginas que NO deben indexarse (correcto) */
export const GESTORIA_NOINDEX_OK = [
  '/gestoria/gracias',
  '/gestoria/carga-documentos',
  '/gestoria/error',
  '/gestoria/confirmacion',
] as const

/** Páginas gestoría ausentes del sitemap.xml (antes de corrección) */
export const GESTORIA_FUERA_SITEMAP = [
  '/gestoria/ciudades',
  '/gestoria/contrato-arras',
  '/gestoria/asesoramiento-arras-venta',
  '/gestoria/guia-arras-penitenciales',
  '/gestoria/arras-vs-reserva-compra',
  '/gestoria/cuanto-cuesta-contrato-alquiler',
  '/gestoria/due-diligence-precompra/madrid',
  '/gestoria/due-diligence-precompra/barcelona',
  '/gestoria/due-diligence-precompra/valencia',
  '/gestoria/due-diligence-precompra/sevilla',
  '/gestoria/due-diligence-precompra/malaga',
  '/gestoria/due-diligence-precompra/bilbao',
  '/gestoria/contrato-alquiler-habitacion',
  '/gestoria/contrato-alquiler-habitacion/madrid',
  '/gestoria/contrato-alquiler-habitacion/barcelona',
  '/gestoria/compra-parking-trastero',
  '/gestoria/reserva-compra',
  '/gestoria/gestoria',
  '/gestoria/solicitar',
] as const

/**
 * aggregateRating sin array review[] visible — Google marca "Fragmentos de reseñas" inválidos.
 * Afecta a TODAS las landings que heredan el layout + páginas con rating inventado.
 */
export const GESTORIA_PROBLEMAS_REVIEWS: ProblemaSeo[] = [
  {
    id: 'hub-barcelona',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria/barcelona',
    problema: 'LegalService con aggregateRating 5.0/4 sin review[] en la página',
    accion: 'Eliminar aggregateRating del schema (corregido en gestoria-ciudad-schema.ts)',
  },
  {
    id: 'hub-madrid',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria/madrid',
    problema: 'LegalService con aggregateRating sin review[]',
    accion: 'Eliminar aggregateRating del schema',
  },
  {
    id: 'hub-valencia',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria/valencia',
    problema: 'LegalService con aggregateRating sin review[]',
    accion: 'Eliminar aggregateRating del schema',
  },
  {
    id: 'hub-sevilla',
    severidad: 'critico',
    tipo: 'schema-reviews',
    url: '/gestoria/sevilla',
    problema: 'aggregateRating inventado 4.9/203 sin reseñas reales',
    accion: 'Eliminar aggregateRating del JSON-LD',
  },
  {
    id: 'gestoria-main',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria',
    problema: 'aggregateRating duplicado en cada Service del catálogo sin review[]',
    accion: 'Mantener rating solo a nivel Organization con review[] completo',
  },
  {
    id: 'venta-completa',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria/venta-completa-reserva-escritura',
    problema: 'Service con aggregateRating sin review[]',
    accion: 'Eliminar aggregateRating',
  },
  {
    id: 'asesoramiento-arras',
    severidad: 'alto',
    tipo: 'schema-reviews',
    url: '/gestoria/asesoramiento-arras-venta',
    problema: 'aggregateRating 5.0/12 sin review[]',
    accion: 'Eliminar aggregateRating',
  },
  {
    id: 'zaragoza-alquiler',
    severidad: 'critico',
    tipo: 'schema-reviews',
    url: '/zaragoza/contrato-alquiler',
    problema: 'aggregateRating inventado 4.8/127',
    accion: 'Eliminar aggregateRating',
  },
  {
    id: 'granada-alquiler',
    severidad: 'critico',
    tipo: 'schema-reviews',
    url: '/granada/contrato-alquiler',
    problema: 'aggregateRating inventado 4.8/94',
    accion: 'Eliminar aggregateRating',
  },
  {
    id: 'ciudad-arras',
    severidad: 'medio',
    tipo: 'schema-reviews',
    url: '/{ciudad}/contrato-arras',
    problema: 'GSC puede marcar reseñas inválidas por conflicto con ratings de otras URLs del sitio',
    accion: 'Corregir ratings globales; estas páginas solo llevan Service + FAQ (correcto)',
  },
]

export const GESTORIA_PROBLEMAS_SITEMAP: ProblemaSeo[] = GESTORIA_FUERA_SITEMAP.map((url) => ({
  id: `sitemap-${url}`,
  severidad: 'medio' as const,
  tipo: 'sitemap' as const,
  url,
  problema: 'URL activa no incluida en sitemap.xml',
  accion: 'Añadir a src/app/sitemap.ts',
}))

export const GESTORIA_AUDITORIA_RESUMEN = {
  landingsCiudadArras: 14,
  landingsCiudadAlquiler: 16,
  hubsGestoria: 4,
  problemaPrincipal:
    'Fragmentos de reseñas inválidos por aggregateRating sin review[] o con cifras inventadas (203, 127, 94 reseñas)',
  paginasNoindexCorrectas: GESTORIA_NOINDEX_OK.length,
  paginasFueraSitemap: GESTORIA_FUERA_SITEMAP.length,
} as const
