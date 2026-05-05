import { notFound } from 'next/navigation'
import Navbar from '@/components/NavbarServer'
import SolicitarFormClient from './SolicitarFormClient'

const SERVICIOS: Record<string, { nombre: string; precio: number; categoria: string; incluye: string[] }> = {
  'arras-penitenciales':    { nombre: 'Contrato de Arras Penitenciales',          precio: 120, categoria: 'Compraventa',           incluye: ['Redacción personalizada con datos reales', 'Revisión de nota simple registral', 'Cláusulas de desistimiento y penalización', 'PDF firmable en 48h'] },
  'arras-confirmatorias':   { nombre: 'Contrato de Arras Confirmatorias',          precio: 120, categoria: 'Compraventa',           incluye: ['Redacción personalizada con datos reales', 'Cláusulas de obligación de cumplimiento', 'Revisión de nota simple registral', 'PDF firmable en 48h'] },
  'contrato-alquiler':      { nombre: 'Contrato de Alquiler de Vivienda (LAU)',    precio: 90,  categoria: 'Alquiler',              incluye: ['Adaptado a la Ley de Vivienda 2026', 'Cláusulas de actualización de renta', 'Fianza y garantías adicionales', 'PDF firmable en 48h'] },
  'rescision-alquiler':     { nombre: 'Contrato de Rescisión de Alquiler',         precio: 60,  categoria: 'Rescisión y fianzas',   incluye: ['Acta de estado del inmueble', 'Liquidación y devolución de fianza', 'Cláusula de renuncia mutua', 'PDF firmable en 48h'] },
  'alquiler-habitaciones':  { nombre: 'Contrato de Alquiler de Habitación',        precio: 100, categoria: 'Alquiler',              incluye: ['Regulación de zonas comunes', 'Normas de convivencia pactadas', 'Fianza y condiciones de devolución', 'PDF firmable en 48h'] },
  'alquiler-local-comercial':{ nombre: 'Contrato de Alquiler de Local Comercial', precio: 100, categoria: 'Alquiler',              incluye: ['Régimen LAU uso distinto de vivienda', 'Actualización de renta libre o IPC', 'Derecho de tanteo ante venta', 'PDF firmable en 48h'] },
  'alquiler-opcion-compra': { nombre: 'Contrato de Alquiler con Opción a Compra', precio: 150, categoria: 'Compraventa',           incluye: ['Arrendamiento + opción de compra integrados', 'Precio de compra fijado e inalterable', 'Descuento de rentas en precio final', 'PDF firmable en 48h'] },
  'prestamo-particulares':  { nombre: 'Contrato de Préstamo entre Particulares',  precio: 90,  categoria: 'Financiación',          incluye: ['Importe, plazos y cuotas detalladas', 'Vencimiento anticipado por impago', 'Nota fiscal: tributación ante AEAT', 'PDF firmable en 48h'] },
  'alquiler-garaje-trastero':{ nombre: 'Contrato de Alquiler de Garaje o Trastero', precio: 40, categoria: 'Alquiler',            incluye: ['Descripción del espacio y vehículos', 'Fianza y devolución detallada', 'Responsabilidad por daños y robos', 'PDF firmable en 24h'] },
  'acompanamiento-reserva-arras':       { nombre: 'Acompañamiento Reserva hasta Arras',              precio: 350, categoria: 'Servicios Premium',     incluye: ['Revisión contrato de reserva', 'Análisis nota registral completo', 'Revisión documentación urbanística', 'Redacción contrato de arras', 'Apoyo jurídico durante todo el proceso'] },
  'compra-completa-reserva-escritura':  { nombre: 'Servicio Completo de Compra: Reserva a Escritura', precio: 550, categoria: 'Servicios Premium',     incluye: ['Gestión completa del proceso de compra', 'Revisión contratos con agencias', 'Revisión honorarios y notas de encargo', 'Análisis documentación registral y urbanística', 'Coordinación con notaría', 'Atención prioritaria'] },
}

export function generateStaticParams() {
  return Object.keys(SERVICIOS).map((servicio) => ({ servicio }))
}

export default async function SolicitarServicioPage({
  params,
}: {
  params: Promise<{ servicio: string }>
}) {
  const { servicio } = await params
  const data = SERVICIOS[servicio]
  if (!data) notFound()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
            <a href="/" className="hover:text-gray-600">Inicio</a>
            <span>/</span>
            <a href="/gestoria" className="hover:text-gray-600">Gestoría</a>
            <span>/</span>
            <a href={`/gestoria/${servicio}`} className="hover:text-gray-600">{data.nombre}</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Solicitar</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* ── Panel izquierdo: resumen del servicio ── */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] rounded-2xl p-7 text-white sticky top-24">
                <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {data.categoria}
                </span>
                <h1 className="text-xl font-bold text-white mb-2 leading-snug">{data.nombre}</h1>
                <p className="text-4xl font-extrabold text-[#c9a84c] mb-1">{data.precio} €</p>
                <p className="text-white/50 text-xs mb-6">Pago único · Sin suscripción</p>

                <div className="space-y-3 mb-6">
                  {data.incluye.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#c9a84c] mt-0.5 text-sm flex-shrink-0">✓</span>
                      <span className="text-white/80 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">⚖️</span>
                    <span className="text-xs text-white/70">Redactado por abogados especializados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">🔒</span>
                    <span className="text-xs text-white/70">Pago 100% seguro con Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">⚡</span>
                    <span className="text-xs text-white/70">Entrega en 48h tras el pago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel derecho: formulario ── */}
            <div className="lg:col-span-3">
              <SolicitarFormClient
                servicioSlug={servicio}
                servicioNombre={data.nombre}
                servicioPrecio={data.precio}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
