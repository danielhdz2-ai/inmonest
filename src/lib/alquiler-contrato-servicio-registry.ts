import {
  CONTRATO_ALQUILER_SERVICIO_BLOQUES,
  CONTRATO_ALQUILER_SERVICIO_PRECIO,
  type ContratoAlquilerServicioBloque,
} from '@/lib/contrato-alquiler-servicio-content'
import { ALQUILER_HABITACION_PRECIO } from '@/lib/alquiler-habitacion-ciudad-data'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type AlquilerContratoModuloVariant = 'lau' | 'temporada' | 'habitacion'

export type AlquilerContratoServicioMeta = {
  variant: AlquilerContratoModuloVariant
  precio: number
  bloques: ContratoAlquilerServicioBloque[]
  nav: { id: string; label: string }[]
  sectionId: string
  eyebrow: string
  heading: string
  introSuffix: string
  idPrefix: string
  overlayProductLabel: string
  ctaLabel: string
}

const TEMPORADA_PRECIO = getPrecioServicio('alquiler-temporada') ?? 165

function mergeBlock(
  blocks: ContratoAlquilerServicioBloque[],
  id: string,
  patch: Partial<ContratoAlquilerServicioBloque>,
): ContratoAlquilerServicioBloque[] {
  return blocks.map((b) => (b.id === id ? { ...b, ...patch } : b))
}

function withPrecioInBlocks(blocks: ContratoAlquilerServicioBloque[], precio: number): ContratoAlquilerServicioBloque[] {
  const p = String(precio)
  return blocks.map((b) => {
    let titulo = b.titulo
    if (b.id === 'contratacion') {
      titulo = `Contratas el servicio — ${p} € IVA incluido`
    }
    const incluye = b.incluye.map((line) =>
      line.includes('145') && precio !== CONTRATO_ALQUILER_SERVICIO_PRECIO
        ? line.replace(String(CONTRATO_ALQUILER_SERVICIO_PRECIO), p)
        : line,
    )
    return { ...b, titulo, incluye }
  })
}

function buildTemporadaBlocks(): ContratoAlquilerServicioBloque[] {
  let blocks = structuredClone(CONTRATO_ALQUILER_SERVICIO_BLOQUES)
  blocks = mergeBlock(blocks, 'llamada-gestor', {
    intro:
      'En menos de 24 horas un gestor inmobiliario real entiende tu caso: duración del arrendamiento, causa de temporalidad (trabajo, estudios, reforma…), renta, fianza y si conviene temporada frente a LAU habitual.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Validamos que la causa de temporalidad sea real y acreditable — no basta con poner “temporal” en el título.',
      'Repasamos duración (meses), renta, fianza, inventario y entrega del inmueble.',
      'Resolvemos dudas sobre precio cerrado, plazos y documentación.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento temporada vs LAU y Ley de Vivienda',
      '100 % online — válido en toda España',
    ],
    imagenAlt: 'Llamada con gestor para contrato de alquiler por temporada',
  })
  blocks = mergeBlock(blocks, 'documentacion', {
    intro:
      'Centralizamos datos del arrendador, inquilino, inmueble y la causa de temporalidad. Adjuntas todo en el panel o lo envías al gestor; te indicamos qué prueba documental refuerza el contrato.',
    pasos: [
      'Datos de las partes (DNI/CIF, domicilio, contacto).',
      'Dirección del inmueble, renta, fianza, fechas y motivo temporal (contrato laboral, matrícula, etc.).',
      'Inventario y estado del inmueble si va amueblado.',
      'Documentación que acredite la causa de temporalidad cuando proceda.',
    ],
    incluye: [
      'Checklist temporada en el panel',
      'Subida segura de documentos o envío al gestor',
      'Recordatorios hasta completar el 100 %',
      'Sin desplazamientos a ninguna oficina',
    ],
  })
  blocks = mergeBlock(blocks, 'redaccion', {
    titulo: 'El gestor redacta el contrato de temporada y el inventario',
    intro:
      'Con la documentación completa, redactamos el arrendamiento temporal con causa justificada, cláusulas sin prórroga LAU automática, renta, fianza, obras e impago conforme a la normativa.',
    pasos: [
      'Redacción personalizada — no plantilla genérica.',
      'Causa de temporalidad descrita con claridad jurídica.',
      'Cláusulas de duración, fin del contrato y entrega del inmueble.',
      'Anexo de inventario cuando el piso va amueblado.',
    ],
    incluye: [
      'Contrato de alquiler por temporada',
      'Inventario detallado como anexo si aplica',
      'Cláusulas revisadas por gestor inmobiliario',
      'Seguimiento visible en el panel (“En elaboración”)',
    ],
    imagenAlt: 'Redacción del contrato de alquiler por temporada',
  })
  blocks = mergeBlock(blocks, 'borrador', {
    intro:
      'Recibes el PDF borrador por panel y email. Tu gestor explica duración, causa temporal, fianza y rescisión antes de firmar — y ajusta el texto hasta que ambas partes estén conformes.',
    pasos: [
      'Envío del borrador de temporada + inventario en PDF.',
      'Revisión cláusula a cláusula por WhatsApp, llamada o videollamada.',
      'Rondas de ajuste incluidas en el precio cerrado.',
      'Orientación sobre firma digital FIRMACERT (eIDAS) si lo preferís.',
    ],
    incluye: [
      'Revisiones del borrador antes de la firma definitiva',
      'Asesoramiento en cláusulas no estándar',
      'PDF firmable digitalmente',
      'Respuesta ágil en horario laborable',
    ],
  })
  blocks = mergeBlock(blocks, 'fianza', {
    kicker: 'Paso 6',
    titulo: 'Fianza, entrega de llaves y fin del plazo temporal',
    intro:
      'El contrato recoge renta, fianza y condiciones de devolución del inmueble al terminar la temporada. Te orientamos sobre garantías y plazos para evitar que un LAU disfrazado anule la temporalidad.',
    pasos: [
      'Cláusulas de fianza y gastos redactadas con claridad.',
      'Protocolo de entrega y devolución (estado, inventario, llaves).',
      'Recordatorio de fin de contrato y prórrogas no automáticas LAU.',
      'Dudas de última hora resueltas antes de la entrada.',
    ],
    incluye: [
      'Texto alineado con arrendamiento temporal válido',
      'Orientación práctica sobre fianza y garantías',
      'Contrato listo para firmar entre las partes',
      'Soporte post-entrega breve para dudas de ejecución',
    ],
    imagenAlt: 'Fianza y entrega en alquiler por temporada',
  })
  blocks = mergeBlock(blocks, 'siempre-online', {
    intro:
      'No enviamos un Word y desaparecemos. Tu gestor acompaña todo el trámite por teléfono, WhatsApp y panel: documentos, mensajes, estado del expediente y entrega del contrato firmable — sin citas presenciales obligatorias.',
    incluye: [
      'Trámite 100 % online en toda España',
      'Un solo gestor conoce tu temporada al detalle',
      'Asesoramiento personalizado, no plantillas genéricas',
      'Disponibilidad para dudas en cada fase',
    ],
    imagenAlt: 'Gestor Inmonest — alquiler por temporada online',
  })
  return withPrecioInBlocks(blocks, TEMPORADA_PRECIO)
}

function buildHabitacionBlocks(): ContratoAlquilerServicioBloque[] {
  let blocks = structuredClone(CONTRATO_ALQUILER_SERVICIO_BLOQUES)
  blocks = mergeBlock(blocks, 'llamada-gestor', {
    intro:
      'En menos de 24 horas un gestor entiende tu caso: habitación concreta, zonas comunes, convivencia, renta, fianza y duración. El alquiler de habitación se rige por el Código Civil, no por la LAU de vivienda íntegra — te lo explicamos sin jerga.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos propietario vs inquilino, normas de convivencia y mascotas.',
      'Detectamos cláusulas sensibles: fianza, preaviso, uso de cocina/baño, visitas.',
      'Resolvemos dudas sobre precio cerrado y documentación.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento Código Civil y convivencia',
      '100 % online — válido en toda España',
    ],
    imagenAlt: 'Llamada con gestor para contrato de alquiler de habitación',
  })
  blocks = mergeBlock(blocks, 'documentacion', {
    intro:
      'Centralizamos datos de propietario, inquilino, habitación y vivienda compartida. Puedes adjuntar todo en el panel o enviarlo al gestor; te indicamos qué falta en un checklist específico de habitación.',
    pasos: [
      'Datos de las partes (DNI, contacto).',
      'Dirección, habitación arrendada, renta, fianza y fecha de inicio.',
      'Normas de convivencia acordadas (horarios, limpieza, visitas).',
      'Fotos o descripción del estado de la habitación y zonas comunes si aplica.',
    ],
    incluye: [
      'Checklist habitación en el panel',
      'Subida segura de documentos o envío al gestor',
      'Recordatorios de lo pendiente',
      'Sin desplazamientos a ninguna oficina',
    ],
  })
  blocks = mergeBlock(blocks, 'redaccion', {
    titulo: 'El gestor redacta el contrato de habitación',
    intro:
      'Redactamos el arrendamiento de habitación con cláusulas de convivencia válidas, renta, fianza, duración, preaviso y uso de zonas comunes — adaptado al Código Civil y a tu situación real.',
    pasos: [
      'Redacción personalizada — no plantilla genérica.',
      'Normas de convivencia con validez jurídica (sin cláusulas nulas).',
      'Fianza, preaviso y causas de rescisión claras.',
      'Seguimiento visible en el panel (“En elaboración”).',
    ],
    incluye: [
      'Contrato de alquiler de habitación',
      'Cláusulas de convivencia revisadas por gestor',
      'Texto claro para propietario e inquilino',
      'Mismo gestor hasta la entrega del PDF',
    ],
    imagenAlt: 'Redacción del contrato de alquiler de habitación',
  })
  blocks = mergeBlock(blocks, 'borrador', {
    intro:
      'Recibes el PDF borrador por panel y email. Tu gestor explica convivencia, fianza, preaviso y renta antes de firmar — y ajusta el texto hasta que ambas partes estén conformes.',
    pasos: [
      'Envío del borrador en PDF.',
      'Revisión cláusula a cláusula por WhatsApp, llamada o videollamada.',
      'Rondas de ajuste incluidas en el precio cerrado.',
      'Orientación sobre firma digital FIRMACERT (eIDAS) si lo preferís.',
    ],
    incluye: [
      'Revisiones del borrador antes de la firma definitiva',
      'Asesoramiento en cláusulas no estándar',
      'PDF firmable digitalmente',
      'Respuesta ágil en horario laborable',
    ],
  })
  blocks = mergeBlock(blocks, 'fianza', {
    kicker: 'Paso 6',
    titulo: 'Fianza, preaviso y salida de la habitación',
    intro:
      'El contrato regula importe de fianza, devolución, preaviso de salida y estado de la habitación. Te orientamos para evitar retenciones abusivas o conflictos de convivencia sin base escrita.',
    pasos: [
      'Cláusula de fianza y devolución redactada con claridad.',
      'Preaviso y fecha de salida pactados.',
      'Estado de la habitación y zonas comunes al entrar y salir.',
      'Dudas de última hora resueltas antes de firmar.',
    ],
    incluye: [
      'Texto alineado con arrendamiento de habitación',
      'Orientación práctica sobre fianza (no régimen LAU íntegro)',
      'Contrato listo para firmar entre las partes',
      'Soporte post-entrega breve',
    ],
    imagenAlt: 'Fianza y preaviso en alquiler de habitación',
  })
  blocks = mergeBlock(blocks, 'siempre-online', {
    intro:
      'Tu gestor acompaña todo el trámite por teléfono, WhatsApp y panel: documentos, mensajes, estado del expediente y entrega del contrato firmable — sin citas presenciales obligatorias.',
    incluye: [
      'Trámite 100 % online en toda España',
      'Un solo gestor conoce tu habitación al detalle',
      'Asesoramiento personalizado, no plantillas genéricas',
      'Disponibilidad para dudas en cada fase',
    ],
    imagenAlt: 'Gestor Inmonest — contrato de habitación online',
  })
  return withPrecioInBlocks(blocks, ALQUILER_HABITACION_PRECIO)
}

export function getAlquilerContratoServicioMeta(variant: AlquilerContratoModuloVariant): AlquilerContratoServicioMeta {
  if (variant === 'lau') {
    const bloques = CONTRATO_ALQUILER_SERVICIO_BLOQUES
    return {
      variant,
      precio: CONTRATO_ALQUILER_SERVICIO_PRECIO,
      bloques,
      nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
      sectionId: 'como-funciona-alquiler-lau',
      eyebrow: 'Qué incluye tu contrato LAU',
      heading: 'Cómo funciona el alquiler con Inmonest, paso a paso',
      introSuffix:
        'gestor asignado, panel online, borrador LAU + inventario, firma FIRMACERT y orientación sobre la fianza.',
      idPrefix: 'lau',
      overlayProductLabel: 'Contrato alquiler LAU · Inmonest',
      ctaLabel: 'Pedir contrato LAU',
    }
  }

  if (variant === 'temporada') {
    const bloques = buildTemporadaBlocks()
    return {
      variant,
      precio: TEMPORADA_PRECIO,
      bloques,
      nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
      sectionId: 'como-funciona-alquiler-temporada',
      eyebrow: 'Qué incluye tu contrato de temporada',
      heading: 'Cómo funciona el alquiler por temporada con Inmonest, paso a paso',
      introSuffix:
        'gestor asignado, panel online, borrador con causa de temporalidad, inventario si aplica y firma FIRMACERT.',
      idPrefix: 'temporada',
      overlayProductLabel: 'Alquiler temporada · Inmonest',
      ctaLabel: 'Pedir contrato temporada',
    }
  }

  const bloques = buildHabitacionBlocks()
  return {
    variant,
    precio: ALQUILER_HABITACION_PRECIO,
    bloques,
    nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
    sectionId: 'como-funciona-alquiler-habitacion',
    eyebrow: 'Qué incluye tu contrato de habitación',
    heading: 'Cómo funciona el alquiler de habitación con Inmonest, paso a paso',
    introSuffix:
      'gestor asignado, panel online, borrador Código Civil, normas de convivencia y firma FIRMACERT.',
    idPrefix: 'habitacion',
    overlayProductLabel: 'Alquiler habitación · Inmonest',
    ctaLabel: 'Pedir contrato habitación',
  }
}

export function servicioSlugToAlquilerVariant(servicio: string): AlquilerContratoModuloVariant | null {
  if (servicio === 'contrato-alquiler') return 'lau'
  if (servicio === 'alquiler-temporada') return 'temporada'
  if (servicio === 'alquiler-habitaciones') return 'habitacion'
  return null
}
