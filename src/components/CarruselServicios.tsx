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
  { nombre: 'Arras Penitenciales', precio: 145, categoria: 'Compraventa', slug: 'arras-penitenciales', imagen: '/gestoria1.jpg', tiempo: '48h', descripcion: 'El estándar de oro en compraventa. Permite al comprador desistir perdiendo la señal, o al vendedor devolviendo el doble.' },
  { nombre: 'Arras Confirmatorias', precio: 145, categoria: 'Compraventa', slug: 'arras-confirmatorias', imagen: '/gestoria2.jpg', tiempo: '48h', descripcion: 'El contrato más vinculante. Obliga a ambas partes al cumplimiento. Ideal para operaciones con total certeza.' },
  { nombre: 'Contrato de Reserva de Compra', precio: 61, categoria: 'Compraventa', slug: 'reserva-compra', imagen: '/gestoria3.jpg', tiempo: '24h', descripcion: 'Documento rápido y efectivo para retirar el piso del mercado durante 48-72h mientras se revisa la nota simple.' },
  { nombre: 'Contrato de Alquiler LAU', precio: 145, categoria: 'Alquiler', slug: 'contrato-alquiler', imagen: '/gestoria4.jpg', tiempo: '48h', descripcion: 'Adaptado a Ley de Vivienda 2026. Para propietarios e inquilinos. Cláusulas personalizadas y protección legal.' },
  { nombre: 'Alquiler con Opción a Compra', precio: 182, categoria: 'Compraventa', slug: 'alquiler-opcion-compra', imagen: '/gestoria5.jpg', tiempo: '48h', descripcion: 'Vive en el piso mientras ahorras para comprarlo. Descuento de rentas pagadas en precio final. Precio fijado.' },
  { nombre: 'Revisión de Arras', precio: 60, categoria: 'Revisión Legal', slug: 'revision-arras', imagen: '/gestoria6.jpg', tiempo: '24h', descripcion: 'Te han dado un contrato de arras? Lo revisamos en 24h. Detectamos cláusulas abusivas y errores registrales.' },
  { nombre: 'Revisión de Alquiler', precio: 120, categoria: 'Revisión Legal', slug: 'revision-alquiler', imagen: '/gestoria7.jpg', tiempo: '24h', descripcion: 'Verificamos cumplimiento Ley Vivienda 2026. Detectamos cláusulas ilegales y fianzas abusivas.' },
  { nombre: 'Alquiler de Habitación', precio: 145, categoria: 'Alquiler', slug: 'alquiler-habitaciones', imagen: '/gestoria10.jpg', tiempo: '48h', descripcion: 'Regulación de zonas comunes. Normas de convivencia pactadas. Ideal para pisos compartidos o coliving.' },
  { nombre: 'Rescisión de Alquiler', precio: 120, categoria: 'Rescisión', slug: 'rescision-alquiler', imagen: '/gestoria1.jpg', tiempo: '48h', descripcion: 'Acta de estado del inmueble. Liquidación y devolución de fianza. Evita conflictos al terminar el contrato.' },
  { nombre: 'Análisis de Fraude', precio: 145, categoria: 'Revisión Legal', slug: 'contrato-ilegal', imagen: '/gestoria2.jpg', tiempo: '12h', descripcion: 'Verificación documentación. Detección de señales de fraude. Informe urgente de riesgos críticos en 12h.' },
  { nombre: 'Servicio Completo Compra', precio: 687, categoria: 'Premium', slug: 'compra-completa-reserva-escritura', imagen: '/gestoria3.jpg', tiempo: '30d', descripcion: 'Gestión completa de reserva a escritura. Coordinación notaría. Análisis registral y urbanístico. Atención prioritaria.' },
  { nombre: 'Compra Parking/Trastero', precio: 295, categoria: 'Premium', slug: 'compra-completa-parking-trastero', imagen: '/gestoria9.jpg', tiempo: '30d', descripcion: 'Gestor asignado desde reserva hasta registro. Arras, notaría, ITP e inscripción registral para parking o trastero.' },
  { nombre: 'Préstamo entre Particulares', precio: 130, categoria: 'Financiación', slug: 'prestamo-particulares', imagen: '/gestoria5.jpg', tiempo: '48h', descripcion: 'Importe, plazos y cuotas detalladas. Nota fiscal ante AEAT. Protección legal para ambas partes.' },
  { nombre: 'Alquiler Local Comercial', precio: 145, categoria: 'Alquiler', slug: 'alquiler-local-comercial', imagen: '/gestoria6.jpg', tiempo: '48h', descripcion: 'Régimen LAU uso distinto vivienda. Actualización renta libre o IPC. Derecho de tanteo ante venta.' },
  { nombre: 'Pack Revisión + Alquiler', precio: 169, categoria: 'Alquiler', slug: 'pack-revision-reserva-alquiler', imagen: '/gestoria7.jpg', tiempo: '48h', descripcion: 'Revisión completa de reserva + Redacción contrato alquiler LAU. Todo en uno con ahorro.' },
]

export default function CarruselServicios() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isPaused) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

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
    <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-16">
      <div className="text-center mb-3 sm:mb-10">
        <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold bg-gold-500/15 text-gold-700 border border-gold-500/25 mb-1.5 sm:mb-4">
          Gestoría inmobiliaria digital
        </span>
        <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-1 sm:mb-3 px-2">
          Contratos redactados por expertos en 48h
        </h2>
        <p className="text-gray-600 text-[11px] sm:text-base max-w-2xl mx-auto px-2">
          Redacción, revisión y asesoría legal inmobiliaria. Desde 61€. Pago seguro con Stripe.
        </p>
      </div>

      {/* Carrusel */}
      <div 
        className="relative overflow-hidden mb-4 sm:mb-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Gradientes laterales - más pequeños en móvil */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-16 lg:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-16 lg:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Contenedor scroll */}
        <div
          ref={scrollRef}
          className="flex gap-1.5 sm:gap-5 lg:gap-6 overflow-x-hidden py-1.5 sm:py-2"
          style={{ scrollBehavior: 'auto' }}
        >
          {serviciosDuplicados.map((servicio, index) => (
            <Link
              key={`${servicio.slug}-${index}`}
              href={`/gestoria/solicitar/${servicio.slug}`}
              className="group flex-shrink-0 w-[220px] sm:w-[320px] lg:w-[340px] bg-white border border-gray-200 sm:border-2 rounded-lg sm:rounded-2xl overflow-hidden hover:border-gold-500 hover:shadow-xl transition-all duration-300"
            >
              {/* Imagen del servicio */}
              <div className="relative h-20 sm:h-40 lg:h-48 w-full bg-gray-100">
                <Image
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 320px, 340px"
                />
                {/* Overlay con categoría */}
                <div className="absolute top-1 sm:top-3 left-1 sm:left-3">
                  <span className="inline-block px-1 sm:px-3 py-0.5 sm:py-1 rounded text-[8px] sm:text-xs font-semibold bg-white/90 backdrop-blur-sm text-gold-700 border border-gold-500/20">
                    {servicio.categoria}
                  </span>
                </div>
                {servicio.categoria === 'Premium' && (
                  <div className="absolute top-1 sm:top-3 right-1 sm:right-3">
                    <span className="inline-block px-1 sm:px-3 py-0.5 sm:py-1 rounded text-[8px] sm:text-xs font-bold bg-gold-500 text-white uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-2 sm:p-5 lg:p-6">
                {/* Título */}
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-3 group-hover:text-gold-600 transition line-clamp-2">
                  {servicio.nombre}
                </h3>

                {/* Descripción - solo en tablet+ */}
                <p className="hidden sm:block text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {servicio.descripcion}
                </p>

                {/* Precio y tiempo */}
                <div className="flex items-center justify-between pt-1.5 sm:pt-4 sm:border-t sm:border-gray-200">
                  <div>
                    <div className="text-base sm:text-2xl font-bold text-gold-500">{servicio.precio}€</div>
                    <div className="text-[8px] sm:text-xs text-gray-500">IVA inc.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] sm:text-sm font-semibold text-gray-900">Entrega</div>
                    <div className="text-[10px] sm:text-sm text-gold-600 font-bold">{servicio.tiempo}</div>
                  </div>
                </div>

                {/* Indicador hover - solo desktop */}
                <div className="hidden sm:flex mt-4 items-center justify-center text-sm font-semibold text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">
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
      <div className="sm:hidden text-center mb-4">
        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
          <span>Desliza para ver más servicios</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </div>

      {/* CTA */}
      <div className="text-center px-2">
        <Link
          href="/gestoria"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors shadow-lg text-xs sm:text-base"
        >
          Ver todos los servicios
          <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
