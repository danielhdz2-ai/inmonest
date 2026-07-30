import { GESTORIA_SERVICIOS, getPrecioServicio } from '@/lib/gestoria-catalogo'

export type ServicioCategoria = 'compraventa' | 'alquiler' | 'revision' | 'packs' | 'otros'

export type ServicioLandingCard = {
  slug: string
  nombre: string
  shortName: string
  descripcion: string
  categoria: ServicioCategoria
  precio: number
  image: string
  /** Landing SEO genérica; null = aún no existe → usar /gestoria/solicitar/[slug] */
  landingHref: string | null
  badge?: string
}

/**
 * Catálogo visible en /servicios.
 * landingHref = URL de landing genérica SEO cuando existe.
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
    precio: getPrecioServicio('reserva-compra') ?? 61,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/reserva-compra',
  },
  {
    slug: 'contrato-compraventa',
    nombre: 'Contrato de Compraventa de Vivienda',
    shortName: 'Compraventa',
    descripcion: 'Documento privado de compraventa personalizado, listo para firma.',
    categoria: 'compraventa',
    precio: getPrecioServicio('contrato-compraventa') ?? 80,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/contrato-compraventa',
  },
  {
    slug: 'arras-parking-garage',
    nombre: 'Arras Parking o Garaje',
    shortName: 'Arras parking',
    descripcion: 'Arras específicas para compraventa de plaza de garaje o trastero.',
    categoria: 'compraventa',
    precio: getPrecioServicio('arras-parking-garage') ?? 73,
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
    slug: 'alquiler-temporada',
    nombre: 'Contrato de Alquiler por Temporada',
    shortName: 'Alquiler temporada',
    descripcion: 'Arrendamiento temporal (estudios, trabajo, estancias). No es vivienda habitual LAU.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-temporada') ?? 165,
    image: '/contrato1.jpg',
    landingHref: null,
  },
  {
    slug: 'alquiler-habitaciones',
    nombre: 'Contrato de Alquiler de Habitación',
    shortName: 'Alquiler habitación',
    descripcion: 'Habitación en piso compartido: normas de convivencia y Código Civil.',
    categoria: 'alquiler',
    precio: getPrecioServicio('alquiler-habitaciones') ?? 145,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/contrato-alquiler-habitacion',
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
    precio: getPrecioServicio('rescision-alquiler') ?? 73,
    image: '/contrato6.jpg',
    landingHref: '/gestoria/rescision-alquiler',
  },
  {
    slug: 'reserva-alquiler',
    nombre: 'Contrato de Reserva de Alquiler',
    shortName: 'Reserva alquiler',
    descripcion: 'Señal de reserva del piso de alquiler mientras se prepara el LAU.',
    categoria: 'alquiler',
    precio: getPrecioServicio('reserva-alquiler') ?? 61,
    image: '/contrato1.jpg',
    landingHref: null,
  },
  {
    slug: 'liquidacion-fianza',
    nombre: 'Liquidación de Fianza',
    shortName: 'Liquidación fianza',
    descripcion: 'Documento de liquidación y devolución de fianza al finalizar el alquiler.',
    categoria: 'alquiler',
    precio: getPrecioServicio('liquidacion-fianza') ?? 36,
    image: '/contrato2.jpg',
    landingHref: null,
  },
  {
    slug: 'ayuda-propietarios',
    nombre: 'Redacción LAU para Propietarios',
    shortName: 'Ayuda propietarios',
    descripcion: 'Contrato LAU orientado a propietarios que alquilan por primera vez.',
    categoria: 'alquiler',
    precio: getPrecioServicio('ayuda-propietarios') ?? 73,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/ayuda-propietarios',
  },

  // Revisiones
  {
    slug: 'revision-arras',
    nombre: 'Revisión de Contrato de Arras',
    shortName: 'Revisión arras',
    descripcion: 'Detectamos cláusulas abusivas antes de firmar la señal.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-arras') ?? 60,
    image: '/contrato4.jpg',
    landingHref: '/gestoria/revision-contrato-arras',
  },
  {
    slug: 'revision-alquiler',
    nombre: 'Revisión de Contrato de Alquiler',
    shortName: 'Revisión alquiler',
    descripcion: 'Revisión legal de un contrato de alquiler ya redactado o propuesto.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-alquiler') ?? 60,
    image: '/contrato5.jpg',
    landingHref: '/gestoria/revision-contrato-alquiler',
  },
  {
    slug: 'revision-correccion',
    nombre: 'Revisión + Corrección de Contrato',
    shortName: 'Revisión + corrección',
    descripcion: 'Revisamos y corregimos el contrato de alquiler con cambios incluidos.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-correccion') ?? 120,
    image: '/contrato6.jpg',
    landingHref: null,
  },
  {
    slug: 'revision-correccion-arras',
    nombre: 'Revisión + Corrección de Arras',
    shortName: 'Corrección arras',
    descripcion: 'Revisión y corrección del contrato de arras antes de firmar.',
    categoria: 'revision',
    precio: getPrecioServicio('revision-correccion-arras') ?? 120,
    image: '/contrato1.jpg',
    landingHref: null,
  },
  {
    slug: 'contrato-ilegal',
    nombre: 'Análisis de Fraude Inmobiliario',
    shortName: 'Análisis fraude',
    descripcion: 'Detectamos indicios de estafa o contratos irregulares antes de pagar.',
    categoria: 'revision',
    precio: getPrecioServicio('contrato-ilegal') ?? 29,
    image: '/contrato2.jpg',
    landingHref: '/gestoria/contrato-ilegal',
    badge: 'Desde 29€',
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
    landingHref: '/gestoria/due-diligence-precompra',
    badge: 'Pre-compra',
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
    precio: getPrecioServicio('asesoramiento-arras-venta') ?? 166,
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
    slug: 'pack-revision-reserva-alquiler',
    nombre: 'Pack Revisión + Reserva + Alquiler',
    shortName: 'Pack alquiler',
    descripcion: 'Revisión y redacción de reserva más contrato de alquiler en un pack.',
    categoria: 'packs',
    precio: getPrecioServicio('pack-revision-reserva-alquiler') ?? 169,
    image: '/contrato3.jpg',
    landingHref: '/gestoria/pack-revision-reserva-alquiler',
  },

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
  {
    slug: 'asesoria-compra',
    nombre: 'Asesoría Completa Compra de Vivienda',
    shortName: 'Asesoría compra',
    descripcion: 'Asesoría jurídica de compra (SKU 95€). Para acompañamiento completo hasta escritura usa Compra completa.',
    categoria: 'otros',
    precio: getPrecioServicio('asesoria-compra') ?? 95,
    image: '/contrato5.jpg',
    landingHref: null,
  },
]

export const SERVICIOS_CATEGORIA_LABELS: Record<ServicioCategoria | 'todos', string> = {
  todos: 'Todos',
  compraventa: 'Compraventa',
  alquiler: 'Alquiler',
  revision: 'Revisiones',
  packs: 'Packs y acompañamiento',
  otros: 'Otros',
}

/** Servicios del catálogo sin landing genérica SEO propia (hay que crearla). */
export function getServiciosSinLanding(): ServicioLandingCard[] {
  return SERVICIOS_LANDING_CARDS.filter((s) => !s.landingHref)
}

/** Comprueba que el slug existe en el catálogo Stripe/precios. */
export function assertServicioEnCatalogo(slug: string): boolean {
  return Boolean(GESTORIA_SERVICIOS[slug] || slug === 'contrato-alquiler')
}
