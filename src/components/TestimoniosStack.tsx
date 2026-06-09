import { TESTIMONIOS } from '@/lib/testimonios-data'

type TestimoniosStackProps = {
  limit?: number
  ciudad?: string
}

function testimoniosParaCiudad(ciudad?: string) {
  if (!ciudad) return TESTIMONIOS
  const locales = TESTIMONIOS.filter(
    (t) => t.ciudad.toLowerCase() === ciudad.toLowerCase(),
  )
  return locales.length > 0 ? locales : TESTIMONIOS
}

export default function TestimoniosStack({ limit, ciudad }: TestimoniosStackProps) {
  const base = testimoniosParaCiudad(ciudad)
  const items = limit ? base.slice(0, limit) : base

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {items.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
        >
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < t.rating ? 'text-[#c9962a]' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-gray-700 leading-relaxed mb-4">&ldquo;{t.texto}&rdquo;</blockquote>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{t.nombre.split(' ')[0]} {t.nombre.split(' ')[1]?.[0]}.</span>
            {' · '}
            {t.ciudad}
            {' · '}
            {t.servicio}
            {' · '}
            {t.fecha}
          </div>
        </div>
      ))}
    </div>
  )
}
