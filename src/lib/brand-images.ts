/**
 * Imágenes principales de marca Inmonest.
 * promo     → portal / búsqueda / urbano
 * promo3    → familia / CTA / confianza social
 */
const GESTORIA_SERVICIOS_HERO = {
  src: '/familia-reunida-hogar-acogedor.jpg',
  alt: 'Familia reunida en un hogar acogedor — gestoría inmobiliaria Inmonest',
} as const

export const BRAND_IMAGES = {
  portal: { src: '/promo.png', alt: 'Personas buscando vivienda en la ciudad' },
  /** Hero /gestoria, home gestoría y catálogo /servicios */
  gestoria: GESTORIA_SERVICIOS_HERO,
  serviciosHub: GESTORIA_SERVICIOS_HERO,
  familia: { src: '/promo3.png', alt: 'Familia en su hogar' },
} as const

export type BrandImageKey = keyof typeof BRAND_IMAGES

export function brandImage(key: BrandImageKey) {
  return BRAND_IMAGES[key]
}
