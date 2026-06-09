import { getPrecioServicio } from './gestoria-catalogo'

/** Precios canónicos alineados con Stripe y /gestoria/solicitar/[servicio] */
export const GESTORIA_PRECIOS = {
  contratoAlquiler: getPrecioServicio('contrato-alquiler')!,
  arrasPenitenciales: getPrecioServicio('arras-penitenciales')!,
  reservaCompra: getPrecioServicio('reserva-compra')!,
  revisionArras: getPrecioServicio('revision-arras')!,
  revisionAlquiler: getPrecioServicio('revision-alquiler')!,
  rescisionAlquiler: getPrecioServicio('rescision-alquiler')!,
  acompanamientoReservaArras: getPrecioServicio('acompanamiento-reserva-arras')!,
  ventaCompleta: getPrecioServicio('venta-completa-reserva-escritura')!,
  compraCompleta: getPrecioServicio('compra-completa-reserva-escritura')!,
  asesoramientoArrasVenta: getPrecioServicio('asesoramiento-arras-venta')!,
  analisisFraude: getPrecioServicio('contrato-ilegal')!,
  alquilerTemporada: getPrecioServicio('alquiler-temporada')!,
} as const

export type ServicioDestacado = {
  slug: string
  imagen: string
  categoria: string
  nombre: string
  descripcion: string
  precio: number
  popular?: boolean
}

export const SERVICIOS_DESTACADOS_CIUDAD: ServicioDestacado[] = [
  {
    slug: 'contrato-alquiler',
    imagen: '/gestoria4.jpg',
    categoria: 'Alquiler',
    nombre: 'Contrato Alquiler LAU',
    descripcion: 'Arrendamiento de vivienda habitual. Adaptado a Ley de Vivienda 2026.',
    precio: GESTORIA_PRECIOS.contratoAlquiler,
  },
  {
    slug: 'arras-penitenciales',
    imagen: '/gestoria1.jpg',
    categoria: 'Compraventa',
    nombre: 'Arras Penitenciales',
    descripcion: 'Protege tu señal de compra. Permite desistir con penalización justa.',
    precio: GESTORIA_PRECIOS.arrasPenitenciales,
    popular: true,
  },
  {
    slug: 'revision-arras',
    imagen: '/gestoria6.jpg',
    categoria: 'Revisión Legal',
    nombre: 'Revisión Contrato Arras',
    descripcion: 'Detectamos cláusulas abusivas y errores antes de firmar.',
    precio: GESTORIA_PRECIOS.revisionArras,
  },
  {
    slug: 'rescision-alquiler',
    imagen: '/gestoria10.jpg',
    categoria: 'Rescisión',
    nombre: 'Rescisión de Alquiler',
    descripcion: 'Finaliza tu contrato legalmente con acta y liquidación de fianza.',
    precio: GESTORIA_PRECIOS.rescisionAlquiler,
  },
  {
    slug: 'venta-completa-reserva-escritura',
    imagen: '/gestoria11.jpg',
    categoria: 'Premium',
    nombre: 'Venta Completa hasta Escritura',
    descripcion: 'Gestor asignado para vender entre particulares sin comisión de agencia.',
    precio: GESTORIA_PRECIOS.ventaCompleta,
  },
  {
    slug: 'compra-completa-reserva-escritura',
    imagen: '/gestoria3.jpg',
    categoria: 'Premium',
    nombre: 'Compra Completa hasta Escritura',
    descripcion: 'Acompañamiento total para compradores particulares sin comisiones abusivas.',
    precio: GESTORIA_PRECIOS.compraCompleta,
  },
]
