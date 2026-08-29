import { GESTORIA_SERVICIOS, getPrecioServicio } from '@/lib/gestoria-catalogo'
import { AGENCIA_GESTORIA_PACKS, AGENCIA_SLA_LABEL } from '@/lib/agencias-gestoria-packs'

export type ServicioCategoria = 'compraventa' | 'alquiler' | 'revision' | 'packs' | 'agencias' | 'otros'

export type ServicioLandingCard = {
  slug: string
  nombre: string
  shortName: string
  descripcion: string
  categoria: ServicioCategoria
  precio: number
  image: string
  /** URL de la página del servicio en el catálogo */
  landingHref: string
  badge?: string
  incluye?: string[]
}

/** Menú Servicios del navbar: solo landings genéricas /gestoria/{slug} */
export const GESTORIA_NAV_SERVICIOS: Array<{ label: string; href: string }> = [
  { label: 'Arras penitenciales', href: '/gestoria/arras-penitenciales' },
  { label: 'Contrato de alquiler LAU', href: '/gestoria/contrato-alquiler' },
  { label: 'Alquiler habitación', href: '/gestoria/alquiler-habitaciones' },
  { label: 'Préstamo particulares', href: '/gestoria/prestamo-particulares' },
  { label: 'Compra completa', href: '/gestoria/compra-completa-reserva-escritura' },
  { label: 'Venta completa', href: '/gestoria/venta-completa-reserva-escritura' },
  { label: 'Due diligence', href: '/gestoria/pack-due-diligence-precompra' },
  { label: 'Revisión arras', href: '/gestoria/revision-correccion-arras' },
  { label: 'Revisión alquiler', href: '/gestoria/revision-alquiler' },
  { label: 'Packs para agencias', href: '/agencias/gestoria' },
]

/**
 * Catálogo público en /servicios (solo servicios con página propia).
 */
export const SERVICIOS_LANDING_CARDS: ServicioLandingCard[] = [
  // Compraventa
  {
    slug: 'arras-penitenciales',
    nombre: 'Contrato de Arras Penitenciales',
    shortName: 'Arras penitenciales',
    descripcion: 'Señal con derecho a desistir. Máxima seguridad para comprador y vendedor.',
    categoria: 'compraventa',
    precio: getPrecioServicio('arras-penitenciales') ?? 145,
    image: '/contrato1.jpg',
    landingHref: '/gestoria/arras-penitenciales',
    badge: 'Más solicitado',
  },
  {
    slug: 'arras-confirmatorias',
    nombre: 'Contrato de Arras Confirmatorias',
    shortName: 'Arras confirmatorias',
    descripcion: 'Obliga al cumplimiento de la compraventa. Ideal cuando ambas partes tienen certeza.',
    categoria: 'compraventa',
    precio: getPrecioServicio('arras-confirmatorias') ?? 145,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/arras-confirmatorias',
  },
  {
    slug: 'reserva-compra',
    nombre: 'Contrato de Reserva de Compra',
    shortName: 'Reserva de compra',
    descripcion: 'Bloquea el inmueble 48–72h mientras se preparan las arras definitivas.',
    categoria: 'compraventa',
    precio: getPrecioServicio('reserva-compra') ?? 120,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/reserva-compra',
  },
  {
    slug: 'contrato-compraventa',
    nombre: 'Contrato de Compraventa de Vivienda',
    shortName: 'Compraventa',
    descripcion: 'Documento privado de compraventa personalizado, listo para firma.',
    categoria: 'compraventa',
    precio: getPrecioServicio('contrato-compraventa') ?? 145,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/contrato-compraventa',
  },
  {
    slug: 'arras-parking-garage',
    nombre: 'Arras Parking o Garaje',
    shortName: 'Arras parking',
    descripcion: 'Arras específicas para compraventa de plaza de garaje o trastero.',
    categoria: 'compraventa',
    precio: getPrecioServicio('arras-parking-garage') ?? 145,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/arras-parking-garage',
  },

  // Alquiler
  {
    slug: 'contrato-alquiler',
    nombre: 'Contrato de Alquiler de Vivienda (LAU)',
    shortName: 'Alquiler LAU',
    descripcion: 'Contrato de vivienda habitual adaptado a la Ley de Vivienda 2026. Entrega en 48h.',
    categoria: 'alquiler',
    precio: getPrecioServicio('contrato-alquiler') ?? 145,
    image: '/contrato6.jpg',
    landingHref: '/gestoria/contrato-alquiler',
    badge: 'Core',
  },
  {
    slug: 'alquiler-habitaciones',
    nombre: 'Contrato de Alquiler de Habitación',
    shortName: 'Alquiler habitación',
    descripcion: 'Habitación en piso compartido: normas de convivencia y Código Civil.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-habitaciones') ?? 145,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/alquiler-habitaciones',
  },
  {
    slug: 'alquiler-local-comercial',
    nombre: 'Contrato de Alquiler de Local Comercial',
    shortName: 'Local comercial',
    descripcion: 'Arrendamiento de local o negocio con cláusulas mercantiles adecuadas.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-local-comercial') ?? 145,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/alquiler-local-comercial',
  },
  {
    slug: 'alquiler-opcion-compra',
    nombre: 'Alquiler con Opción a Compra',
    shortName: 'Opción a compra',
    descripcion: 'Combina arrendamiento y derecho de compra futura en un solo contrato.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-opcion-compra') ?? 182,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/alquiler-opcion-compra',
  },
  {
    slug: 'alquiler-garaje-trastero',
    nombre: 'Alquiler de Garaje o Trastero',
    shortName: 'Garaje / trastero',
    descripcion: 'Contrato específico para plaza de garaje o trastero.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-garaje-trastero') ?? 130,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/alquiler-garaje-trastero',
  },
  {
    slug: 'rescision-alquiler',
    nombre: 'Rescisión de Contrato de Alquiler',
    shortName: 'Rescisión alquiler',
    descripcion: 'Finaliza el arrendamiento con acta y liquidación ordenada.',
    categoria: 'alquiler',
    precio: getPrecioServicio('rescision-alquiler') ?? 120,
    image: '/contrato6.jpg',
    landingHref: '/gestoria/rescision-alquiler',
  },
  {
    slug: 'reserva-alquiler',
    nombre: 'Contrato de Reserva de Alquiler',
    shortName: 'Reserva alquiler',
    descripcion: 'Señal y plazo para firmar el contrato LAU definitivo sin perder el piso.',
    categoria: 'alquiler',
    precio: getPrecioServicio('reserva-alquiler') ?? 61,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/reserva-alquiler',
  },
  {
    slug: 'alquiler-temporada',
    nombre: 'Contrato de Alquiler por Temporada',
    shortName: 'Alquiler temporada',
    descripcion: 'Estancias temporales con causa justificada, fuera del régimen LAU habitual.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-temporada') ?? 165,
    image: '/contrato6.jpg',
    landingHref: '/gestoria/alquiler-temporada',
  },
  {
    slug: 'liquidacion-fianza',
    nombre: 'Liquidación de Fianza',
    shortName: 'Liquidación fianza',
    descripcion: 'Desglose claro de la devolución de fianza entre propietario e inquilino.',
    categoria: 'alquiler',
    precio: getPrecioServicio('liquidacion-fianza') ?? 120,
    image: '/gestoria6.jpg',
    landingHref: '/gestoria/liquidacion-fianza',
  },
  // Revisiones
  {
    slug: 'revision-alquiler',
    nombre: 'Revisión de Contrato de Alquiler',
    shortName: 'Revisión alquiler',
    descripcion: 'Revisión legal de un contrato de alquiler ya redactado o propuesto.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-alquiler') ?? 120,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/revision-alquiler',
  },
  {
    slug: 'revision-correccion',
    nombre: 'Revisión + Corrección de Contrato',
    shortName: 'Revisión + corrección',
    descripcion: 'Informe de riesgos y versión corregida del borrador para negociar.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-correccion') ?? 120,
    image: '/gestoria14.jpg',
    landingHref: '/gestoria/revision-correccion',
  },
  {
    slug: 'revision-correccion-arras',
    nombre: 'Revisión + Corrección de Arras',
    shortName: 'Corrección arras',
    descripcion: 'Revisión especializada de arras con contrato corregido antes de la señal.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-correccion-arras') ?? 120,
    image: '/contratodearras.jpg',
    landingHref: '/gestoria/revision-correccion-arras',
  },
  {
    slug: 'contrato-ilegal',
    nombre: 'Análisis de Fraude Inmobiliario',
    shortName: 'Análisis fraude',
    descripcion: 'Detectamos indicios de estafa o contratos irregulares antes de pagar.',
    categoria: 'revision',
    precio: getPrecioServicio('contrato-ilegal') ?? 145,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/contrato-ilegal',
    badge: 'Urgente 12h',
  },

  // Packs / acompañamiento
  {
    slug: 'pack-due-diligence-precompra',
    nombre: 'Pack Due Diligence Pre-Compra',
    shortName: 'Due diligence',
    descripcion: 'Verificación documental completa tras arras y antes de escriturar.',
    categoria: 'packs',
    precio: getPrecioServicio('pack-due-diligence-precompra') ?? 350,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/pack-due-diligence-precompra',
    badge: 'Pre-compra',
  },
  {
    slug: 'pack-arras-revision-documental',
    nombre: 'Pack Arras Plus Comprador',
    shortName: 'Pack Arras Comprador',
    descripcion: 'Arras penitenciales + revisión documental integral para compradores entre particulares.',
    categoria: 'packs',
    precio: getPrecioServicio('pack-arras-revision-documental') ?? 450,
    image: '/gestoria10.jpg',
    landingHref: '/gestoria/pack-arras-revision-documental',
    badge: 'Compradores',
  },
  {
    slug: 'pack-arras-plus-vendedor',
    nombre: 'Pack Arras Plus Vendedor',
    shortName: 'Pack Arras Vendedor',
    descripcion: 'Arras penitenciales + recopilación y análisis documental para vender entre particulares.',
    categoria: 'packs',
    precio: getPrecioServicio('pack-arras-plus-vendedor') ?? 450,
    image: '/contratodearras.jpg',
    landingHref: '/gestoria/pack-arras-plus-vendedor',
    badge: 'Vendedores',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    nombre: 'Compra Completa: Reserva a Escritura',
    shortName: 'Compra completa',
    descripcion: 'Acompañamiento total del comprador hasta la firma en notaría.',
    categoria: 'packs',
    precio: getPrecioServicio('compra-completa-reserva-escritura') ?? 687,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/compra-completa-reserva-escritura',
  },
  {
    slug: 'venta-completa-reserva-escritura',
    nombre: 'Venta Completa: Reserva a Escritura',
    shortName: 'Venta completa',
    descripcion: 'Gestor asignado para vender entre particulares sin comisión de agencia.',
    categoria: 'packs',
    precio: getPrecioServicio('venta-completa-reserva-escritura') ?? 687,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/venta-completa-reserva-escritura',
  },
  {
    slug: 'acompanamiento-reserva-arras',
    nombre: 'Acompañamiento Reserva hasta Arras',
    shortName: 'Reserva → arras',
    descripcion: 'Te guiamos desde la reserva hasta firmar las arras con seguridad.',
    categoria: 'packs',
    precio: getPrecioServicio('acompanamiento-reserva-arras') ?? 424,
    image: '/contrato6.jpg',
    landingHref: '/gestoria/acompanamiento-reserva-arras',
  },
  {
    slug: 'asesoramiento-arras-venta',
    nombre: 'Asesoramiento Arras hasta Escritura (Vendedores)',
    shortName: 'Asesoramiento venta',
    descripcion: 'Para vendedores que ya firmaron arras: documentación y coordinación hasta notaría.',
    categoria: 'packs',
    precio: getPrecioServicio('asesoramiento-arras-venta') ?? 350,
    image: '/contrato1.jpg',
    landingHref: '/gestoria/asesoramiento-arras-venta',
    badge: 'Vendedores',
  },
  {
    slug: 'compra-completa-parking-trastero',
    nombre: 'Compra Completa Parking o Trastero',
    shortName: 'Compra parking',
    descripcion: 'Acompañamiento completo para comprar plaza de garaje o trastero.',
    categoria: 'packs',
    precio: getPrecioServicio('compra-completa-parking-trastero') ?? 295,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/compra-completa-parking-trastero',
  },
  {
    slug: 'asesoria-compra-piso',
    nombre: 'Asesoría Compra de Piso',
    shortName: 'Asesoría compra',
    descripcion: 'Gestor asignado desde reserva hasta escritura. Compra entre particulares sin comisión de agencia.',
    categoria: 'packs',
    precio: getPrecioServicio('compra-completa-reserva-escritura') ?? 687,
    image: '/interior4.jpg',
    landingHref: '/gestoria/compra-completa-reserva-escritura',
    badge: 'Compradores',
  },
  {
    slug: 'pack-revision-reserva-alquiler',
    nombre: 'Pack Revisión + Reserva + Alquiler',
    shortName: 'Pack alquiler',
    descripcion: 'Revisión y redacción de reserva más contrato de alquiler en un pack.',
    categoria: 'packs',
    precio: getPrecioServicio('pack-revision-reserva-alquiler') ?? 169,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/pack-revision-reserva-alquiler',
  },

  // Packs B2B — agencias y agentes independientes
  ...AGENCIA_GESTORIA_PACKS.map((pack) => ({
    slug: `pack-agencia-${pack.id}`,
    nombre: `${pack.nombre} — Gestoría B2B`,
    shortName: pack.nombre,
    descripcion: `${pack.idealPara}. ${pack.contratosAnuales} contratos/año · ${AGENCIA_SLA_LABEL} · FirmaCert incluida.`,
    categoria: 'agencias' as const,
    precio: pack.precioUnitario,
    image: '/inmobiliaria8.jpg',
    landingHref: '/agencias/gestoria',
    badge: pack.highlight ? 'Recomendado' : pack.id === 'agente' ? 'Autónomos' : undefined,
    incluye: pack.features.slice(0, 5),
  })),

  // Otros
  {
    slug: 'prestamo-particulares',
    nombre: 'Préstamo entre Particulares',
    shortName: 'Préstamo particulares',
    descripcion: 'Contrato de préstamo privado entre particulares, claro y ejecutable.',
    categoria: 'otros',
    precio: getPrecioServicio('prestamo-particulares') ?? 130,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/prestamo-particulares',
  },
]

export const SERVICIOS_CATEGORIA_LABELS: Record<ServicioCategoria | 'todos', string> = {
  todos: 'Todos',
  compraventa: 'Compraventa',
  alquiler: 'Alquiler',
  revision: 'Revisiones',
  packs: 'Packs y acompañamiento',
  agencias: 'Para agencias',
  otros: 'Otros',
}

/** Servicios pendientes de página propia (referencia interna). */
export const SERVICIOS_SIN_PAGINA = [] as const

/** Comprueba que el slug existe en el catálogo Stripe/precios. */
export function assertServicioEnCatalogo(slug: string): boolean {
  return Boolean(GESTORIA_SERVICIOS[slug] || slug === 'contrato-alquiler')
}
