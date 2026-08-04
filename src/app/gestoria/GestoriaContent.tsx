'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EnlacesInternosSeo from '@/components/EnlacesInternosSeo'
import SolicitarModal from './SolicitarModal'
import { gtmPush } from '@/components/GTMProvider'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import { BRAND_IMAGES } from '@/lib/brand-images'
import { Scale, Zap, Shield, FileText, Building2, BadgeCheck, Star, Users, Phone, CheckCircle } from '@/components/ui/Icons'
import { MobileGestoriaContactRow } from '@/components/ui/MobileGestoriaContactRow'

interface Service {
  key: string
  name: string
  shortName: string
  category: 'compraventa' | 'alquiler' | 'rescision' | 'financiacion'
  description: string
  includes: string[]
  price: number
  image: string
  badge?: string
}

const SERVICES: Service[] = [
  // --- COMPRAVENTA ---
  {
    key: 'arras-penitenciales',
    name: 'Contrato de Arras Penitenciales',
    shortName: 'Arras Penitenciales',
    category: 'compraventa',
    description: 'El estándar de oro en compraventa. Permite al comprador desistir perdiendo la señal, o al vendedor devolviéndola doblada. Máxima seguridad jurídica para ambas partes.',
    includes: [
      'Redacción personalizada según partes',
      'Cláusulas de desistimiento y penalización',
      'Revisión datos registrales y nota simple',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria1.jpg',
    badge: 'Más solicitado',
  },
  {
    key: 'arras-confirmatorias',
    name: 'Contrato de Arras Confirmatorias',
    shortName: 'Arras Confirmatorias',
    category: 'compraventa',
    description: 'El contrato más vinculante. Obliga a ambas partes al cumplimiento de la compraventa. Ideal cuando comprador y vendedor tienen total certeza de la operación.',
    includes: [
      'Redacción personalizada según partes',
      'Obligación de cumplimiento para ambas partes',
      'Cláusulas de incumplimiento y resolución',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria3.jpg',
  },
  {
    key: 'pack-due-diligence-precompra',
    name: 'Pack Due Diligence Pre-Compra',
    shortName: 'Due Diligence Inmobiliaria',
    category: 'compraventa',
    description: 'Servicio integral de verificación documental tras firmar arras y antes de escriturar. Revisamos actas de comunidad, derramas, ITE, nota registral e información urbanística. Ideal para compradores que quieren certeza total antes de la compra definitiva.',
    includes: [
      'Revisión completa de actas de comunidad (2 años)',
      'Verificación de derramas pendientes y extraordinarias',
      'Análisis del ITE (Inspección Técnica de Edificios)',
      'Obtención y revisión de nota registral actualizada',
      'Consulta de información urbanística y licencias',
      'Informe ejecutivo con hallazgos y recomendaciones',
      'Entrega en 3-5 días · Análisis en 48h · Formato PDF',
    ],
    price: 350,
    image: '/gestoria9.jpg',
    badge: 'Pre-compra',
  },
  {
    key: 'asesoramiento-arras-venta',
    name: 'Asesoramiento Arras hasta Escritura (Vendedores)',
    shortName: 'Asesoramiento Venta',
    category: 'compraventa',
    description: 'Servicio exclusivo para propietarios vendedores que ya firmaron contrato de arras. Un asesor experto de Inmonest te acompaña recabando documentación, gestionando trámites y coordinando todo hasta el día de escritura ante notario. NO incluye el contrato de arras (se contrata a parte).',
    includes: [
      'Asesor experto de Inmonest asignado',
      'Ayuda para recabar toda la documentación necesaria',
      'Gestión de trámites y gestiones requeridas',
      'Acompañamiento desde arras hasta escritura',
      'Coordinación con notaría y compradores',
      'NO incluye redacción contrato arras (a parte)',
      'Ideal para propietarios vendedores',
    ],
    price: 166,
    image: '/gestoria10.jpg',
    badge: 'Vendedores',
  },
  {
    key: 'reserva-compra',
    name: 'Contrato de Reserva de Compra',
    shortName: 'Reserva de Compra',
    category: 'compraventa',
    description: 'Un documento rápido y efectivo para retirar el piso del mercado durante 48-72h mientras se revisa la nota simple y se prepara el contrato definitivo.',
    includes: [
      'Bloqueo jurídico del inmueble 48-72h',
      'Consignación de señal de reserva',
      'Condiciones resolutorias incluidas',
      'Entrega en 24h · PDF firmable digitalmente',
    ],
    price: 61,
    image: '/gestoria4.jpg',
  },

  // --- ALQUILER ---
  {
    key: 'alquiler-vivienda-lau',
    name: 'Contrato de Alquiler de Vivienda (LAU)',
    shortName: 'Alquiler LAU',
    category: 'alquiler',
    description: 'El contrato de larga estancia actualizado a la Ley de Vivienda 2026. Regula derechos y obligaciones con todas las garantías legales vigentes para propietario e inquilino.',
    includes: [
      'Adaptado a la Ley de Vivienda 2026',
      'Fianza y garantías adicionales incluidas',
      'Cláusulas de actualización de renta (IPC)',
      'Inventario de mobiliario annexo',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria7.jpg',
    badge: 'Ley 2026',
  },
  {
    key: 'alquiler-temporada',
    name: 'Contrato de Alquiler por Temporada',
    shortName: 'Alquiler Temporada',
    category: 'alquiler',
    description: 'Para nómadas digitales, estudiantes o uso distinto al de vivienda habitual. Evita las prórrogas forzosas de la LAU. Muy demandado por propietarios que quieren flexibilidad.',
    includes: [
      'Duración y causa de temporalidad específica',
      'Exento de prórrogas automáticas de la LAU',
      'Compatible con plataformas tipo Airbnb larga estancia',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 165,
    image: '/gestoria2.jpg',
  },
  {
    key: 'alquiler-habitacion',
    name: 'Contrato de Alquiler de Habitación',
    shortName: 'Alquiler Habitación',
    category: 'alquiler',
    description: 'Ideal para coliving o pisos compartidos. Regula el alquiler de una habitación dentro de una vivienda, con acceso a zonas comunes y normas de convivencia.',
    includes: [
      'Regulación de uso de zonas comunes',
      'Normas de convivencia y uso del inmueble',
      'Fianza y condiciones de salida',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria6.jpg',
  },
  {
    key: 'reserva-alquiler',
    name: 'Contrato de Reserva de Alquiler',
    shortName: 'Reserva de Alquiler',
    category: 'alquiler',
    description: 'Asegura al inquilino antes de la firma del contrato definitivo. El propietario retira el anuncio y el inquilino se compromete con una señal previa.',
    includes: [
      'Señal de reserva y condiciones de devolución',
      'Plazo máximo para firma del contrato definitivo',
      'Cláusulas de desistimiento de ambas partes',
      'Entrega en 24h · PDF firmable digitalmente',
    ],
    price: 61,
    image: '/gestoria5.jpg',
  },

  // --- RESCISIÓN Y FIANZAS ---
  {
    key: 'rescision-alquiler',
    name: 'Contrato de Rescisión de Alquiler',
    shortName: 'Rescisión de Alquiler',
    category: 'rescision',
    description: 'Documenta la entrega de llaves y el estado del piso al finalizar el contrato. Imprescindible para que el propietario no tenga problemas posteriores con reclamaciones.',
    includes: [
      'Acta de estado del inmueble en la entrega',
      'Acuerdo de liquidación de fianza',
      'Renuncia mutua a reclamaciones futuras',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 73,
    image: '/gestoria11.jpg',
  },
  {
    key: 'liquidacion-fianza',
    name: 'Documento de Liquidación de Fianza',
    shortName: 'Liquidación de Fianza',
    category: 'rescision',
    description: 'Desglose detallado de qué se devuelve y qué se descuenta de la fianza por limpieza, daños o suministros pendientes. Evita conflictos y protege al propietario.',
    includes: [
      'Desglose de conceptos descontados',
      'Valoración de daños con criterios objetivos',
      'Importes a devolver y plazos',
      'Entrega en 24h · PDF firmable digitalmente',
    ],
    price: 36,
    image: '/gestoria2.jpg',
  },

  // --- ALQUILER ESPECIAL ---
  {
    key: 'alquiler-habitaciones',
    name: 'Contrato de Alquiler de Habitación',
    shortName: 'Alquiler Habitación',
    category: 'alquiler',
    description: 'Para coliving y pisos compartidos. Regula zonas comunes, normas de convivencia, fianza y condiciones de salida con todas las garantías jurídicas. Regido por el Código Civil.',
    includes: [
      'Regulación de zonas comunes y normas de convivencia',
      'Fianza y condiciones de devolución',
      'Duración, prórrogas y salida anticipada',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria6.jpg',
    badge: 'Coliving',
  },
  {
    key: 'pack-revision-reserva-alquiler',
    name: 'Pack Revisión y Redacción: Reserva + Contrato de Alquiler',
    shortName: 'Pack Reserva + Alquiler',
    category: 'alquiler',
    description: 'Servicio completo que incluye la revisión del contrato de reserva y la redacción personalizada del contrato de alquiler LAU. Ideal para propietarios que quieren asegurar ambos pasos del proceso.',
    includes: [
      'Revisión completa del contrato de reserva',
      'Redacción del contrato de alquiler LAU personalizado',
      'Adaptado a la Ley de Vivienda 2026',
      'Cláusulas de actualización de renta y fianza',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 169,
    image: '/gestoria7.jpg',
    badge: 'Pack ahorro',
  },
  {
    key: 'alquiler-local-comercial',
    name: 'Contrato de Alquiler de Local Comercial',
    shortName: 'Alquiler Local',
    category: 'alquiler',
    description: 'Rige por el Título III LAU (uso distinto de vivienda). Protege al empresario y al propietario: derecho de tanteo, obras, renta variable y garantías adicionales incluidas.',
    includes: [
      'Régimen LAU para uso distinto de vivienda',
      'Derecho de tanteo, retracto y traspaso',
      'Régimen de obras y mejoras del local',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 145,
    image: '/gestoria2.jpg',
  },
  {
    key: 'alquiler-garaje-trastero',
    name: 'Contrato de Alquiler de Garaje o Trastero',
    shortName: 'Garaje o Trastero',
    category: 'alquiler',
    description: 'El contrato más económico y ágil. Regula uso del espacio, vehículos permitidos, responsabilidad por daños y devolución de fianza. Entrega en 24h.',
    includes: [
      'Descripción del espacio y vehículos permitidos',
      'Fianza y condiciones de devolución',
      'Responsabilidad por daños y siniestros',
      'Entrega en 24h · PDF firmable digitalmente',
    ],
    price: 130,
    image: '/gestoria5.jpg',
    badge: 'Más económico',
  },

  // --- SERVICIOS PREMIUM DE ACOMPAÑAMIENTO ---
  {
    key: 'acompanamiento-reserva-arras',
    name: 'Acompañamiento Reserva hasta Arras',
    shortName: 'Acompañamiento Reserva-Arras',
    category: 'compraventa',
    description: 'Servicio completo de asesoramiento jurídico desde la reserva hasta el contrato de arras. Incluye revisión de contratos de reserva, nota registral, documentación urbanística y apoyo legal en todo el proceso.',
    includes: [
      'Revisión completa de contrato de reserva',
      'Análisis exhaustivo de nota simple registral',
      'Revisión de documentación urbanística',
      'Redacción de contrato de arras personalizado',
      'Apoyo jurídico durante todo el proceso',
      'Entrega en 48h · Atención personalizada',
    ],
    price: 424,
    image: '/gestoria10.jpg',
    badge: 'Premium',
  },
  {
    key: 'compra-completa-reserva-escritura',
    name: 'Servicio Completo de Compra: Reserva a Escritura',
    shortName: 'Compra Completa',
    category: 'compraventa',
    description: 'El servicio más completo de gestoría inmobiliaria. Te acompañamos desde la reserva hasta la escrituración con revisión total de documentación, contratos con agencias, honorarios y apoyo en cada paso del proceso de compra.',
    includes: [
      'Gestión completa: reserva, arras y escritura',
      'Revisión de contratos con agencias inmobiliarias',
      'Revisión de notas de encargo y honorarios',
      'Análisis documentación registral y urbanística',
      'Apoyo legal en todo el proceso de compra',
      'Coordinación con notaría · Atención prioritaria',
    ],
    price: 687,
    image: '/gestoria4.jpg',
    badge: 'Todo incluido',
  },
  {
    key: 'compra-completa-parking-trastero',
    name: 'Compra Completa Parking o Trastero',
    shortName: 'Compra Parking/Trastero',
    category: 'compraventa',
    description: 'Acompañamiento integral para comprar plaza de parking o trastero entre particulares. Gestor asignado desde la reserva hasta notaría, liquidación del ITP e inscripción registral.',
    includes: [
      'Gestor inmobiliario asignado en todo el proceso',
      'Contrato de reserva y arras adaptados al inmueble',
      'Verificación de nota simple, cargas y servidumbres',
      'Asesoramiento en negociación con el vendedor',
      'Coordinación con notaría para la escritura',
      'Liquidación ITP y gestión de inscripción registral',
    ],
    price: 295,
    image: '/gestoria9.jpg',
    badge: 'Nuevo',
  },
  {
    key: 'venta-completa-reserva-escritura',
    name: 'Servicio Completo de Venta: Reserva a Escritura',
    shortName: 'Venta Completa',
    category: 'compraventa',
    description: 'Acompañamiento completo para propietarios que venden su piso a particulares. Gestor personalizado te ayuda desde la reserva hasta la escritura: contratos, documentación y asesoramiento continuo.',
    includes: [
      'Gestor personalizado asignado a tu venta',
      'Estudio completo de la operación',
      'Redacción de contratos: reserva y arras',
      'Ayuda para recabar toda la documentación',
      'Asesoramiento continuo hasta escritura',
      'Coordinación con notaría · Atención prioritaria',
    ],
    price: 687,
    image: '/gestoria11.jpg',
    badge: 'Todo incluido',
  },

  // --- COMPRAVENTA ESPECIAL ---
  {
    key: 'arras-parking-garage',
    name: 'Contrato de Arras para Compraventa de Parking o Garaje',
    shortName: 'Arras Parking/Garaje',
    category: 'compraventa',
    description: 'Contrato de arras específico para la compraventa de plazas de parking o garajes. Incluye cláusulas adaptadas a este tipo de inmuebles: acceso, uso, cargas y servidumbres.',
    includes: [
      'Redacción personalizada para parking/garaje',
      'Revisión de nota simple registral',
      'Cláusulas de desistimiento adaptadas',
      'Verificación de cargas y servidumbres',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 73,
    image: '/gestoria5.jpg',
  },
  {
    key: 'alquiler-opcion-compra',
    name: 'Contrato de Alquiler con Opción a Compra',
    shortName: 'Opción a Compra',
    category: 'compraventa',
    description: 'Contrato doble: alquila ahora y compra cuando quieras. El precio de compra queda fijado hoy y parte de las rentas se descuenta del precio final. Ideal si aún no tienes hipoteca.',
    includes: [
      'Arrendamiento + derecho de opción en un solo contrato',
      'Precio fijado y descuento de rentas sobre compra final',
      'Prima de opción y penalización por no ejercitar',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 182,
    image: '/gestoria4.jpg',
    badge: 'Nuevo',
  },

  // --- FINANCIACIÓN ---
  {
    key: 'prestamo-particulares',
    name: 'Contrato de Préstamo entre Particulares',
    shortName: 'Préstamo Privado',
    category: 'financiacion',
    description: 'Formaliza el préstamo entre familiares, amigos o socios con plena validez jurídica y fiscal. Evita que Hacienda lo considere donación encubierta. Con o sin intereses.',
    includes: [
      'Importe, plazos y cuotas de devolución',
      'Tipo de interés o préstamo a tipo 0 %',
      'Nota fiscal: tributación correcta ante la AEAT',
      'Entrega en 48h · PDF firmable digitalmente',
    ],
    price: 130,
    image: '/gestoria9.jpg',
    badge: 'Capital privado',
  },
]

const CATEGORIES = [
  { key: 'all', label: 'Todos los servicios' },
  { key: 'compraventa', label: 'Compraventa' },
  { key: 'alquiler', label: 'Alquiler' },
  { key: 'rescision', label: 'Rescisión y fianzas' },
  { key: 'financiacion', label: 'Financiación' },
]

const CATEGORY_COLORS: Record<string, string> = {
  compraventa: 'bg-orange-100 text-orange-700',
  alquiler: 'bg-orange-50 text-orange-600',
  rescision: 'bg-amber-100 text-amber-700',
  financiacion: 'bg-yellow-100 text-yellow-700',
}

const CATEGORY_LABELS: Record<string, string> = {
  compraventa: 'Compraventa',
  alquiler: 'Alquiler',
  rescision: 'Rescisión',
  financiacion: 'Financiación',
}

export default function GestoriaPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filtered = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-6 pb-1">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-gold-500 transition">
            Inicio
          </Link>
          <span className="text-gray-300">→</span>
          <span className="text-gray-900 font-medium truncate">Gestoría</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-0 py-12 sm:min-h-[480px] sm:py-0 sm:h-[520px] lg:h-[560px] overflow-hidden">
        <Image
          src={BRAND_IMAGES.gestoria.src}
          alt={BRAND_IMAGES.gestoria.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-forest-950/95 via-forest-950/80 to-forest-950/50 sm:to-transparent" />
        <div className="relative sm:absolute sm:inset-0 flex flex-col justify-center px-4 sm:px-12 lg:px-20 max-w-4xl mx-auto sm:mx-0 py-2 sm:py-0">
          <span className="inline-block bg-gold-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 sm:mb-4 w-fit">
            Gestoría · Alquiler LAU
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-3 sm:mb-4">
            Contratos inmobiliarios<br />
            <span className="text-gold-300">redactados por expertos</span>
          </h1>
          <p className="text-white/85 text-sm sm:text-lg max-w-xl leading-relaxed line-clamp-4 sm:line-clamp-none">
            Arras, alquiler LAU y compraventa a medida. Sin plantillas genéricas — entrega en 48 h desde 61 €.
          </p>
          <MobileGestoriaContactRow
            whatsappMessage="Hola, necesito información sobre gestoría inmobiliaria en Inmonest"
            className="mt-4 sm:mt-5"
          />
          <div className="hidden sm:flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              <Scale className="w-4 h-4 text-gold-300 shrink-0" />
              Gestoría inmobiliaria experta
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              <Zap className="w-4 h-4 text-gold-300 shrink-0" />
              Respuesta en 24 h
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              <FileText className="w-4 h-4 text-gold-300 shrink-0" />
              +500 contratos redactados
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES UNA GESTORÍA INMOBILIARIA */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Qué es una gestoría inmobiliaria?
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Una <strong>gestoría inmobiliaria</strong> es un servicio profesional que se encarga de todos los <strong>trámites legales, administrativos y documentales</strong> relacionados con operaciones inmobiliarias de particulares: <strong>compraventa de viviendas, contratos de alquiler, contratos de arras y escrituras</strong>.
            </p>
            <p>
              En <strong>Inmonest</strong> somos una <strong>gestoría inmobiliaria digital especializada en Barcelona, Madrid y Valencia</strong>, con abogados expertos que redactan contratos personalizados para particulares vendedores y compradores. A diferencia de las agencias inmobiliarias tradicionales, <strong className="text-gold-500">no cobramos comisiones del 3-5%</strong>, sino honorarios fijos transparentes desde 61€.
            </p>
            <div className="bg-cream-100 border-l-4 border-gold-500 p-6 rounded-r-lg mt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">¿Cuándo contratar una gestoría inmobiliaria?</h3>
              <ul className="space-y-2 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold mt-0.5">✓</span>
                  <span><strong>Compras o vendes piso entre particulares</strong> y necesitas contratos de arras, reserva o asesoramiento legal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold mt-0.5">✓</span>
                  <span><strong>Alquilas tu vivienda</strong> y quieres un contrato LAU adaptado a la Ley de Vivienda 2026 con todas las garantías</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold mt-0.5">✓</span>
                  <span><strong>Necesitas verificar documentación</strong> antes de escriturar (nota registral, actas comunidad, ITE)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold mt-0.5">✓</span>
                  <span><strong>Quieres acompañamiento completo</strong> desde la reserva hasta la firma ante notario</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-gold-700 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
          {[
            { Icon: Scale, text: 'Gestoría especializada en contratos de alquiler' },
            { Icon: FileText, text: 'Contratos personalizados, no plantillas' },
            { Icon: Shield, text: 'Sin pago por adelantado' },
            { Icon: BadgeCheck, text: 'Entrega por email en PDF firmable' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <Icon className="w-4 h-4 text-gold-200 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-cream-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-12">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Solicitas el servicio',
                desc: 'Rellenas el formulario con tus datos y el contrato que necesitas. Sin necesidad de cuenta ni pago previo.',
                Icon: FileText,
              },
              {
                step: '02',
                title: 'Te contactamos en 24h',
                desc: 'Un gestor del equipo se pone en contacto contigo por email o teléfono para entender tu situación y confirmar los detalles.',
                Icon: Phone,
              },
              {
                step: '03',
                title: 'Recibes tu contrato',
                desc: 'En 48h recibes el contrato en PDF, personalizado con los datos reales de las partes y listo para firmar.',
                Icon: CheckCircle,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2">Paso {item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8 sm:mb-10 px-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Nuestros servicios</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Desde 29 € hasta 687 €. Cada contrato redactado a mano por nuestros gestores, adaptado a tu situación concreta.
          </p>
        </div>

        {/* Filtros — scroll horizontal en móvil */}
        <div className="-mx-4 sm:mx-0 mb-8 sm:mb-10">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 snap-start px-4 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] touch-manipulation whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-gold-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <article
              key={service.key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Imagen */}
              <div 
                className="relative h-48 overflow-hidden bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Badge categoría */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[service.category]}`}>
                  {CATEGORY_LABELS[service.category]}
                </span>
                {/* Badge especial */}
                {service.badge && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-gold-500 text-white">
                    {service.badge}
                  </span>
                )}
                {/* Precio en imagen */}
                <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-gold-500">{service.price} €</div>
                    <div className="text-[10px] text-gray-500 font-medium -mt-0.5">IVA incluido</div>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                  {service.description}
                </p>

                {/* Lo que incluye */}
                <ul className="space-y-1.5 mb-5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => {
                    // Google Ads conversion tracking: view_item
                    gtmPush({
                      event: 'view_item',
                      ecommerce: {
                        items: [{
                          item_id: service.key,
                          item_name: service.name,
                          item_category: service.category,
                          price: service.price,
                          quantity: 1
                        }]
                      }
                    })
                    setSelectedService(service)
                  }}
                  className="w-full py-2.5 bg-gold-500 text-white rounded-xl font-bold text-sm hover:bg-gold-600 transition-colors"
                >
                  Solicitar por {service.price} € <span className="font-normal text-xs opacity-90">(IVA incl.)</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EQUIPO / GARANTÍAS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Nuestro equipo</span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-2 mb-4">
                Gestoría inmobiliaria experta en<br />contratos inmobiliarios españoles
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                No generamos documentos automáticos. Cada contrato lo revisa nuestro equipo de gestoría con experiencia en operaciones inmobiliarias, adaptándolo a la normativa autonómica específica de cada comunidad.
              </p>
              <ul className="space-y-3">
                {[
                  'Experiencia en LAU, LGCU y Ley de Vivienda 2026',
                  'Conocimiento de normativa autonómica (Catalunya, Madrid, Valencia...)',
                  'Revisión jurídica de cada contrato antes de entrega',
                  'Disponibles para consultas post-entrega incluidas',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-[#fef0c0] rounded-full flex items-center justify-center shrink-0 mt-0.5 text-gold-500 font-bold text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '+500', label: 'Contratos redactados', Icon: FileText },
                { num: '48h', label: 'Tiempo medio de entrega', Icon: Zap },
                { num: '98%', label: 'Clientes satisfechos', Icon: Star },
                { num: '17', label: 'CCAA cubiertas', Icon: Building2 },
              ].map(({ num, label, Icon }) => (
                <div key={label} className="bg-cream-100 rounded-2xl p-5 text-center border border-gold-300/30">
                  <Icon className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-extrabold text-gold-600">{num}</div>
                  <div className="text-xs text-gray-600 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeTestimonials />

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Necesito tener cuenta en Inmonest para contratar?',
                a: 'No. Puedes solicitar cualquier servicio sin tener cuenta. Solo necesitas un email de contacto donde te enviaremos el contrato.',
              },
              {
                q: '¿Cuándo pago?',
                a: 'No hay pago por adelantado. Nuestro gestor te contacta en 24h, te confirma los detalles y te indica cómo proceder al pago antes de la entrega del documento.',
              },
              {
                q: '¿Los contratos tienen validez legal en toda España?',
                a: 'Sí. Nuestros contratos siguen la legislación estatal vigente (LAU, Código Civil, Ley de Vivienda 2026) y se adaptan a las particularidades de cada comunidad autónoma cuando es necesario.',
              },
              {
                q: '¿Qué pasa si necesito modificaciones después de recibirlo?',
                a: 'Incluimos una ronda de revisiones gratuita. Si una vez revisado el contrato necesitas algún ajuste, tu gestor lo realiza sin coste adicional dentro de los 7 días posteriores a la entrega.',
              },
              {
                q: '¿Puedo solicitar un contrato que no aparece en la lista?',
                a: 'Sí. Contáctanos directamente desde el formulario de cualquier servicio, explícanos qué necesitas en el campo de notas y te daremos presupuesto personalizado.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-gray-100 group">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                  {q}
                  <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BASES LEGALES */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Marco jurídico</span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">Bases legales que respaldamos</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              Cada contrato que redactamos se sustenta en la legislación vigente. Conocer el marco legal es el primer paso para proteger tu operación.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Building2, titulo: 'Ley de Arrendamientos Urbanos (LAU)', ley: 'Ley 29/1994 · Actualiz. 2023-2026', desc: 'Regula el arrendamiento de vivienda habitual (Título II) y de uso distinto de vivienda como locales comerciales (Título III). Define duración mínima, prórrogas, actualización de renta y derechos del inquilino.' },
              { Icon: Building2, titulo: 'Ley de Vivienda 2023', ley: 'Ley 12/2023 · Vigente en 2026', desc: 'Introduce límites a la actualización de renta en zonas tensionadas, define "gran tenedor" y establece nuevos derechos del inquilino en todo el territorio nacional. Todos nuestros contratos de alquiler incorporan sus disposiciones.' },
              { Icon: Scale, titulo: 'Código Civil', ley: 'Arts. 1254–1314 y 1542 ss.', desc: 'Rige los contratos entre particulares no cubiertos por la LAU: alquiler de habitaciones, préstamos privados y contratos atípicos. Establece los principios de autonomía de la voluntad, obligaciones y consecuencias del incumplimiento.' },
              { Icon: Users, titulo: 'Ley de Transmisiones Patrimoniales', ley: 'Real Decreto Leg. 1/1993', desc: 'Regula la tributación de los contratos de arras, arrendamientos y préstamos entre particulares. Los préstamos privados sin interés tributan por ITP a cuota cero pero deben declararse. Incluimos la nota fiscal en nuestros contratos de préstamo.' },
              { Icon: Shield, titulo: 'Reglamento Europeo de Firma Electrónica (eIDAS)', ley: 'Reglamento UE 910/2014', desc: 'Todos nuestros contratos se entregan en formato PDF firmable con firma electrónica simple o avanzada, con plena validez legal en toda la Unión Europea y ante los tribunales españoles.' },
              { Icon: FileText, titulo: 'Ley de Propiedad Horizontal', ley: 'Ley 49/1960 · Mod. 2022', desc: 'Aplica en contratos que afectan a elementos comunes de comunidades de propietarios: garajes, trasteros, zonas comunes. Nuestros contratos respetan los estatutos de comunidad y la normativa interna aplicable.' },
            ].map(({ Icon, titulo, ley, desc }) => (
              <div key={titulo} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-gold-300/40 transition-colors">
                <Icon className="w-6 h-6 text-gold-600 mb-3" />
                <p className="text-[10px] font-bold text-gold-600 uppercase tracking-wider mb-1">{ley}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{titulo}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS — detallado */}
      <section className="bg-cream-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Quiénes somos</span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-2 mb-4">
                El servicio de gestoría<br />de Inmonest
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Inmonest nació como portal inmobiliario para particulares, y desde el primer día detectamos el mismo problema: propietarios e inquilinos firmando contratos descargados de internet sin ninguna supervisión jurídica. Contratos que luego generaban conflictos, pérdidas económicas y procesos judiciales evitables.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Por eso creamos la Gestoría Inmonest: un servicio de redacción de contratos inmobiliarios personalizados, revisados por nuestro equipo de gestoría experto en contratos inmobiliarios españoles. No somos una plataforma de plantillas automáticas. Cada contrato lo redacta un profesional que conoce tu situación concreta.
              </p>
              <div className="space-y-3">
                {[
                  { Icon: Scale, text: 'Equipo de gestoría con especialización en contratos inmobiliarios' },
                  { Icon: Building2, text: 'Conocimiento de normativa autonómica: Cataluña, Madrid, Valencia, Andalucía...' },
                  { Icon: BadgeCheck, text: 'Revisiones gratuitas dentro de los 7 días tras la entrega' },
                  { Icon: Users, text: 'Consultas post-entrega incluidas sin coste adicional' },
                  { Icon: Shield, text: 'Confidencialidad total: tus datos nunca se comparten con terceros' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-gray-700">
                    <Icon className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-gold-300/30 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 text-base">¿Por qué no usar una plantilla gratuita?</h3>
                <div className="space-y-2">
                  {[
                    { ok: false, titulo: 'Plantilla genérica', desc: 'Sin adaptar a tu CCAA, situación ni partes concretas' },
                    { ok: false, titulo: 'Cláusulas nulas', desc: 'Muchas plantillas incluyen cláusulas prohibidas por la LAU 2026' },
                    { ok: false, titulo: 'Sin actualización', desc: 'La Ley de Vivienda cambia y las plantillas no se actualizan' },
                    { ok: true, titulo: 'Contrato Inmonest', desc: 'Personalizado, actualizado y revisado por nuestra gestoría experta' },
                  ].map(({ ok, titulo, desc }) => (
                    <div key={titulo} className="flex items-start gap-2 text-sm">
                      <span className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${ok ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {ok ? '✓' : '×'}
                      </span>
                      <div>
                        <span className="font-semibold text-gray-800">{titulo}: </span>
                        <span className="text-gray-600">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gold-300/30 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 text-base">Proceso garantizado</h3>
                <ol className="space-y-2">
                  {[
                    'Solicitas y facilitas los datos por email o formulario',
                    'Asignamos tu contrato a nuestro equipo de gestoría especializado',
                    'Revisión de nota simple registral si aplica',
                    'Entrega del PDF personalizado en 24-48h',
                    'Una ronda de revisiones gratuita si necesitas ajustes',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-gold-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGÍSTRATE — CTA */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-forest-950 to-gold-700 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <span className="inline-block bg-gold-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Clientes Inmonest
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 max-w-lg">
                Regístrate y gestiona todos<br />tus contratos desde un solo lugar
              </h2>
              <p className="text-white/80 mb-8 max-w-xl text-sm leading-relaxed">
                Con una cuenta Inmonest puedes publicar tus anuncios, solicitar contratos con tus datos prefilled, hacer seguimiento del estado de cada servicio y acceder a tu historial de documentos en cualquier momento.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-gold-500 text-white rounded-xl font-bold text-sm hover:bg-gold-600 transition-colors shadow-md"
                >
                  Crear cuenta gratis →
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
                >
                  Ya tengo cuenta
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 text-xs text-white/60">
                <span>✓ 2 anuncios gratis incluidos</span>
                <span>✓ Historial de contratos</span>
                <span>✓ Datos prefilled en formularios</span>
                <span>✓ Sin permanencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnlacesInternosSeo variant="gestoria" />

      {/* CTA FINAL */}
      <section className="bg-gradient-to-r from-gold-700 to-gold-500 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">¿Listo para proteger tu operación?</h2>
          <p className="text-white/80 mb-6 text-base">
            Desde 29 €. Sin letra pequeña. Sin plantillas genéricas. Con la firma de un profesional.
          </p>
          <button
            onClick={() => setSelectedService(SERVICES[0])}
            className="inline-block px-8 py-3.5 bg-white text-gold-500 rounded-full font-bold text-sm hover:bg-cream-100 transition-colors shadow-lg"
          >
            Ver todos los contratos
          </button>
        </div>
      </section>

      {/* Modal solicitud */}
      {selectedService && (
        <SolicitarModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}
