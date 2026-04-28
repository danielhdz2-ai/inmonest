/**
 * Precios de referencia por m² en España (2024)
 * Fuente: Idealista, Fotocasa, INE
 * Actualizado: Abril 2026
 */

export interface CityPriceReference {
  city: string
  avgPricePerM2Sale: number    // €/m² venta
  avgPricePerM2Rent: number     // €/m² alquiler mensual
  province: string
  population: number
}

/**
 * Tabla de referencia de precios medios por ciudad
 * Ordenado por relevancia (poblacion)
 */
export const CITY_PRICE_REFERENCE: CityPriceReference[] = [
  // MADRID
  { city: 'Madrid', province: 'Madrid', population: 3305000, avgPricePerM2Sale: 4200, avgPricePerM2Rent: 17 },
  
  // BARCELONA
  { city: 'Barcelona', province: 'Barcelona', population: 1636000, avgPricePerM2Sale: 4800, avgPricePerM2Rent: 19 },
  
  // VALENCIA
  { city: 'Valencia', province: 'Valencia', population: 791000, avgPricePerM2Sale: 2100, avgPricePerM2Rent: 11 },
  
  // SEVILLA
  { city: 'Sevilla', province: 'Sevilla', population: 688000, avgPricePerM2Sale: 2300, avgPricePerM2Rent: 10 },
  
  // ZARAGOZA
  { city: 'Zaragoza', province: 'Zaragoza', population: 675000, avgPricePerM2Sale: 1700, avgPricePerM2Rent: 8 },
  
  // MÁLAGA
  { city: 'Málaga', province: 'Málaga', population: 578000, avgPricePerM2Sale: 2800, avgPricePerM2Rent: 12 },
  
  // MURCIA
  { city: 'Murcia', province: 'Murcia', population: 459000, avgPricePerM2Sale: 1500, avgPricePerM2Rent: 7 },
  
  // PALMA DE MALLORCA
  { city: 'Palma', province: 'Baleares', population: 416000, avgPricePerM2Sale: 3500, avgPricePerM2Rent: 14 },
  
  // BILBAO
  { city: 'Bilbao', province: 'Vizcaya', population: 346000, avgPricePerM2Sale: 3800, avgPricePerM2Rent: 15 },
  
  // ALICANTE
  { city: 'Alicante', province: 'Alicante', population: 337000, avgPricePerM2Sale: 1900, avgPricePerM2Rent: 9 },
  
  // CÓRDOBA
  { city: 'Córdoba', province: 'Córdoba', population: 326000, avgPricePerM2Sale: 1400, avgPricePerM2Rent: 7 },
  
  // VALLADOLID
  { city: 'Valladolid', province: 'Valladolid', population: 298000, avgPricePerM2Sale: 1600, avgPricePerM2Rent: 8 },
  
  // VIGO
  { city: 'Vigo', province: 'Pontevedra', population: 293000, avgPricePerM2Sale: 1800, avgPricePerM2Rent: 8 },
  
  // GIJÓN
  { city: 'Gijón', province: 'Asturias', population: 271000, avgPricePerM2Sale: 1900, avgPricePerM2Rent: 9 },
  
  // HOSPITALET DE LLOBREGAT
  { city: 'Hospitalet de Llobregat', province: 'Barcelona', population: 268000, avgPricePerM2Sale: 2900, avgPricePerM2Rent: 13 },
  
  // A CORUÑA
  { city: 'A Coruña', province: 'A Coruña', population: 246000, avgPricePerM2Sale: 2000, avgPricePerM2Rent: 9 },
  
  // GRANADA
  { city: 'Granada', province: 'Granada', population: 232000, avgPricePerM2Sale: 1700, avgPricePerM2Rent: 8 },
  
  // VITORIA-GASTEIZ
  { city: 'Vitoria-Gasteiz', province: 'Álava', population: 254000, avgPricePerM2Sale: 2400, avgPricePerM2Rent: 11 },
  
  // ELCHE
  { city: 'Elche', province: 'Alicante', population: 234000, avgPricePerM2Sale: 1300, avgPricePerM2Rent: 7 },
  
  // OVIEDO
  { city: 'Oviedo', province: 'Asturias', population: 220000, avgPricePerM2Sale: 2100, avgPricePerM2Rent: 10 },
  
  // SANTANDER
  { city: 'Santander', province: 'Cantabria', population: 172000, avgPricePerM2Sale: 2300, avgPricePerM2Rent: 10 },
  
  // PAMPLONA
  { city: 'Pamplona', province: 'Navarra', population: 204000, avgPricePerM2Sale: 2600, avgPricePerM2Rent: 11 },
  
  // SAN SEBASTIÁN (DONOSTIA)
  { city: 'San Sebastián', province: 'Guipúzcoa', population: 187000, avgPricePerM2Sale: 5200, avgPricePerM2Rent: 18 },
  { city: 'Donostia', province: 'Guipúzcoa', population: 187000, avgPricePerM2Sale: 5200, avgPricePerM2Rent: 18 },
  
  // CARTAGENA
  { city: 'Cartagena', province: 'Murcia', population: 218000, avgPricePerM2Sale: 1400, avgPricePerM2Rent: 7 },
  
  // JEREZ DE LA FRONTERA
  { city: 'Jerez de la Frontera', province: 'Cádiz', population: 213000, avgPricePerM2Sale: 1200, avgPricePerM2Rent: 6 },
  
  // MARBELLA
  { city: 'Marbella', province: 'Málaga', population: 147000, avgPricePerM2Sale: 4200, avgPricePerM2Rent: 16 },
  
  // TARRAGONA
  { city: 'Tarragona', province: 'Tarragona', population: 135000, avgPricePerM2Sale: 1900, avgPricePerM2Rent: 9 },
  
  // TOLEDO
  { city: 'Toledo', province: 'Toledo', population: 86000, avgPricePerM2Sale: 1400, avgPricePerM2Rent: 7 },
]

/**
 * Obtiene la referencia de precios para una ciudad
 */
export function getCityReference(city: string | null): CityPriceReference | null {
  if (!city) return null
  
  // Normalizar nombre de ciudad (quitar acentos, mayúsculas)
  const normalized = city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
  
  return CITY_PRICE_REFERENCE.find(ref => 
    ref.city.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase() === normalized
  ) || null
}

/**
 * Calcula el % de desviación respecto a la media de la ciudad
 */
export function calculatePriceDeviation(
  price_eur: number,
  area_m2: number,
  city: string | null,
  operation: 'sale' | 'rent'
): {
  pricePerM2: number
  cityAvgPerM2: number | null
  deviation: number | null
  isOpportunity: boolean
  isPremium: boolean
  label: string
} {
  const pricePerM2 = Math.round(price_eur / area_m2)
  const cityRef = getCityReference(city)
  
  if (!cityRef) {
    return {
      pricePerM2,
      cityAvgPerM2: null,
      deviation: null,
      isOpportunity: false,
      isPremium: false,
      label: 'Sin referencia'
    }
  }
  
  const cityAvgPerM2 = operation === 'rent' 
    ? cityRef.avgPricePerM2Rent 
    : cityRef.avgPricePerM2Sale
  
  const deviation = Math.round(((pricePerM2 - cityAvgPerM2) / cityAvgPerM2) * 100)
  
  const isOpportunity = deviation < -10  // 10% o más barato
  const isPremium = deviation > 20       // 20% o más caro
  
  let label = 'Precio medio'
  if (isOpportunity) label = 'Oportunidad'
  else if (isPremium) label = 'Propiedad premium'
  else if (deviation < -5) label = 'Buen precio'
  else if (deviation > 10) label = 'Precio alto'
  
  return {
    pricePerM2,
    cityAvgPerM2,
    deviation,
    isOpportunity,
    isPremium,
    label
  }
}
