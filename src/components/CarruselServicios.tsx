'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Servicio {
  nombre: string
  precio: number
  categoria: string
  slug: string
  imagen: string
  tiempo: string
  descripcion: string
}

const SERVICIOS: Servicio[] = [
  { nombre: 'Arras Penitenciales', precio: 145, categoria: 'Compraventa', slug: 'arras-penitenciales', imagen: '/gestoria/gestoria1.jpg', tiempo: '48h', descripcion: 'El estándar de oro en compraventa. Permite al comprador desistir perdiendo la señal, o al vendedor devolviendo el doble.' },
  { nombre: 'Arras Confirmatorias', precio: 145, categoria: 'Compraventa', slug: 'arras-confirmatorias', imagen: '/gestoria/gestoria2.jpg', tiempo: '48h', descripcion: 'El contrato más vinculante. Obliga a ambas partes al cumplimiento. Ideal para operaciones con total certeza.' },
  { nombre: 'Contrato de Reserva de Compra', precio: 61, categoria: 'Compraventa', slug: 'reserva-compra', imagen: '/gestoria/gestoria3.jpg', tiempo: '24h', descripcion: 'Documento rápido y efectivo para retirar el piso del mercado durante 48-72h mientras se revisa la nota simple.' },
  { nombre: 'Contrato de Alquiler LAU', precio: 120, categoria: 'Alquiler', slug: 'contrato-alquiler', imagen: '/gestoria/gestoria4.jpg', tiempo: '48h', descripcion: 'Adaptado a Ley de Vivienda 2026. Para propietarios e inquilinos. Cláusulas personalizadas y protección legal.' },
  { nombre: 'Alquiler con Opción a Compra', precio: 182, categoria: 'Compraventa', slug: 'alquiler-opcion-compra', imagen: '/gestoria/gestoria5.jpg', tiempo: '48h', descripcion: 'Vive en el piso mientras ahorras para comprarlo. Descuento de rentas pagadas en precio final. Precio fijado.' },
  { nombre: 'Revisión de Arras', precio: 60, categoria: 'Revisión Legal', slug: 'revision-arras', imagen: '/gestoria/gestoria6.jpg', tiempo: '24h', descripcion: 'Te han dado un contrato de arras? Lo revisamos en 24h. Detectamos cláusulas abusivas y errores registrales.' },
  { nombre: 'Revisión de Alquiler', precio: 60, categoria: 'Revisión Legal', slug: 'revision-alquiler', imagen: '/gestoria/gestoria7.jpg', tiempo: '24h', descripcion: 'Verificamos cumplimiento Ley Vivienda 2026. Detectamos cláusulas ilegales y fianzas abusivas.' },
  { nombre: 'Alquiler de Habitación', precio: 121, categoria: 'Alquiler', slug: 'alquiler-habitaciones', imagen: '/gestoria/gestoria10.jpg', tiempo: '48h', descripcion: 'Regulación de zonas comunes. Normas de convivencia pactadas. Ideal para pisos compartidos o coliving.' },
  { nombre: 'Rescisión de Alquiler', precio: 73, categoria: 'Rescisión', slug: 'rescision-alquiler', imagen: '/gestoria/gestoria1.jpg', tiempo: '48h', descripcion: 'Acta de estado del inmueble. Liquidación y devolución de fianza. Evita conflictos al terminar el contrato.' },
  { nombre: 'Análisis de Fraude', precio: 29, categoria: 'Revisión Legal', slug: 'contrato-ilegal', imagen: '/gestoria/gestoria2.jpg', tiempo: '12h', descripcion: 'Verificación documentación. Detección de señales de fraude. Informe urgente de riesgos críticos en 12h.' },
  { nombre: 'Servicio Completo Compra', precio: 666, categoria: 'Premium', slug: 'compra-completa-reserva-escritura', imagen: '/gestoria/gestoria3.jpg', tiempo: '30d', descripcion: 'Gestión completa de reserva a escritura. Coordinación notaría. Análisis registral y urbanístico. Atención prioritaria.' },
  { nombre: 'Asesoría Completa Compra', precio: 95, categoria: 'Premium', slug: 'asesoria-compra', imagen: '/gestoria/gestoria4.jpg', tiempo: '48h', descripcion: 'Análisis nota simple + arras. Asesoramiento hipoteca. Acompañamiento hasta escritura por abogados.' },
  { nombre: 'Préstamo entre Particulares', precio: 109, categoria: 'Financiación', slug: 'prestamo-particulares', imagen: '/gestoria/gestoria5.jpg', tiempo: '48h', descripcion: 'Importe, plazos y cuotas detalladas. Nota fiscal ante AEAT. Protección legal para ambas partes.' },
  { nombre: 'Alquiler Local Comercial', precio: 121, categoria: 'Alquiler', slug: 'alquiler-local-comercial', imagen: '/gestoria/gestoria6.jpg', tiempo: '48h', descripcion: 'Régimen LAU uso distinto vivienda. Actualización renta libre o IPC. Derecho de tanteo ante venta.' },
  { nombre: 'Pack Revisión + Alquiler', precio: 169, categoria: 'Alquiler', slug: 'pack-revision-reserva-alquiler', imagen: '/gestoria/gestoria7.jpg', tiempo: '48h', descripcion: 'Revisión completa de reserva + Redacción contrato alquiler LAU. Todo en uno con ahorro.' },
]

export default function CarruselServicios() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isPaused) return

    let scrollAmount = 0
    const scrollSpeed = 0.5 // píxeles por frame

    const scroll = () => {
      scrollAmount += scrollSpeed
      
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount
        
        // Reiniciar cuando llega al final (efecto infinito)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
      }
      
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)
    
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  // Duplicar servicios para efecto infinito
  const serviciosDuplicados = [...SERVICIOS, ...SERVICIOS]

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="text-center mb-6 sm:mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#c9962a]/15 text-[#a87a20] border border-[#c9962a]/25 mb-3 sm:mb-4">
          Gestoría Inmobiliaria Digital
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-2 sm:mb-3 px-2">
          Contratos redactados por expertos en 48h
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
          Redacción, revisión y asesoría legal inmobiliaria. Desde 29€. Pago seguro con Stripe.
        </p>
      </div>

      {/* Carrusel */}
      <div 
        className="relative overflow-hidden mb-6 sm:mb-8 -mx-3 sm:mx-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Gradientes laterales - más pequeños en móvil */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Contenedor scroll */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-5 lg:gap-6 overflow-x-hidden py-2 px-3 sm:px-0"
          style={{ scrollBehavior: 'auto' }}
        >
          {serviciosDuplicados.map((servicio, index) => (
            <Link
              key={`${servicio.slug}-${index}`}
              href={`/gestoria/solicitar/${servicio.slug}`}
              className="group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#c9962a] hover:shadow-2xl transition-all duration-300"
            >
              {/* Imagen del servicio */}
              <div className="relative h-36 sm:h-44 lg:h-48 w-full bg-gray-100">
                <Image
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                />
                {/* Overlay con categoría */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold bg-white/90 backdrop-blur-sm text-[#a87a20] border border-[#c9962a]/20">
                    {servicio.categoria}
                  </span>
                </div>
                {servicio.categoria === 'Premium' && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-yellow-500 text-white">
                      ⭐ POPULAR
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Título */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#c9962a] transition min-h-[44px] sm:min-h-[56px] line-clamp-2">
                  {servicio.nombre}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed min-h-[60px] sm:min-h-[72px] lg:min-h-[80px] line-clamp-3 sm:line-clamp-4">
                  {servicio.descripcion}
                </p>

                {/* Precio y tiempo */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-[#c9962a]">{servicio.precio}€</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">IVA incluido</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">Entrega en</div>
                    <div className="text-xs sm:text-sm text-[#c9962a] font-bold">{servicio.tiempo}</div>
                  </div>
                </div>

                {/* Indicador hover - solo desktop */}
                <div className="hidden sm:flex mt-4 items-center justify-center text-sm font-semibold text-[#c9962a] opacity-0 group-hover:opacity-100 transition-opacity">
                  Solicitar ahora
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Indicador de pausa - solo desktop */}
      <div className="hidden sm:block text-center mb-6">
        <p className="text-sm text-gray-500">
          {isPaused ? 'Carrusel pausado - Mueve el cursor fuera para continuar' : 'Pasa el ratón sobre una tarjeta para pausar'}
        </p>
      </div>

      {/* Indicador móvil */}
      <div className="sm:hidden text-center mb-6">
        <p className="text-xs text-gray-500">
          Desliza para ver más servicios →
        </p>
      </div>

      {/* CTA */}
      <div className="text-center px-2">
        <Link
          href="/gestoria"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors shadow-lg text-sm sm:text-base"
        >
          Ver todos los servicios
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
