/**
 * Rutas canónicas de navegación — arquitectura SEO gestoría (post-portal).
 *
 * Capas:
 * 1. Marca: /, /gestoria, /opiniones, /sobre-nosotros
 * 2. Catálogo info: /servicios, /gestoria/[servicio]
 * 3. Checkout: /gestoria/solicitar → /gestoria/solicitar/[servicio]
 * 4. SEO local servicio: /[ciudad]/contrato-alquiler, /barcelona/contrato-alquiler/[barrio]
 * 5. Embudo legacy indexable: /[ciudad]/pisos, alquiler-particulares, etc. → capas 3–4
 * 6. Hub ciudad contratos: /contratos-inmobiliarios/[ciudad]
 */

export const GESTORIA_HUB = '/gestoria' as const
export const GESTORIA_SERVICIOS_CATALOGO = '/servicios' as const
export const GESTORIA_CONTRATOS_HUB = '/contratos-inmobiliarios' as const
/** Índice de checkout — destino del CTA global «Solicitar contrato». */
export const GESTORIA_SOLICITAR_HUB = '/gestoria/solicitar' as const
export const GESTORIA_LAU_INFO = '/gestoria/contrato-alquiler' as const
export const GESTORIA_LAU_CHECKOUT = '/gestoria/solicitar/contrato-alquiler' as const
export const GESTORIA_ARRAS_CHECKOUT = '/gestoria/solicitar/arras-penitenciales' as const
export const GESTORIA_MI_EXPEDIENTES = '/mi-cuenta/contratos' as const

/** CTAs globales de nav y landings genéricas. */
export const GESTORIA_NAV_SOLICITAR_LABEL = 'Solicitar contrato' as const
export const GESTORIA_NAV_SOLICITAR_LABEL_MOBILE = 'Ver todos los contratos' as const
