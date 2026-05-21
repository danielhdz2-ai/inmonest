'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Servicio {
  nombre: string
  precio: number
  categoria: string
  slug: string
  emoji: string
  tiempo: string
  descripcion: string
}

const SERVICIOS: Servicio[] = [
  { nombre: 'Arras Penitenciales', precio: 145, categoria: 'Compraventa', slug: 'arras-penitenciales', emoji: '📝', tiempo: '48h', descripcion: 'El estándar de oro en compraventa. Permite al comprador desistir perdiendo la señal, o al vendedor devolviendo el doble.' },
  { nombre: 'Arras Confirmatorias', precio: 145, categoria: 'Compraventa', slug: 'arras-confirmatorias', emoji: '✍️', tiempo: '48h', descripcion: 'El contrato más vinculante. Obliga a ambas partes al cumplimiento. Ideal para operaciones con total certeza.' },
  { nombre: 'Contrato de Reserva de Compra', precio: 61, categoria: 'Compraventa', slug: 'reserva-compra', emoji: '🔒', tiempo: '24h', descripcion: 'Documento rápido y efectivo para retirar el piso del mercado durante 48-72h mientras se revisa la nota simple.' },
  { nombre: 'Contrato de Alquiler LAU', precio: 120, categoria: 'Alquiler', slug: 'contrato-alquiler', emoji: '🏠', tiempo: '48h', descripcion: 'Adaptado a Ley de Vivienda 2026. Para propietarios e inquilinos. Cláusulas personalizadas y protección legal.' },
  { nombre: 'Alquiler con Opción a Compra', precio: 182, categoria: 'Compraventa', slug: 'alquiler-opcion-compra', emoji: '🏡', tiempo: '48h', descripcion: 'Vive en el piso mientras ahorras para comprarlo. Descuento de rentas pagadas en precio final. Precio fijado.' },
  { nombre: 'Revisión de Arras', precio: 60, categoria: 'Revisión Legal', slug: 'revision-arras', emoji: '🔍', tiempo: '24h', descripcion: 'Te han dado un contrato de arras? Lo revisamos en 24h. Detectamos cláusulas abusivas y errores registrales.' },
  { nombre: 'Revisión de Alquiler', precio: 60, categoria: 'Revisión Legal', slug: 'revision-alquiler', emoji: '🔎', tiempo: '24h', descripcion: 'Verificamos cumplimiento Ley Vivienda 2026. Detectamos cláusulas ilegales y fianzas abusivas.' },
  { nombre: 'Alquiler de Habitación', precio: 121, categoria: 'Alquiler', slug: 'alquiler-habitaciones', emoji: '🚪', tiempo: '48h', descripcion: 'Regulación de zonas comunes. Normas de convivencia pactadas. Ideal para pisos compartidos o coliving.' },
  { nombre: 'Rescisión de Alquiler', precio: 73, categoria: 'Rescisión', slug: 'rescision-alquiler', emoji: '📋', tiempo: '48h', descripcion: 'Acta de estado del inmueble. Liquidación y devolución de fianza. Evita conflictos al terminar el contrato.' },
  { nombre: 'Análisis de Fraude', precio: 29, categoria: 'Revisión Legal', slug: 'contrato-ilegal', emoji: '⚠️', tiempo: '12h', descripcion: 'Verificación documentación. Detección de señales de fraude. Informe urgente de riesgos críticos en 12h.' },
  { nombre: 'Servicio Completo Compra', precio: 666, categoria: 'Premium', slug: 'compra-completa-reserva-escritura', emoji: '👑', tiempo: '30d', descripcion: 'Gestión completa de reserva a escritura. Coordinación notaría. Análisis registral y urbanístico. Atención prioritaria.' },
  { nombre: 'Asesoría Completa Compra', precio: 95, categoria: 'Premium', slug: 'asesoria-compra', emoji: '💼', tiempo: '48h', descripcion: 'Análisis nota simple + arras. Asesoramiento hipoteca. Acompañamiento hasta escritura por abogados.' },
  { nombre: 'Préstamo entre Particulares', precio: 109, categoria: 'Financiación', slug: 'prestamo-particulares', emoji: '💰', tiempo: '48h', descripcion: 'Importe, plazos y cuotas detalladas. Nota fiscal ante AEAT. Protección legal para ambas partes.' },
  { nombre: 'Alquiler Local Comercial', precio: 121, categoria: 'Alquiler', slug: 'alquiler-local-comercial', emoji: '🏪', tiempo: '48h', descripcion: 'Régimen LAU uso distinto vivienda. Actualización renta libre o IPC. Derecho de tanteo ante venta.' },
  { nombre: 'Pack Revisión + Alquiler', precio: 169, categoria: 'Alquiler', slug: 'pack-revision-reserva-alquiler', emoji: '📦', tiempo: '48h', descripcion: 'Revisión completa de reserva + Redacción contrato alquiler LAU. Todo en uno con ahorro.' },
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#c9962a]/15 text-[#a87a20] border border-[#c9962a]/25 mb-4">
          ⚖️ Gestoría Inmobiliaria Digital
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Contratos redactados por expertos en 48h
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          Redacción, revisión y asesoría legal inmobiliaria. Desde 29€. Pago seguro con Stripe.
        </p>
      </div>

      {/* Carrusel */}
      <div 
        className="relative overflow-hidden mb-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradientes laterales */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Contenedor scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-2"
          style={{ scrollBehavior: 'auto' }}
        >
          {serviciosDuplicados.map((servicio, index) => (
            <Link
              key={`${servicio.slug}-${index}`}
              href={`/gestoria/solicitar/${servicio.slug}`}
              className="group flex-shrink-0 w-[340px] bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#c9962a] hover:shadow-2xl transition-all duration-300"
            >
              {/* Badge categoría */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-2 py-1 rounded-md text-xs font-semibold bg-[#c9962a]/10 text-[#a87a20]">
                  {servicio.categoria}
                </span>
                {servicio.categoria === 'Premium' && (
                  <span className="text-xs font-bold text-yellow-600">★ MÁS SOLICITADO</span>
                )}
              </div>

              {/* Emoji y título */}
              <div className="text-5xl mb-4">{servicio.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#c9962a] transition min-h-[56px]">
                {servicio.nombre}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed min-h-[80px]">
                {servicio.descripcion}
              </p>

              {/* Precio y tiempo */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-[#c9962a]">{servicio.precio}€</div>
                  <div className="text-xs text-gray-500">IVA incluido</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">Entrega en</div>
                  <div className="text-sm text-[#c9962a] font-bold">{servicio.tiempo}</div>
                </div>
              </div>

              {/* Indicador hover */}
              <div className="mt-4 flex items-center justify-center text-sm font-semibold text-[#c9962a] opacity-0 group-hover:opacity-100 transition-opacity">
                Solicitar ahora
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Indicador de pausa */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">
          {isPaused ? '⏸️ Carrusel pausado - Mueve el cursor fuera para continuar' : '▶️ Pasa el ratón sobre una tarjeta para pausar'}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/gestoria"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors shadow-lg text-base"
        >
          Ver todos los servicios de gestoría
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
