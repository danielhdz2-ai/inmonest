/**
 * Imágenes principales de marca Inmonest.
 * promo     → portal / búsqueda / urbano
 * promo1    → gestoría / contratos / confianza cercana
 * promo3    → familia / CTA / confianza social
 */
export const BRAND_IMAGES = {
  portal: { src: '/promo.png', alt: 'Personas buscando vivienda en la ciudad' },
  gestoria: { src: '/promo1.png', alt: 'Familia revisando documentación inmobiliaria' },
  familia: { src: '/promo3.png', alt: 'Familia en su hogar' },
} as const

export type BrandImageKey = keyof typeof BRAND_IMAGES

export function brandImage(key: BrandImageKey) {
  return BRAND_IMAGES[key]
}
