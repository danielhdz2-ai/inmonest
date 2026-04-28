/**
 * meta-description-generator.ts
 * 
 * Genera meta descriptions dinámicas optimizadas para SEO
 * Incluye análisis de precio competitivo
 */

import { calculatePriceDeviation } from './city-price-reference'

interface MetaDescriptionInput {
  title: string
  city: string | null
  district: string | null
  operation: 'sale' | 'rent'
  price_eur: number | null
  area_m2: number | null
  bedrooms: number | null
  is_particular: boolean
}

/**
 * Genera meta description optimizada (150-160 caracteres)
 * Incluye análisis de precio si está disponible
 */
export function generateMetaDescription(input: MetaDescriptionInput): string {
  const { city, district, operation, price_eur, area_m2, bedrooms, is_particular } = input
  
  // ── COMPONENTES BASE ──────────────────────────────────────────────
  const opLabel = operation === 'rent' ? 'alquiler' : 'venta'
  const location = district || city || 'España'
  const priceLabel = price_eur 
    ? `${price_eur.toLocaleString('es-ES')}€${operation === 'rent' ? '/mes' : ''}`
    : null
  
  const bedroomsLabel = bedrooms === 0 
    ? 'estudio' 
    : bedrooms === 1 
      ? '1 hab'
      : `${bedrooms} hab`
  
  // ── ANÁLISIS DE PRECIO ────────────────────────────────────────────
  let priceInsight = ''
  if (price_eur && area_m2 && city) {
    const analysis = calculatePriceDeviation(price_eur, area_m2, city, operation)
    
    if (analysis.deviation !== null) {
      const absDeviation = Math.abs(analysis.deviation)
      
      if (analysis.isOpportunity) {
        priceInsight = `${absDeviation}% más barato que la media. `
      } else if (analysis.deviation < -5) {
        priceInsight = `Buen precio, ${absDeviation}% menos que la media. `
      } else if (analysis.isPremium) {
        priceInsight = `Propiedad premium en zona exclusiva. `
      }
    }
  }
  
  // ── VENTAJA PARTICULAR ────────────────────────────────────────────
  const particularTag = is_particular ? 'Sin comisiones. ' : ''
  
  // ── CONSTRUCCIÓN FINAL ────────────────────────────────────────────
  // Formato: "Piso [ubicación] en [operación] · [hab] · [precio]. [análisis]. [particular]. Ver en Inmonest."
  
  let meta = `${bedroomsLabel.charAt(0).toUpperCase() + bedroomsLabel.slice(1)} en ${location}`
  
  if (priceLabel) {
    meta += ` · ${opLabel} por ${priceLabel}`
  } else {
    meta += ` en ${opLabel}`
  }
  
  meta += '. '
  
  if (priceInsight) {
    meta += priceInsight
  }
  
  if (particularTag) {
    meta += particularTag
  }
  
  meta += 'Ver detalles en Inmonest.'
  
  // ── TRUNCAR A 160 CARACTERES ──────────────────────────────────────
  if (meta.length > 160) {
    meta = meta.substring(0, 157) + '...'
  }
  
  return meta
}

/**
 * Genera meta description para listado/búsqueda
 */
export function generateListingMetaDescription(
  city: string | null,
  operation: 'sale' | 'rent',
  count: number
): string {
  const opLabel = operation === 'rent' ? 'alquiler' : 'venta'
  const location = city || 'España'
  
  return `${count} pisos en ${opLabel} en ${location}. Compara precios, fotos y ubicación. Encuentra tu piso ideal sin comisiones en Inmonest.`
}

/**
 * Genera meta description para página estática
 */
export function generateStaticMetaDescription(page: 'home' | 'about' | 'contact'): string {
  const metas = {
    home: 'Encuentra pisos en alquiler y venta sin comisiones. Compara precios, analiza gastos mensuales y contacta directamente con propietarios en Inmonest.',
    about: 'Inmonest es el portal inmobiliario transparente. Conectamos inquilinos y compradores con propietarios sin intermediarios. Ahorra en comisiones.',
    contact: 'Contacta con Inmonest para consultas, soporte o colaboraciones. Estamos aquí para ayudarte a encontrar tu próximo hogar sin comisiones.',
  }
  
  return metas[page]
}
