/**
 * NeighborhoodSection.tsx
 * 
 * Sección de información del barrio
 * Contenido único generado con IA para mejorar SEO
 */

import type { NeighborhoodInfo } from '@/lib/neighborhood-info'

interface Props {
  info: NeighborhoodInfo
}

export default function NeighborhoodSection({ info }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        🏘️ {info.title}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Conoce la zona y qué ofrece para tu día a día
      </p>

      {/* Highlights principales */}
      {info.highlights.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {info.highlights.map((highlight, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
            >
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="prose prose-sm max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {info.content}
        </div>
      </div>

      {/* Footer informativo */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 italic">
          💡 Esta información es orientativa y se basa en características generales de la zona. 
          Te recomendamos visitar el barrio para conocerlo personalmente.
        </p>
      </div>
    </div>
  )
}
