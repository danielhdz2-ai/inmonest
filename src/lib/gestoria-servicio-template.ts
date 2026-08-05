import { LANDINGS_POR_CIUDAD, getNombreCiudad } from './gestoria-ciudades-inventario'
import { VENTA_CIUDAD_IMAGES, getCiudadCtaImage } from './gestoria-images'

/** Landing por ciudad asociada a cada slug de /gestoria/[servicio] */
export const SERVICIO_CIUDAD_LANDING: Record<string, string> = {
  'arras-penitenciales': 'contrato-arras',
  'arras-confirmatorias': 'contrato-arras',
  'arras-parking-garage': 'contrato-arras',
  'acompanamiento-reserva-arras': 'contrato-arras',
  'contrato-alquiler': 'contrato-alquiler',
  'rescision-alquiler': 'contrato-alquiler',
  'pack-revision-reserva-alquiler': 'contrato-alquiler',
  'alquiler-habitaciones': 'contrato-alquiler-habitacion',
  'prestamo-particulares': 'prestamo-particulares',
  'compra-completa-reserva-escritura': 'asesoria-compra',
  'compra-completa-parking-trastero': 'gestoria-hub',
  'alquiler-local-comercial': 'gestoria-hub',
  'alquiler-garaje-trastero': 'gestoria-hub',
  'alquiler-opcion-compra': 'gestoria-hub',
  'venta-completa-reserva-escritura': 'venta-completa',
  'pack-due-diligence-precompra': 'due-diligence',
  'asesoramiento-arras-venta': 'contrato-arras',
  'revision-contrato-arras': 'contrato-arras',
  'revision-contrato-alquiler': 'contrato-alquiler',
  'contrato-compraventa': 'gestoria-hub',
  'contrato-ilegal': 'gestoria-hub',
  'ayuda-propietarios': 'gestoria-hub',
}

/** Clave de testimonios en TESTIMONIOS_POR_LANDING */
export const SERVICIO_TESTIMONIO_LANDING: Record<string, string> = {
  'arras-penitenciales': 'contrato-arras',
  'arras-confirmatorias': 'contrato-arras',
  'arras-parking-garage': 'contrato-arras',
  'acompanamiento-reserva-arras': 'asesoramiento-arras',
  'contrato-alquiler': 'contrato-alquiler',
  'rescision-alquiler': 'revision-alquiler',
  'pack-revision-reserva-alquiler': 'revision-alquiler',
  'alquiler-habitaciones': 'alquiler-habitacion',
  'alquiler-local-comercial': 'contrato-alquiler',
  'alquiler-opcion-compra': 'asesoria-compra',
  'prestamo-particulares': 'prestamo-particulares',
  'alquiler-garaje-trastero': 'compra-parking-trastero',
  'compra-completa-reserva-escritura': 'asesoria-compra',
  'compra-completa-parking-trastero': 'compra-parking-trastero',
  'venta-completa-reserva-escritura': 'venta-completa',
  'pack-due-diligence-precompra': 'due-diligence',
  'asesoramiento-arras-venta': 'asesoramiento-arras',
  'revision-contrato-arras': 'revision-arras',
  'revision-contrato-alquiler': 'revision-alquiler',
  'contrato-compraventa': 'contrato-compraventa',
  'contrato-ilegal': 'contrato-ilegal',
  'ayuda-propietarios': 'ayuda-propietarios',
}

export function getTestimonioLandingForServicio(servicio: string): string {
  return SERVICIO_TESTIMONIO_LANDING[servicio] ?? servicio
}

export type CiudadServicioLink = {
  slug: string
  nombre: string
  href: string
  imageSrc: string
  imageAlt: string
}

function getCiudadImage(slug: string, nombre: string, landingId: string): { src: string; alt: string } {
  if (VENTA_CIUDAD_IMAGES[slug]) {
    return VENTA_CIUDAD_IMAGES[slug]
  }
  const img = getCiudadCtaImage(slug)
  return { src: img.src, alt: `${nombre} — ${landingId.replace(/-/g, ' ')} Inmonest` }
}

export function getCiudadesParaServicio(servicio: string): CiudadServicioLink[] {
  const landingId = SERVICIO_CIUDAD_LANDING[servicio] ?? 'gestoria-hub'
  const landing = LANDINGS_POR_CIUDAD.find((l) => l.id === landingId)
  if (!landing) return []

  return landing.ciudades.map((slug) => {
    const nombre = getNombreCiudad(slug)
    const img = getCiudadImage(slug, nombre, landingId)
    return {
      slug,
      nombre,
      href: landing.href(slug),
      imageSrc: img.src,
      imageAlt: img.alt,
    }
  })
}

export function getCiudadSectionMeta(servicio: string): { title: string; subtitle: string } {
  const landingId = SERVICIO_CIUDAD_LANDING[servicio] ?? 'gestoria-hub'
  const landing = LANDINGS_POR_CIUDAD.find((l) => l.id === landingId)

  const titles: Record<string, string> = {
    'contrato-arras': 'Contrato de arras en tu ciudad',
    'contrato-alquiler': 'Contrato de alquiler en tu ciudad',
    'contrato-alquiler-habitacion': 'Alquiler de habitación en tu ciudad',
    'prestamo-particulares': 'Préstamo entre particulares en tu ciudad',
    'asesoria-compra': 'Asesoría de compra en tu ciudad',
    'venta-completa': 'Vende tu piso sin agencia en tu ciudad',
    'due-diligence': 'Due diligence pre-compra en tu ciudad',
    'gestoria-hub': 'Gestoría inmobiliaria en tu ciudad',
  }

  return {
    title: titles[landingId] ?? `${landing?.nombre ?? 'Servicio'} en tu ciudad`,
    subtitle: 'Información y acompañamiento adaptados a cada mercado local',
  }
}

export type GestorServicioCopy = {
  rol: string
  intro: string[]
  bio: string
  bullets: string[]
}

const DEFAULT_GESTOR: GestorServicioCopy = {
  rol: 'Gestor inmobiliario · Contratos entre particulares',
  intro: [
    'Inmonest es una <strong>gestoría inmobiliaria digital</strong> para particulares. No somos una agencia: redactamos contratos con validez jurídica y te acompañamos hasta que firmes con tranquilidad.',
    'Cuando contratas, se te asigna un <strong>gestor especializado</strong> que revisa tu caso, resuelve dudas por teléfono o WhatsApp y adapta el documento a tu operación real.',
  ],
  bio: 'Acompaña a particulares en compraventas, alquileres y contratos inmobiliarios. Conoce la LAU, los plazos de arras y la documentación que exige cada comunidad autónoma.',
  bullets: ['Contratos personalizados', 'Asesoramiento pre y post firma', 'Disponible por WhatsApp y teléfono'],
}

export function getGestorCopy(servicio: string, servicioNombre: string): GestorServicioCopy {
  if (servicio === 'prestamo-particulares') {
    return {
      rol: 'Gestor inmobiliario · Préstamos entre particulares',
      intro: [
        'Inmonest es una <strong>gestoría inmobiliaria digital</strong> para particulares. Te ayudamos a formalizar préstamos privados con validez jurídica y fiscal.',
        'Cuando contratas, se te asigna un <strong>gestor especializado en financiación entre particulares</strong>. Te explica el Modelo 600, cómo evitar que Hacienda califique la operación como donación y qué hacer si el prestatario deja de pagar.',
      ],
      bio: 'Acompaña a particulares que formalizan préstamos privados entre familiares, amigos o inversores. Conoce la tributación del Modelo 600 y la reclamación judicial por impago.',
      bullets: ['Préstamos familiares e inversores', 'Orientación fiscal Modelo 600', 'Asesoramiento pre y post firma'],
    }
  }

  if (servicio.includes('due-diligence') || servicio.includes('diligence')) {
    return {
      ...DEFAULT_GESTOR,
      rol: 'Gestor inmobiliario · Due diligence pre-compra',
      intro: [
        DEFAULT_GESTOR.intro[0]!,
        `En <strong>${servicioNombre.toLowerCase()}</strong>, tu gestor revisa nota simple, cargas, licencias y documentación antes de que firmes arras o escritura.`,
      ],
      bio: 'Experto en verificación documental pre-compra: Registro, ITE, cargas hipotecarias y deudas con comunidad.',
      bullets: ['Informe documental completo', 'Detección de cargas ocultas', 'Asesoramiento antes de arras'],
    }
  }

  if (servicio.includes('venta-completa')) {
    return {
      ...DEFAULT_GESTOR,
      rol: 'Gestor inmobiliario · Venta entre particulares',
      intro: [
        DEFAULT_GESTOR.intro[0]!,
        `Con <strong>${servicioNombre.toLowerCase()}</strong>, tu gestor te acompaña desde la reserva hasta escritura: contratos, documentación y coordinación con notaría.`,
      ],
      bio: 'Experto en ventas entre particulares sin agencia. Gestiona arras, documentación autonómica y seguimiento hasta firma.',
      bullets: ['Gestor asignado por WhatsApp', 'Contratos de reserva y arras', 'Acompañamiento hasta escritura'],
    }
  }

  if (servicio.includes('compra')) {
    return {
      ...DEFAULT_GESTOR,
      rol: 'Gestor inmobiliario · Compras entre particulares',
      intro: [
        DEFAULT_GESTOR.intro[0]!,
        `Con <strong>${servicioNombre.toLowerCase()}</strong>, tu gestor revisa arras, documentación del vendedor y te acompaña hasta la firma en notaría.`,
      ],
      bio: `Te guía en ${servicioNombre.toLowerCase()}: verificación documental, arras y coordinación con notaría.`,
      bullets: ['Revisión de arras y reserva', 'Documentación del vendedor', 'Seguimiento hasta notaría'],
    }
  }

  if (servicio.includes('arras') || servicio.includes('reserva') || servicio === 'asesoramiento-arras-venta') {
    return {
      ...DEFAULT_GESTOR,
      rol: 'Gestor inmobiliario · Arras y compraventa',
      intro: [
        DEFAULT_GESTOR.intro[0]!,
        `Para <strong>${servicioNombre.toLowerCase()}</strong>, tu gestor revisa plazos, penitenciales vs confirmatorias, documentación registral y te orienta antes de firmar.`,
      ],
      bio: `Experto en ${servicioNombre.toLowerCase()}. Coordina arras, reserva y documentación hasta escritura si lo necesitas.`,
      bullets: ['Arras penitenciales y confirmatorias', 'Revisión documental', 'Asesoramiento hasta escritura'],
    }
  }

  if (servicio.includes('alquiler') || servicio === 'pack-revision-reserva-alquiler') {
    return {
      ...DEFAULT_GESTOR,
      rol: 'Gestor inmobiliario · Alquiler LAU',
      intro: [
        DEFAULT_GESTOR.intro[0]!,
        `En <strong>${servicioNombre.toLowerCase()}</strong>, tu gestor adapta cláusulas a la LAU, depósitos, subidas de renta y entrega del inmueble según tu caso.`,
      ],
      bio: `Especialista en ${servicioNombre.toLowerCase()}. Resuelve dudas sobre fianzas, duración del contrato y obligaciones de propietario e inquilino.`,
      bullets: ['Contratos conforme LAU', 'Cláusulas de fianza y renta', 'Resolución de dudas por WhatsApp'],
    }
  }

  return {
    ...DEFAULT_GESTOR,
    intro: [
      DEFAULT_GESTOR.intro[0]!,
      `Para <strong>${servicioNombre.toLowerCase()}</strong>, se te asigna un gestor que revisa tu caso y adapta el documento a tu situación concreta.`,
    ],
    bio: `Experto en ${servicioNombre.toLowerCase()} para particulares. Disponible por teléfono y WhatsApp para resolver dudas antes de contratar.`,
  }
}
