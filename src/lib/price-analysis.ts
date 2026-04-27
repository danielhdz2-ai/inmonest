/**
 * price-analysis.ts
 * 
 * Análisis competitivo de precios para SEO
 * Genera estadísticas únicas que diferencian nuestros listings
 */

import { createClient } from '@/lib/supabase/server'

export interface PriceAnalysis {
  averageInCity: number | null
  averageInDistrict: number | null
  pricePerM2: number
  pricePerM2City: number | null
  pricePerM2District: number | null
  percentageDiffCity: number | null
  percentageDiffDistrict: number | null
  similarListings: number
  trend: 'below' | 'average' | 'above'
  trendDistrict: 'below' | 'average' | 'above' | null
  badge: string
}

export async function getPriceAnalysis(
  listingId: string,
  city: string | null,
  district: string | null,
  operation: string,
  price_eur: number | null,
  area_m2: number | null,
  bedrooms: number | null,
): Promise<PriceAnalysis | null> {
  if (!price_eur || !area_m2) return null

  const pricePerM2 = Math.round(price_eur / area_m2)
  const supabase = await createClient()

  try {
    // Precio medio en la ciudad
    let avgCity: number | null = null
    let avgM2City: number | null = null
    if (city) {
      const { data: cityData } = await supabase
        .from('listings')
        .select('price_eur, area_m2')
        .eq('city', city)
        .eq('operation', operation)
        .not('price_eur', 'is', null)
        .not('area_m2', 'is', null)
        .gt('price_eur', 0)
        .gt('area_m2', 0)
        .neq('id', listingId)

      if (cityData && cityData.length > 0) {
        const validCity = cityData.filter(l => l.price_eur && l.area_m2)
        if (validCity.length > 0) {
          avgCity = Math.round(validCity.reduce((sum, l) => sum + l.price_eur!, 0) / validCity.length)
          avgM2City = Math.round(validCity.reduce((sum, l) => sum + (l.price_eur! / l.area_m2!), 0) / validCity.length)
        }
      }
    }

    // Precio medio en el barrio/distrito
    let avgDistrict: number | null = null
    let avgM2District: number | null = null
    if (district && city) {
      const { data: districtData } = await supabase
        .from('listings')
        .select('price_eur, area_m2')
        .eq('city', city)
        .eq('district', district)
        .eq('operation', operation)
        .not('price_eur', 'is', null)
        .not('area_m2', 'is', null)
        .gt('price_eur', 0)
        .gt('area_m2', 0)
        .neq('id', listingId)

      if (districtData && districtData.length >= 3) { // mínimo 3 para que sea representativo
        const validDistrict = districtData.filter(l => l.price_eur && l.area_m2)
        if (validDistrict.length >= 3) {
          avgDistrict = Math.round(validDistrict.reduce((sum, l) => sum + l.price_eur!, 0) / validDistrict.length)
          avgM2District = Math.round(validDistrict.reduce((sum, l) => sum + (l.price_eur! / l.area_m2!), 0) / validDistrict.length)
        }
      }
    }

    // Contar pisos similares (misma ciudad, misma operación, ±1 habitación)
    let similarCount = 0
    if (city && bedrooms != null) {
      const { count } = await supabase
        .from('listings')
        .select('id', { count: 'exact', head: true })
        .eq('city', city)
        .eq('operation', operation)
        .gte('bedrooms', Math.max(0, bedrooms - 1))
        .lte('bedrooms', bedrooms + 1)
        .neq('id', listingId)

      similarCount = count ?? 0
    }

    // Calcular diferencias porcentuales
    const percentageDiffCity = avgCity 
      ? Math.round(((price_eur - avgCity) / avgCity) * 100)
      : null

    const percentageDiffDistrict = avgDistrict
      ? Math.round(((price_eur - avgDistrict) / avgDistrict) * 100)
      : null

    // Determinar tendencia (usar distrito si disponible, sino ciudad)
    const refPercentage = percentageDiffDistrict ?? percentageDiffCity ?? 0
    let trend: 'below' | 'average' | 'above' = 'average'
    if (refPercentage < -10) trend = 'below'
    else if (refPercentage > 10) trend = 'above'

    let trendDistrict: 'below' | 'average' | 'above' | null = null
    if (percentageDiffDistrict !== null) {
      if (percentageDiffDistrict < -10) trendDistrict = 'below'
      else if (percentageDiffDistrict > 10) trendDistrict = 'above'
      else trendDistrict = 'average'
    }

    // Badge descriptivo
    let badge = 'Precio de mercado'
    if (trend === 'below') badge = 'Oportunidad'
    else if (trend === 'above') badge = 'Premium'

    return {
      averageInCity: avgCity,
      averageInDistrict: avgDistrict,
      pricePerM2,
      pricePerM2City: avgM2City,
      pricePerM2District: avgM2District,
      percentageDiffCity,
      percentageDiffDistrict,
      similarListings: similarCount,
      trend,
      trendDistrict,
      badge,
    }
  } catch (error) {
    console.error('[getPriceAnalysis] Error:', error)
    return null
  }
}
