'use client'

import { useState, useEffect } from 'react'
import { TESTIMONIOS } from '@/lib/testimonios-data'

type TestimoniosCarouselProps = {
  ciudad?: string
  hideRating?: boolean
}

function testimoniosParaCiudad(ciudad?: string) {
  if (!ciudad) return TESTIMONIOS
  const locales = TESTIMONIOS.filter(
    (t) => t.ciudad.toLowerCase() === ciudad.toLowerCase(),
  )
  return locales.length > 0 ? locales : TESTIMONIOS
}

export default function TestimoniosCarousel({ ciudad, hideRating = false }: TestimoniosCarouselProps) {
  const testimonios = testimoniosParaCiudad(ciudad)
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length)
    }, 6000) // Cambiar cada 6 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonios.length])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Reanudar auto-play después de 10s
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonios.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const testimonio = testimonios[current]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Testimonio principal */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Foto del cliente */}
          <div className="flex-shrink-0">
            <div 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#c9962a]/30 bg-cover bg-center bg-gray-200"
              style={{ backgroundImage: `url('${testimonio.foto}')` }}
            />
          </div>

          {/* Contenido */}
          <div className="flex-1">
            {!hideRating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonio.rating ? 'text-[#c9962a]' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500 font-medium">
                  {testimonio.rating}.0
                </span>
              </div>
            )}

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              &ldquo;{testimonio.texto}&rdquo;
            </p>

            {/* Info del cliente */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{testimonio.nombre}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{testimonio.ciudad}</span>
              </div>
              {testimonio.ahorro && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    💰 Ahorró {testimonio.ahorro}
                  </span>
                </>
              )}
            </div>

            {/* Servicio contratado */}
            <div className="mt-3 inline-block bg-[#c9962a]/10 text-[#c9962a] px-3 py-1 rounded-full text-xs font-medium">
              {testimonio.servicio}
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Botón anterior */}
        <button
          onClick={prev}
          className="p-2 rounded-full border border-gray-200 hover:border-[#c9962a] hover:bg-[#c9962a]/5 transition-colors"
          aria-label="Anterior testimonio"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === current
                  ? 'w-8 h-2 bg-[#c9962a] rounded-full'
                  : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
              aria-label={`Ir a testimonio ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={next}
          className="p-2 rounded-full border border-gray-200 hover:border-[#c9962a] hover:bg-[#c9962a]/5 transition-colors"
          aria-label="Siguiente testimonio"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Contador */}
      <div className="text-center mt-3 text-sm text-gray-500">
        {current + 1} de {testimonios.length}
      </div>
    </div>
  )
}
