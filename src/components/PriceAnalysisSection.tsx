/**
 * PriceAnalysisSection.tsx
 * 
 * Sección de análisis de precios competitivo
 * Contenido único para SEO que ningún otro portal tiene
 */

import type { PriceAnalysis } from '@/lib/price-analysis'

interface Props {
  analysis: PriceAnalysis
  city: string | null
  district: string | null
  operation: string
  bedrooms: number | null
}

export default function PriceAnalysisSection({ analysis, city, district, operation, bedrooms }: Props) {
  const isRent = operation === 'rent'
  const opLabel = isRent ? 'alquiler' : 'venta'

  // Usar análisis de distrito si disponible, sino ciudad
  const primaryAvg = analysis.averageInDistrict ?? analysis.averageInCity
  const primaryPercentage = analysis.percentageDiffDistrict ?? analysis.percentageDiffCity
  const primaryPriceM2 = analysis.pricePerM2District ?? analysis.pricePerM2City
  const primaryLocation = analysis.averageInDistrict ? district : city

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        📊 Análisis del Precio
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Comparativa de mercado en {primaryLocation ?? city ?? 'la zona'}
      </p>

      {/* Badge principal */}
      <div className="mb-6">
        {analysis.trend === 'below' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full">
            <span className="text-xl">🎯</span>
            <span className="font-semibold">Oportunidad de precio</span>
          </div>
        )}
        {analysis.trend === 'above' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 rounded-full">
            <span className="text-xl">⭐</span>
            <span className="font-semibold">Inmueble Premium</span>
          </div>
        )}
        {analysis.trend === 'average' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-full">
            <span className="text-xl">📈</span>
            <span className="font-semibold">Precio de mercado</span>
          </div>
        )}
      </div>

      {/* Estadísticas principales */}
      <div className="space-y-4">
        
        {/* Precio por m² vs media */}
        {primaryPriceM2 && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Precio por m² en {primaryLocation}</span>
              <span className="text-xs text-gray-400">Media de zona</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {analysis.pricePerM2.toLocaleString('es-ES')} €/m²
              </span>
              <span className="text-lg font-semibold text-gray-500">
                {primaryPriceM2.toLocaleString('es-ES')} €/m²
              </span>
            </div>
            {primaryPercentage !== null && primaryPercentage !== 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {primaryPercentage > 0 ? '+' : ''}{primaryPercentage}% respecto a la media de {primaryLocation}
              </p>
            )}
          </div>
        )}

        {/* Precio total vs media */}
        {primaryAvg && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Precio medio de {opLabel} en {primaryLocation}
            </p>
            <p className="text-xl font-bold text-gray-900">
              {primaryAvg.toLocaleString('es-ES')} €{isRent ? '/mes' : ''}
            </p>
            {primaryPercentage !== null && (
              <p className={`text-sm font-semibold mt-1 ${
                primaryPercentage < -5 
                  ? 'text-emerald-700' 
                  : primaryPercentage > 5 
                    ? 'text-amber-700' 
                    : 'text-gray-600'
              }`}>
                {primaryPercentage > 0 
                  ? `${primaryPercentage}% más caro que la media`
                  : primaryPercentage < 0
                    ? `${Math.abs(primaryPercentage)}% más barato que la media`
                    : 'Precio ajustado a la media'}
              </p>
            )}
          </div>
        )}

        {/* Comparativa ciudad vs barrio */}
        {analysis.averageInDistrict && analysis.averageInCity && district && city && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 mb-3">Comparativa de mercado</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Media en {district}</span>
                <span className="font-semibold text-gray-900">
                  {analysis.averageInDistrict.toLocaleString('es-ES')} €{isRent ? '/mes' : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Media en {city}</span>
                <span className="font-semibold text-gray-900">
                  {analysis.averageInCity.toLocaleString('es-ES')} €{isRent ? '/mes' : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pisos similares */}
        {analysis.similarListings > 0 && bedrooms !== null && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              Encontramos <strong className="text-gray-900">{analysis.similarListings}</strong> {opLabel === 'alquiler' ? 'alquileres' : 'pisos en venta'} similares de {bedrooms === 0 ? 'estudio' : `${bedrooms} habitación${bedrooms !== 1 ? 'es' : ''}`} en {city}.
            </p>
          </div>
        )}

        {/* Insight final */}
        {primaryPercentage !== null && (
          <div className={`border-t border-gray-100 pt-4 ${
            analysis.trend === 'below' 
              ? 'bg-emerald-50/30' 
              : analysis.trend === 'above' 
                ? 'bg-amber-50/30' 
                : ''
          } -mx-4 -mb-4 px-4 pb-4 mt-4 rounded-b-2xl`}>
            <p className="text-sm font-medium text-gray-700">
              💡 <strong>Análisis:</strong>{' '}
              {analysis.trend === 'below' && (
                `Este ${opLabel} está un ${Math.abs(primaryPercentage!)}% por debajo del precio medio en ${primaryLocation}. Es una buena oportunidad si buscas en esta zona.`
              )}
              {analysis.trend === 'above' && (
                `Este inmueble está posicionado como premium, un ${primaryPercentage}% por encima de la media en ${primaryLocation}. Puede incluir características o ubicación excepcionales.`
              )}
              {analysis.trend === 'average' && (
                `El precio se encuentra dentro del rango habitual para ${primaryLocation}. Es una opción equilibrada en relación calidad-precio.`
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
