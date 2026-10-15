import type { BarcelonaHabitacionBarrioConfig } from '@/lib/barcelona-alquiler-habitacion-barrios'

export type BloqueCompradorVendedor = NonNullable<BarcelonaHabitacionBarrioConfig['bloqueCompradores']>

export function resolveBloqueCompradores(config: BarcelonaHabitacionBarrioConfig): BloqueCompradorVendedor {
  if (config.bloqueCompradores) return config.bloqueCompradores
  return {
    titulo: `¿Compras piso en ${config.nombre}?`,
    intro: `Alquilar una habitación en ${config.nombre} no sustituye un contrato de arras ni una due diligence. Si pasas de inquilino de habitación a comprador, revisa documentación antes de entregar señal.`,
    bullets: [
      'Arras penitenciales adaptadas al barrio y al estado del edificio',
      'Due diligence pre-compra: comunidad, cargas y licencias',
      'Asesoría de compra entre particulares con gestor asignado',
    ],
  }
}

export function resolveBloqueVendedores(config: BarcelonaHabitacionBarrioConfig): BloqueCompradorVendedor {
  if (config.bloqueVendedores) return config.bloqueVendedores
  return {
    titulo: `¿Vendes en ${config.nombre}?`,
    intro: `Si alquilabas habitaciones en ${config.nombre} y ahora vendes el piso, el comprador exigirá claridad sobre inquilinos, contratos vigentes y certificado de deudas de comunidad.`,
    bullets: [
      'Regularizar contratos de habitación y fechas de salida',
      'Arras de venta y pack vendedor con documentación ordenada',
      'Coordinación para entregar el piso libre o con inquilino LAU, según pacto',
    ],
  }
}
