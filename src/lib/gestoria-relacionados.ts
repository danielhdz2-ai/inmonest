import { getPrecioServicio } from './gestoria-catalogo'

export type RelacionadoServicio = {
  slug: string
  href: string
  nombre: string
  precio: number
  descripcion?: string
}

function precio(slug: string): number {
  return getPrecioServicio(slug) ?? 0
}

/** Tarjetas relacionadas — venta completa y similares */
export const RELACIONADOS_VENTA: RelacionadoServicio[] = [
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: 'Solo el contrato de arras penitenciales redactado y personalizado.',
  },
  {
    slug: 'reserva-compra',
    href: '/gestoria/solicitar/reserva-compra',
    nombre: 'Contrato de Reserva',
    precio: precio('reserva-compra'),
    descripcion: 'Redacción del contrato de reserva para asegurar la operación.',
  },
  {
    slug: 'revision-arras',
    href: '/gestoria/revision-contrato-arras',
    nombre: 'Revisión de Contratos',
    precio: precio('revision-arras'),
    descripcion: '¿Ya tienes contrato? Lo revisamos y te decimos si está bien.',
  },
]

export const RELACIONADOS_DUE_DILIGENCE: RelacionadoServicio[] = [
  {
    slug: 'compra-completa-reserva-escritura',
    href: '/gestoria/asesoria-compra-piso',
    nombre: 'Asesoría Compra de Piso',
    precio: precio('compra-completa-reserva-escritura'),
    descripcion: 'Acompañamiento integral desde reserva hasta escritura.',
  },
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: 'Arras penitenciales redactadas por gestoría especializada.',
  },
  {
    slug: 'venta-completa-reserva-escritura',
    href: '/gestoria/venta-completa-reserva-escritura',
    nombre: 'Venta Completa',
    precio: precio('venta-completa-reserva-escritura'),
    descripcion: 'Vende tu piso sin agencia con gestor asignado hasta escritura.',
  },
]

export const RELACIONADOS_ASESORIA_COMPRA: RelacionadoServicio[] = [
  {
    slug: 'pack-due-diligence-precompra',
    href: '/gestoria/due-diligence-precompra',
    nombre: 'Due Diligence Pre-Compra',
    precio: precio('pack-due-diligence-precompra'),
    descripcion: 'Revisión documental completa antes de firmar arras o escritura.',
  },
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: 'Arras penitenciales adaptadas a tu operación de compra.',
  },
  {
    slug: 'venta-completa-reserva-escritura',
    href: '/gestoria/venta-completa-reserva-escritura',
    nombre: 'Venta Completa',
    precio: precio('venta-completa-reserva-escritura'),
    descripcion: 'Si también vendes, acompañamiento completo por 687€.',
  },
]

export const RELACIONADOS_PRESTAMO: RelacionadoServicio[] = [
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras Penitenciales',
    precio: precio('arras-penitenciales'),
    descripcion: 'Si el préstamo financia la compra, las arras formalizan el compromiso.',
  },
  {
    slug: 'pack-due-diligence-precompra',
    href: '/gestoria/due-diligence-precompra',
    nombre: 'Due Diligence Pre-Compra',
    precio: precio('pack-due-diligence-precompra'),
    descripcion: 'Revisión documental antes de escriturar una compra entre particulares.',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    href: '/gestoria/asesoria-compra-piso',
    nombre: 'Asesoría Compra de Piso',
    precio: precio('compra-completa-reserva-escritura'),
    descripcion: 'Acompañamiento integral si el préstamo va destinado a comprar vivienda.',
  },
]

export const RELACIONADOS_HABITACION: RelacionadoServicio[] = [
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato de Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: 'Para alquilar el piso íntegro con protección de la LAU.',
  },
  {
    slug: 'revision-alquiler',
    href: '/gestoria/revision-contrato-alquiler',
    nombre: 'Revisión Contrato Alquiler',
    precio: precio('revision-alquiler'),
    descripcion: '¿Ya tienes borrador? Lo revisamos antes de firmar.',
  },
  {
    slug: 'ayuda-propietarios',
    href: '/gestoria/ayuda-propietarios',
    nombre: 'Ayuda Propietarios LAU',
    precio: precio('ayuda-propietarios'),
    descripcion: 'Consultas sobre obligaciones y derechos como arrendador.',
  },
]

export const RELACIONADOS_PARKING: RelacionadoServicio[] = [
  {
    slug: 'arras-parking-garage',
    href: '/gestoria/arras-parking-garage',
    nombre: 'Arras Parking / Garaje',
    precio: precio('arras-parking-garage'),
    descripcion: 'Señal de arras para compraventa de plaza de garaje.',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    href: '/gestoria/asesoria-compra-piso',
    nombre: 'Asesoría Compra Vivienda',
    precio: precio('compra-completa-reserva-escritura'),
    descripcion: 'Si compras vivienda y parking, acompañamiento integral.',
  },
  {
    slug: 'pack-due-diligence-precompra',
    href: '/gestoria/due-diligence-precompra',
    nombre: 'Due Diligence',
    precio: precio('pack-due-diligence-precompra'),
    descripcion: 'Verificación registral antes de comprar garaje o trastero.',
  },
]

export const RELACIONADOS_ARRAS: RelacionadoServicio[] = [
  {
    slug: 'venta-completa-reserva-escritura',
    href: '/gestoria/venta-completa-reserva-escritura',
    nombre: 'Venta Completa',
    precio: precio('venta-completa-reserva-escritura'),
    descripcion: 'Gestor asignado, arras y documentación hasta escritura.',
  },
  {
    slug: 'revision-arras',
    href: '/gestoria/revision-contrato-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-arras'),
    descripcion: '¿Ya tienes borrador de arras? Lo revisamos por ti.',
  },
  {
    slug: 'reserva-compra',
    href: '/gestoria/solicitar/reserva-compra',
    nombre: 'Contrato de Reserva',
    precio: precio('reserva-compra'),
    descripcion: 'Reserva previa a las arras para asegurar la operación.',
  },
]

export const RELACIONADOS_ALQUILER: RelacionadoServicio[] = [
  {
    slug: 'revision-alquiler',
    href: '/gestoria/revision-contrato-alquiler',
    nombre: 'Revisión Contrato Alquiler',
    precio: precio('revision-alquiler'),
    descripcion: 'Revisamos el borrador del propietario antes de firmar.',
  },
  {
    slug: 'alquiler-habitaciones',
    href: '/gestoria/alquiler-habitaciones',
    nombre: 'Alquiler Habitación',
    precio: precio('alquiler-habitaciones'),
    descripcion: 'Contrato de habitación en piso compartido.',
  },
  {
    slug: 'ayuda-propietarios',
    href: '/gestoria/ayuda-propietarios',
    nombre: 'Ayuda Propietarios',
    precio: precio('ayuda-propietarios'),
    descripcion: 'Consultas LAU para arrendadores.',
  },
]
