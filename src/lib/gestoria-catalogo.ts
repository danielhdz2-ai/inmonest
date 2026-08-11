/** Fuente de verdad de precios — alineada con Stripe (/api/gestoria/checkout) */

export type GestoriaServicio = {
  nombre: string
  precio: number
  categoria: string
  incluye: string[]
  /** No mostrar en catálogo público / upsell; no afecta precio mínimo marketing */
  interno?: boolean
}

export const GESTORIA_SERVICIOS: Record<string, GestoriaServicio> = {
  'arras-penitenciales': {
    nombre: 'Contrato de Arras Penitenciales',
    precio: 145,
    categoria: 'Compraventa',
    incluye: [
      'Redacción personalizada con datos reales',
      'Revisión de nota simple registral',
      'Cláusulas de desistimiento y penalización',
      'PDF firmable en 48h',
    ],
  },
  'arras-confirmatorias': {
    nombre: 'Contrato de Arras Confirmatorias',
    precio: 145,
    categoria: 'Compraventa',
    incluye: [
      'Redacción personalizada con datos reales',
      'Cláusulas de obligación de cumplimiento',
      'Revisión de nota simple registral',
      'PDF firmable en 48h',
    ],
  },
  'reserva-compra': {
    nombre: 'Contrato de Reserva de Compra',
    precio: 120,
    categoria: 'Compraventa',
    incluye: [
      'Bloqueo jurídico del inmueble 48-72h',
      'Consignación de señal de reserva',
      'Condiciones resolutorias incluidas',
      'PDF firmable en 24h',
    ],
  },
  'contrato-alquiler': {
    nombre: 'Contrato de Alquiler de Vivienda (LAU)',
    precio: 145,
    categoria: 'Alquiler',
    incluye: [
      'Adaptado a la Ley de Vivienda 2026',
      'Cláusulas de actualización de renta',
      'Fianza y garantías adicionales',
      'PDF firmable en 48h',
    ],
  },
  'contrato-alquiler-barcelona': {
    nombre: 'Contrato de Alquiler de Vivienda (LAU) — Barcelona',
    precio: 120,
    categoria: 'Alquiler',
    incluye: [
      'Adaptado a la Ley de Vivienda 2026',
      'Cláusulas de actualización de renta',
      'Fianza y garantías adicionales',
      'PDF firmable en 48h',
    ],
  },
  'alquiler-temporada': {
    nombre: 'Contrato de Alquiler por Temporada',
    precio: 165,
    categoria: 'Alquiler',
    incluye: [
      'Duración y causa de temporalidad específica',
      'Exento de prórrogas automáticas de la LAU',
      'Compatible con estancias cortas y estudiantes',
      'PDF firmable en 48h',
    ],
  },
  'rescision-alquiler': {
    nombre: 'Contrato de Rescisión de Alquiler',
    precio: 120,
    categoria: 'Rescisión y fianzas',
    incluye: [
      'Acta de estado del inmueble',
      'Liquidación y devolución de fianza',
      'Cláusula de renuncia mutua',
      'PDF firmable en 48h',
    ],
  },
  'reserva-alquiler': {
    nombre: 'Contrato de Reserva de Alquiler',
    precio: 61,
    categoria: 'Alquiler',
    incluye: [
      'Señal de reserva y condiciones de devolución',
      'Plazo máximo para firma del contrato definitivo',
      'Cláusulas de desistimiento de ambas partes',
      'PDF firmable en 24h',
    ],
  },
  'liquidacion-fianza': {
    nombre: 'Liquidación de Fianza',
    precio: 120,
    categoria: 'Rescisión y fianzas',
    incluye: [
      'Desglose de conceptos descontados',
      'Valoración de daños con criterios objetivos',
      'Importes a devolver y plazos',
      'PDF firmable en 24h',
    ],
  },
  'alquiler-habitaciones': {
    nombre: 'Contrato de Alquiler de Habitación',
    precio: 145,
    categoria: 'Alquiler',
    incluye: [
      'Regulación de zonas comunes',
      'Normas de convivencia pactadas',
      'Fianza y condiciones de devolución',
      'PDF firmable en 48h',
    ],
  },
  'alquiler-local-comercial': {
    nombre: 'Contrato de Alquiler de Local Comercial',
    precio: 145,
    categoria: 'Alquiler',
    incluye: [
      'Régimen LAU uso distinto de vivienda',
      'Actualización de renta libre o IPC',
      'Derecho de tanteo ante venta',
      'PDF firmable en 48h',
    ],
  },
  'alquiler-opcion-compra': {
    nombre: 'Contrato de Alquiler con Opción a Compra',
    precio: 182,
    categoria: 'Compraventa',
    incluye: [
      'Arrendamiento + opción de compra integrados',
      'Precio de compra fijado e inalterable',
      'Descuento de rentas en precio final',
      'PDF firmable en 48h',
    ],
  },
  'prestamo-particulares': {
    nombre: 'Contrato de Préstamo entre Particulares',
    precio: 130,
    categoria: 'Financiación',
    incluye: [
      'Importe, plazos y cuotas detalladas',
      'Vencimiento anticipado por impago',
      'Nota fiscal: tributación ante AEAT',
      'PDF firmable en 48h',
    ],
  },
  'alquiler-garaje-trastero': {
    nombre: 'Contrato de Alquiler de Garaje o Trastero',
    precio: 130,
    categoria: 'Alquiler',
    incluye: [
      'Descripción del espacio y vehículos',
      'Fianza y devolución detallada',
      'Responsabilidad por daños y robos',
      'PDF firmable en 24h',
    ],
  },
  'pack-revision-reserva-alquiler': {
    nombre: 'Pack Revisión y Redacción: Reserva + Contrato de Alquiler',
    precio: 169,
    categoria: 'Alquiler',
    incluye: [
      'Revisión completa del contrato de reserva',
      'Redacción del contrato de alquiler LAU personalizado',
      'Adaptado a la Ley de Vivienda 2026',
      'Cláusulas de actualización de renta y fianza',
      'PDF firmable en 48h',
    ],
  },
  'arras-parking-garage': {
    nombre: 'Contrato de Arras para Compraventa de Parking o Garaje',
    precio: 145,
    categoria: 'Compraventa',
    incluye: [
      'Redacción personalizada para parking/garaje',
      'Revisión de nota simple registral',
      'Cláusulas de desistimiento adaptadas',
      'Verificación de cargas y servidumbres',
      'PDF firmable en 48h',
    ],
  },
  'acompanamiento-reserva-arras': {
    nombre: 'Acompañamiento Reserva hasta Arras',
    precio: 424,
    categoria: 'Servicios Premium',
    incluye: [
      'Revisión contrato de reserva',
      'Análisis nota registral completo',
      'Revisión documentación urbanística',
      'Redacción contrato de arras',
      'Apoyo jurídico durante todo el proceso',
    ],
  },
  'compra-completa-reserva-escritura': {
    nombre: 'Servicio Completo de Compra: Reserva a Escritura',
    precio: 687,
    categoria: 'Servicios Premium',
    incluye: [
      'Gestión completa del proceso de compra',
      'Revisión contratos con agencias',
      'Revisión honorarios y notas de encargo',
      'Análisis documentación registral y urbanística',
      'Coordinación con notaría',
      'Atención prioritaria',
    ],
  },
  'compra-completa-parking-trastero': {
    nombre: 'Compra Completa Parking o Trastero',
    precio: 295,
    categoria: 'Servicios Premium',
    incluye: [
      'Gestor asignado desde reserva hasta registro',
      'Contrato de reserva y arras adaptados',
      'Verificación nota simple y cargas',
      'Coordinación con notaría',
      'Liquidación ITP y gestión registral',
    ],
  },
  'venta-completa-reserva-escritura': {
    nombre: 'Servicio Completo de Venta: Reserva a Escritura',
    precio: 687,
    categoria: 'Servicios Premium',
    incluye: [
      'Gestor personalizado asignado',
      'Estudio completo de la operación',
      'Redacción de contratos reserva y arras',
      'Ayuda para recabar documentación',
      'Asesoramiento continuo hasta escritura',
      'Coordinación con notaría',
    ],
  },
  'revision-alquiler': {
    nombre: 'Revisión de Contrato de Alquiler',
    precio: 120,
    categoria: 'Revisión Legal',
    incluye: [
      'Verificación Ley Vivienda 2026',
      'Detección de cláusulas ilegales',
      'Análisis de fianza y garantías',
      'Informe de conformidad',
      'Entrega en 24h',
    ],
  },
  'revision-correccion': {
    nombre: 'Revisión + Corrección de Contrato',
    precio: 120,
    categoria: 'Revisión Legal',
    incluye: [
      'Todo lo anterior +',
      'Versión corregida del contrato',
      'Argumentos legales para negociar',
      'Asesoramiento vía email',
      'Entrega en 48h',
    ],
  },
  'revision-correccion-arras': {
    nombre: 'Revisión + Corrección de Contrato de Arras',
    precio: 120,
    categoria: 'Revisión Legal',
    incluye: [
      'Análisis completo de cláusulas',
      'Detección de errores registrales',
      'Versión corregida del contrato',
      'Argumentos legales para negociar',
      'Asesoramiento vía email',
      'Entrega en 48h',
    ],
  },
  'contrato-ilegal': {
    nombre: 'Análisis de Fraude Inmobiliario',
    precio: 145,
    categoria: 'Revisión Legal',
    incluye: [
      'Verificación documentación',
      'Detección de señales de fraude',
      'Análisis nota simple registral',
      'Informe de riesgos críticos',
      'Entrega urgente en 12h',
    ],
  },
  /** Servicio real 5€ solo para probar Stripe de punta a punta */
  'prueba-pago-stripe': {
    nombre: 'Prueba de pago Stripe',
    precio: 5,
    categoria: 'Interno',
    interno: true,
    incluye: [
      'Cobro real de 5 € vía Stripe',
      'Redirección directa a tu panel',
      'Solo para verificación interna',
    ],
  },
  'pack-due-diligence-precompra': {
    nombre: 'Pack Due Diligence Pre-Compra',
    precio: 350,
    categoria: 'Servicios Premium',
    incluye: [
      'Revisión actas de comunidad (2 años)',
      'Análisis de derramas pendientes',
      'Verificación ITE del edificio',
      'Nota registral actualizada',
      'Información urbanística y licencias',
      'Informe ejecutivo PDF en 3-5 días',
    ],
  },
  'contrato-compraventa': {
    nombre: 'Contrato de Compraventa de Vivienda',
    precio: 145,
    categoria: 'Compraventa',
    incluye: [
      'Redacción completa personalizada',
      'Cláusulas de protección comprador/vendedor',
      'Condiciones de pago y entrega',
      'Garantías y saneamiento',
      'PDF firmable en 48h',
    ],
  },
  'asesoramiento-arras-venta': {
    nombre: 'Asesoramiento Arras hasta Escritura (Vendedores)',
    precio: 166,
    categoria: 'Servicios Premium',
    incluye: [
      'Asesor experto de Inmonest asignado',
      'Ayuda para recabar toda la documentación',
      'Gestión de trámites y gestiones necesarias',
      'Acompañamiento desde arras hasta escritura',
      'Coordinación con notaría y compradores',
      'NO incluye redacción contrato arras (a parte)',
      'Ideal para propietarios vendedores',
    ],
  },
}

/** Slugs alternativos en Stripe con el mismo precio que el slug canónico */
export const GESTORIA_SLUG_ALIASES: Record<string, string> = {
  'alquiler-vivienda-lau': 'contrato-alquiler',
  'contrato-alquiler-temporal': 'alquiler-temporada',
}

const PRECIOS = Object.values(GESTORIA_SERVICIOS)
  .filter((s) => !s.interno)
  .map((s) => s.precio)

export const GESTORIA_PRECIO_MIN = Math.min(...PRECIOS)
export const GESTORIA_PRECIO_MAX = Math.max(...PRECIOS)

export function getPrecioServicio(slug: string): number | undefined {
  const canon = GESTORIA_SLUG_ALIASES[slug] ?? slug
  return GESTORIA_SERVICIOS[canon]?.precio
}

export function formatPrecioEuro(precio: number): string {
  return `${precio}€`
}

export function formatPrecioDesde(slug: string): string {
  const precio = getPrecioServicio(slug)
  return precio != null ? `Desde ${formatPrecioEuro(precio)}` : 'Consultar precio'
}

export const CONTRATO_ALQUILER_PRECIO_ESPANA = 145
export const CONTRATO_ALQUILER_PRECIO_BARCELONA = 120

export function getContratoAlquilerPrecio(ciudadSlug?: string | null): number {
  return ciudadSlug === 'barcelona' ? CONTRATO_ALQUILER_PRECIO_BARCELONA : CONTRATO_ALQUILER_PRECIO_ESPANA
}

export function getContratoAlquilerSolicitarSlug(ciudadSlug?: string | null): string {
  return ciudadSlug === 'barcelona' ? 'contrato-alquiler-barcelona' : 'contrato-alquiler'
}

export function getContratoAlquilerSolicitarHref(ciudadSlug?: string | null): string {
  return `/gestoria/solicitar/${getContratoAlquilerSolicitarSlug(ciudadSlug)}`
}
