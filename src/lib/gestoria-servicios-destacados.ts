/** Precios canónicos alineados con /gestoria y /gestoria/solicitar/[servicio] */
export const GESTORIA_PRECIOS = {
  contratoAlquiler: 120,
  arrasPenitenciales: 145,
  reservaCompra: 61,
  revisionArras: 60,
  revisionAlquiler: 60,
  rescisionAlquiler: 73,
  acompanamientoReservaArras: 424,
  ventaCompleta: 687,
  compraCompleta: 687,
  asesoramientoArrasVenta: 166,
  analisisFraude: 29,
} as const

export type ServicioDestacado = {
  slug: string
  icono: string
  nombre: string
  descripcion: string
  precio: number
  popular?: boolean
}

export const SERVICIOS_DESTACADOS_CIUDAD: ServicioDestacado[] = [
  {
    slug: 'contrato-alquiler',
    icono: '📄',
    nombre: 'Contrato Alquiler LAU',
    descripcion: 'Arrendamiento de vivienda habitual. Adaptado a Ley de Vivienda 2026.',
    precio: GESTORIA_PRECIOS.contratoAlquiler,
  },
  {
    slug: 'arras-penitenciales',
    icono: '🤝',
    nombre: 'Arras Penitenciales',
    descripcion: 'Protege tu señal de compra. Permite desistir con penalización justa.',
    precio: GESTORIA_PRECIOS.arrasPenitenciales,
    popular: true,
  },
  {
    slug: 'revision-arras',
    icono: '🔍',
    nombre: 'Revisión Contrato Arras',
    descripcion: 'Detectamos cláusulas abusivas y errores antes de firmar.',
    precio: GESTORIA_PRECIOS.revisionArras,
  },
  {
    slug: 'rescision-alquiler',
    icono: '✂️',
    nombre: 'Rescisión de Alquiler',
    descripcion: 'Finaliza tu contrato legalmente con acta y liquidación de fianza.',
    precio: GESTORIA_PRECIOS.rescisionAlquiler,
  },
  {
    slug: 'venta-completa-reserva-escritura',
    icono: '🏠',
    nombre: 'Venta Completa hasta Escritura',
    descripcion: 'Gestor asignado para vender entre particulares sin comisión de agencia.',
    precio: GESTORIA_PRECIOS.ventaCompleta,
  },
  {
    slug: 'compra-completa-reserva-escritura',
    icono: '🔑',
    nombre: 'Compra Completa hasta Escritura',
    descripcion: 'Acompañamiento total para compradores particulares sin comisiones abusivas.',
    precio: GESTORIA_PRECIOS.compraCompleta,
  },
]
