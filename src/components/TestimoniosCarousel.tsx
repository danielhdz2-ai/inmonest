'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Testimonio {
  id: number
  nombre: string
  ciudad: string
  servicio: string
  foto: string
  rating: number
  texto: string
  fecha: string
  ahorro?: string
}

const TESTIMONIOS: Testimonio[] = [
  {
    id: 1,
    nombre: 'María González',
    ciudad: 'Barcelona',
    servicio: 'Venta completa reserva-escritura',
    foto: '/familia1.jpg',
    rating: 5,
    texto: 'Vendí mi piso sin agencia gracias a Inmonest. El gestor personalizado me guió en cada paso desde la reserva hasta las escrituras. Me ahorré más de 12,000€ en comisiones y todo el proceso fue transparente y profesional.',
    fecha: 'Mayo 2026',
    ahorro: '12,000€'
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    ciudad: 'Madrid',
    servicio: 'Revisión contrato arras',
    foto: '/familia2.jpg',
    rating: 5,
    texto: 'Iba a firmar un contrato de arras con cláusulas abusivas que me hubieran costado 15,000€ si el vendedor se echaba atrás. La revisión legal de Inmonest detectó el problema y me salvó de una situación muy complicada.',
    fecha: 'Abril 2026'
  },
  {
    id: 3,
    nombre: 'Laura Martínez',
    ciudad: 'Valencia',
    servicio: 'Contrato alquiler LAU',
    foto: '/familia3.jpg',
    rating: 5,
    texto: 'Necesitaba un contrato de alquiler urgente y legal. En 48h tenía el contrato adaptado a la nueva Ley de Vivienda 2026. Mi inquilino y yo firmamos tranquilos sabiendo que todo estaba en regla.',
    fecha: 'Mayo 2026'
  },
  {
    id: 4,
    nombre: 'Javier López',
    ciudad: 'Sevilla',
    servicio: 'Compra completa reserva-escritura',
    foto: '/familia5.jpg',
    rating: 5,
    texto: 'Comprar mi primer piso era un proceso que me daba miedo por toda la burocracia. El servicio de acompañamiento completo fue perfecto: me explicaron cada paso, revisaron toda la documentación y coordinaron con la notaría. Valió cada euro.',
    fecha: 'Marzo 2026'
  },
  {
    id: 5,
    nombre: 'Ana Fernández',
    ciudad: 'Málaga',
    servicio: 'Due diligence pre-compra',
    foto: '/familia6.jpg',
    rating: 5,
    texto: 'Después de firmar las arras, contraté el pack de Due Diligence. Descubrieron derramas pendientes de 8,000€ que el vendedor no había mencionado. Pude negociar el precio final y evitar una sorpresa muy desagradable.',
    fecha: 'Abril 2026',
    ahorro: '8,000€'
  }
]

export default function TestimoniosCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIOS.length)
    }, 6000) // Cambiar cada 6 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Reanudar auto-play después de 10s
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIOS.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIOS.length) % TESTIMONIOS.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const testimonio = TESTIMONIOS[current]

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
            {/* Rating */}
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

            {/* Texto */}
            <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              "{testimonio.texto}"
            </blockquote>

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
          {TESTIMONIOS.map((_, index) => (
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
        {current + 1} de {TESTIMONIOS.length}
      </div>
    </div>
  )
}
