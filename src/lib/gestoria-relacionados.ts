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
    slug: 'revision-correccion-arras',
    href: '/gestoria/revision-correccion-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-correccion-arras'),
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
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato Alquiler LAU',
    precio: precio('contrato-alquiler'),
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
    slug: 'revision-correccion-arras',
    href: '/gestoria/revision-correccion-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-correccion-arras'),
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

export const RELACIONADOS_LOCAL_COMERCIAL: RelacionadoServicio[] = [
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: 'Para alquilar vivienda íntegra con protección LAU 2026.',
  },
  {
    slug: 'revision-alquiler',
    href: '/gestoria/revision-contrato-alquiler',
    nombre: 'Revisión Contrato Alquiler',
    precio: precio('revision-alquiler'),
    descripcion: 'Revisamos el borrador antes de firmar.',
  },
  {
    slug: 'alquiler-habitaciones',
    href: '/gestoria/contrato-alquiler-habitacion',
    nombre: 'Alquiler Habitación',
    precio: precio('alquiler-habitaciones'),
    descripcion: 'Contrato de habitación en piso compartido.',
  },
  {
    slug: 'alquiler-garaje-trastero',
    href: '/gestoria/alquiler-garaje-trastero',
    nombre: 'Alquiler Garaje o Trastero',
    precio: precio('alquiler-garaje-trastero'),
    descripcion: 'Contrato para plazas de garaje o trasteros.',
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
    href: '/gestoria/contrato-alquiler-habitacion',
    nombre: 'Alquiler Habitación',
    precio: precio('alquiler-habitaciones'),
    descripcion: 'Contrato de habitación en piso compartido.',
  },
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: 'Redactamos el contrato adaptado a LAU 2026.',
  },
]

export const RELACIONADOS_REVISION_ARRAS: RelacionadoServicio[] = [
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: '¿Aún no tienes contrato? Lo redactamos por ti.',
  },
  {
    slug: 'pack-due-diligence-precompra',
    href: '/gestoria/due-diligence-precompra',
    nombre: 'Due Diligence Pre-Compra',
    precio: precio('pack-due-diligence-precompra'),
    descripcion: 'Verificación documental completa antes de escriturar.',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    href: '/gestoria/asesoria-compra-piso',
    nombre: 'Asesoría Compra de Piso',
    precio: precio('compra-completa-reserva-escritura'),
    descripcion: 'Acompañamiento integral del comprador hasta notaría.',
  },
]

export const RELACIONADOS_REVISION_ALQUILER: RelacionadoServicio[] = [
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato de Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: '¿Eres propietario? Redactamos el contrato adaptado a LAU 2026.',
  },
  {
    slug: 'alquiler-habitaciones',
    href: '/gestoria/contrato-alquiler-habitacion',
    nombre: 'Alquiler Habitación',
    precio: precio('alquiler-habitaciones'),
    descripcion: 'Contrato de habitación con normas de convivencia.',
  },
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: 'Orientación legal para arrendadores.',
  },
]

export const RELACIONADOS_ASESORAMIENTO_VENTA: RelacionadoServicio[] = [
  {
    slug: 'venta-completa-reserva-escritura',
    href: '/gestoria/venta-completa-reserva-escritura',
    nombre: 'Venta Completa',
    precio: precio('venta-completa-reserva-escritura'),
    descripcion: 'Gestor asignado desde reserva hasta escritura.',
  },
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: 'Si aún no firmaste arras, lo redactamos por ti.',
  },
  {
    slug: 'revision-correccion-arras',
    href: '/gestoria/revision-correccion-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-correccion-arras'),
    descripcion: 'Revisamos el borrador antes de firmar.',
  },
]

export const RELACIONADOS_AYUDA_PROPIETARIOS: RelacionadoServicio[] = [
  {
    slug: 'contrato-alquiler',
    href: '/gestoria/contrato-alquiler',
    nombre: 'Contrato de Alquiler LAU',
    precio: precio('contrato-alquiler'),
    descripcion: 'Contrato completo adaptado a la Ley de Vivienda 2026.',
  },
  {
    slug: 'revision-alquiler',
    href: '/gestoria/revision-contrato-alquiler',
    nombre: 'Revisión Contrato Alquiler',
    precio: precio('revision-alquiler'),
    descripcion: '¿Te han enviado un borrador? Lo revisamos por ti.',
  },
  {
    slug: 'alquiler-habitaciones',
    href: '/gestoria/contrato-alquiler-habitacion',
    nombre: 'Alquiler Habitación',
    precio: precio('alquiler-habitaciones'),
    descripcion: 'Si alquilas por habitaciones en piso compartido.',
  },
]

export const RELACIONADOS_COMPRAVENTA: RelacionadoServicio[] = [
  {
    slug: 'arras-penitenciales',
    href: '/gestoria/arras-penitenciales',
    nombre: 'Contrato de Arras',
    precio: precio('arras-penitenciales'),
    descripcion: 'Señal con arras penitenciales antes de la compraventa.',
  },
  {
    slug: 'revision-correccion-arras',
    href: '/gestoria/revision-correccion-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-correccion-arras'),
    descripcion: 'Revisamos el contrato de arras antes de firmar.',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    href: '/gestoria/asesoria-compra-piso',
    nombre: 'Asesoría Compra de Piso',
    precio: precio('compra-completa-reserva-escritura'),
    descripcion: 'Acompañamiento integral hasta escritura.',
  },
]

export const RELACIONADOS_CONTRATO_ILEGAL: RelacionadoServicio[] = [
  {
    slug: 'revision-correccion-arras',
    href: '/gestoria/revision-correccion-arras',
    nombre: 'Revisión de Arras',
    precio: precio('revision-correccion-arras'),
    descripcion: 'Detectamos cláusulas abusivas en contratos de arras.',
  },
  {
    slug: 'revision-alquiler',
    href: '/gestoria/revision-contrato-alquiler',
    nombre: 'Revisión de Alquiler',
    precio: precio('revision-alquiler'),
    descripcion: 'Revisión legal de contratos de alquiler.',
  },
  {
    slug: 'pack-due-diligence-precompra',
    href: '/gestoria/due-diligence-precompra',
    nombre: 'Due Diligence',
    precio: precio('pack-due-diligence-precompra'),
    descripcion: 'Verificación documental antes de comprar.',
  },
]
