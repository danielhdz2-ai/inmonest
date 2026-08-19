export type Testimonio = {
  id: number
  nombre: string
  ciudad: string
  servicio: string
  foto: string
  rating: number
  texto: string
  fecha: string
  ahorro?: string
}

/** Pool completo con fotos en /public/testimonios */
export const TESTIMONIOS_POOL: Testimonio[] = [
  {
    id: 1,
    nombre: 'María González',
    ciudad: 'Barcelona',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio1.jpg',
    rating: 5,
    texto:
      'Vendí mi piso en el Eixample sin agencia. El gestor me guió desde las arras hasta la firma en notaría. Me ahorré más de 12.000€ en comisiones y todo fue transparente.',
    fecha: 'Mayo 2026',
    ahorro: '12.000€',
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    ciudad: 'Madrid',
    servicio: 'Revisión contrato arras',
    foto: '/testimonios/testimonio2.avif',
    rating: 5,
    texto:
      'Iba a firmar unas arras con cláusulas abusivas que me hubieran costado 15.000€. La revisión de Inmonest detectó el problema antes de firmar. Inversión de 60€ que me salvó de un lío enorme.',
    fecha: 'Abril 2026',
  },
  {
    id: 3,
    nombre: 'Laura Martínez',
    ciudad: 'Valencia',
    servicio: 'Contrato alquiler LAU',
    foto: '/testimonios/testimonio3.jpg',
    rating: 5,
    texto:
      'Necesitaba un contrato de alquiler urgente en Ruzafa. En 48h lo tenía adaptado a la Ley de Vivienda 2026 y a la normativa valenciana. Propietario e inquilino firmamos con total tranquilidad.',
    fecha: 'Mayo 2026',
  },
  {
    id: 4,
    nombre: 'Javier López',
    ciudad: 'Sevilla',
    servicio: 'Compra completa reserva-escritura',
    foto: '/testimonios/testimonio4.jpg',
    rating: 5,
    texto:
      'Comprar mi primer piso en Triana me daba miedo por la burocracia. El acompañamiento completo fue perfecto: revisaron documentación, coordinaron con la notaría y me explicaron cada paso.',
    fecha: 'Marzo 2026',
  },
  {
    id: 5,
    nombre: 'Ana Fernández',
    ciudad: 'Málaga',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio5.jpg',
    rating: 5,
    texto:
      'Tras firmar arras en la Costa del Sol contraté el pack de Due Diligence. Detectaron derramas pendientes de 8.000€ que el vendedor no había mencionado. Pude renegociar el precio final.',
    fecha: 'Abril 2026',
    ahorro: '8.000€',
  },
  {
    id: 6,
    nombre: 'Patricia Echevarría',
    ciudad: 'Bilbao',
    servicio: 'Contrato arras penitenciales',
    foto: '/testimonios/testimonio6.jpg',
    rating: 5,
    texto:
      'En Bilbao el mercado va rápido y me presionaron para firmar arras en 24h. Inmonest redactó el contrato con cláusulas justas y revisó la plusvalía foral antes de que firmara.',
    fecha: 'Mayo 2026',
  },
  {
    id: 7,
    nombre: 'Roberto Sánchez',
    ciudad: 'Zaragoza',
    servicio: 'Revisión contrato alquiler',
    foto: '/testimonios/testimonio8.jpg',
    rating: 5,
    texto:
      'El contrato que me pasó el propietario tenía una cláusula de subida de renta ilegal. La revisión legal lo corrigió y negociamos condiciones justas. Muy recomendable en Zaragoza.',
    fecha: 'Abril 2026',
  },
  {
    id: 8,
    nombre: 'Miguel Torres',
    ciudad: 'Alicante',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio9.jpg',
    rating: 5,
    texto:
      'Vendí en Playa de San Juan a un comprador británico. Inmonest gestionó la documentación, la cédula de habitabilidad y la coordinación con notaría. 687€ frente a los 9.000€ de una agencia.',
    fecha: 'Mayo 2026',
    ahorro: '9.000€',
  },
  {
    id: 9,
    nombre: 'Isabel Bosch',
    ciudad: 'Palma',
    servicio: 'Contrato alquiler LAU',
    foto: '/testimonios/testimonio10.jpg',
    rating: 5,
    texto:
      'Alquilar en Palma con normativa balear no es sencillo. El contrato incluía las cláusulas de zona tensionada y el depósito en IBAVI. Entrega en 48h y sin sorpresas legales.',
    fecha: 'Mayo 2026',
  },
  {
    id: 10,
    nombre: 'Elena Castro',
    ciudad: 'Salamanca',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio12.jpg',
    rating: 5,
    texto:
      'Vendí mi piso del casco histórico a un comprador universitario. El gestor conocía los requisitos de Castilla y León y me acompañó hasta escritura sin pagar comisión a ninguna agencia.',
    fecha: 'Abril 2026',
    ahorro: '6.500€',
  },
  {
    id: 11,
    nombre: 'David Herrera',
    ciudad: 'Valladolid',
    servicio: 'Compra completa reserva-escritura',
    foto: '/testimonios/testimonio16.avif',
    rating: 5,
    texto:
      'Compré en Valladolid desde Madrid y no conocía el proceso local. Inmonest revisó arras, documentación del Registro y coordinó la firma. Servicio impecable de principio a fin.',
    fecha: 'Marzo 2026',
  },
  {
    id: 12,
    nombre: 'Sandra Prieto',
    ciudad: 'Valencia',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio4.jpg',
    rating: 5,
    texto:
      'Ya tenía comprador en Benimaclet y solo necesitaba gestión legal. Por 687€ me hicieron arras, documentación de la Comunitat Valenciana y seguimiento hasta notaría. Mucho más barato que una inmobiliaria.',
    fecha: 'Mayo 2026',
    ahorro: '11.000€',
  },
  {
    id: 13,
    nombre: 'Francisco Mena',
    ciudad: 'Madrid',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio9.jpg',
    rating: 5,
    texto:
      'Vendí en Chamberí de particular a particular. El gestor asignado estuvo disponible por WhatsApp durante todo el proceso. Contratos personalizados y cero comisiones sobre la venta.',
    fecha: 'Mayo 2026',
    ahorro: '14.000€',
  },
  {
    id: 14,
    nombre: 'Cristina Vidal',
    ciudad: 'Barcelona',
    servicio: 'Asesoramiento arras venta',
    foto: '/testimonios/testimonio5.jpg',
    rating: 5,
    texto:
      'Tenía dudas sobre las arras de un piso en Gràcia. Me asesoraron sobre penitenciales, plazos y documentación antes de comprometerme. Profesionales y muy claros en el trato.',
    fecha: 'Abril 2026',
  },
  {
    id: 15,
    nombre: 'Antonio Gil',
    ciudad: 'Sevilla',
    servicio: 'Venta completa reserva-escritura',
    foto: '/testimonios/testimonio8.jpg',
    rating: 5,
    texto:
      'En Sevilla las agencias piden comisiones abusivas. Con Inmonest pagué tarifa plana y tuve gestor propio hasta escritura. Vendí en Nervión sin estrés y sin intermediarios.',
    fecha: 'Mayo 2026',
    ahorro: '7.800€',
  },
  {
    id: 16,
    nombre: 'Laura Martínez',
    ciudad: 'Valencia',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio3.jpg',
    rating: 5,
    texto:
      'Compré un piso de particular en Ruzafa y contraté el Due Diligence tras las arras. Detectaron una derrama de 6.200€ que el vendedor no había mencionado y una anotación registral pendiente. Renegocié 8.000€ de descuento antes de escriturar. Los 350€ fueron la mejor inversión de la compra.',
    fecha: 'Mayo 2026',
    ahorro: '8.000€',
  },
  {
    id: 17,
    nombre: 'Pablo Iglesias',
    ciudad: 'Madrid',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio2.avif',
    rating: 5,
    texto:
      'En Chamberí iba a comprar sin agencia y el vendedor me presionaba para escriturar rápido. El gestor de Inmonest revisó la nota simple y encontró deudas de comunidad de 4.500€. Pude exigir que se liquidaran antes de firmar. Sin ese informe habría heredado el problema.',
    fecha: 'Abril 2026',
    ahorro: '4.500€',
  },
  {
    id: 18,
    nombre: 'Marta Solé',
    ciudad: 'Barcelona',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio1.jpg',
    rating: 5,
    texto:
      'Compraventa entre particulares en Gràcia. El pack de Due Diligence verificó la cédula de la Generalitat, la ITE del edificio y cargas en el Registro. Había una licencia de obra sin legalizar que el vendedor debía regularizar. Me ahorré un lío legal enorme por 350€.',
    fecha: 'Mayo 2026',
  },
  {
    id: 19,
    nombre: 'Jorge Medina',
    ciudad: 'Sevilla',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio4.jpg',
    rating: 5,
    texto:
      'Tras firmar arras en Triana contraté la revisión documental completa. El informe detectó el IEE caducado y deudas de IBI del anterior propietario. El vendedor las regularizó antes de notaría. Comprar con esa tranquilidad no tiene precio.',
    fecha: 'Abril 2026',
  },
  {
    id: 20,
    nombre: 'Iñaki Aguirre',
    ciudad: 'Bilbao',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio6.jpg',
    rating: 5,
    texto:
      'Compré un piso de particular en Indautxu y el vendedor me presionaba para escriturar en dos semanas. El gestor de Inmonest revisó la nota simple, la plusvalía foral de Bizkaia y deudas de comunidad de 3.800€ que no figuraban en el anuncio. Pude renegociar antes de firmar. Los 350€ me ahorraron un problema enorme.',
    fecha: 'Mayo 2026',
    ahorro: '3.800€',
  },
  {
    id: 21,
    nombre: 'Carmen Ruiz',
    ciudad: 'Málaga',
    servicio: 'Due diligence pre-compra',
    foto: '/testimonios/testimonio10.jpg',
    rating: 5,
    texto:
      'Encontré piso en Teatinos por Milanuncios, sin agencia. Tras las arras contraté el Due Diligence y detectaron un IEE desfavorable y una derrama de fachada de 5.400€. El gestor me explicó cada punto y negocié 7.000€ de descuento. Comprar de particular con asesoría legal es imprescindible en Málaga.',
    fecha: 'Mayo 2026',
    ahorro: '7.000€',
  },
  {
    id: 22,
    nombre: 'Lucía Paredes',
    ciudad: 'Madrid',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio3.jpg',
    rating: 5,
    texto:
      'Alquilo tres habitaciones en un piso en Moncloa. Antes tenía acuerdos verbales y un lío con la fianza de la última inquilina. Inmonest me hizo un contrato por habitación con normas de convivencia claras. El asesor me explicó todo antes de firmar. Por 145€ tengo tranquilidad en cada entrada nueva.',
    fecha: 'Mayo 2026',
  },
  {
    id: 23,
    nombre: 'Marc Vidal',
    ciudad: 'Barcelona',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio1.jpg',
    rating: 5,
    texto:
      'Tengo un piso de 4 habitaciones en Gràcia. Contraté el servicio para regularizar a los tres inquilinos con contratos independientes. El gestor incluyó normas de cocina, visitas y limpieza que antes eran discusiones constantes. Profesional y rápido.',
    fecha: 'Abril 2026',
  },
  {
    id: 24,
    nombre: 'Antonio Molina',
    ciudad: 'Sevilla',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio4.jpg',
    rating: 5,
    texto:
      'Alquilo dos habitaciones en Triana a particulares. El gestor redactó contratos separados con normas de convivencia, fianza y preaviso de salida bien definidos. Me explicó que no es un contrato LAU de vivienda completa. Imprescindible para propietarios en Sevilla.',
    fecha: 'Junio 2026',
  },
  {
    id: 25,
    nombre: 'Patricia Gómez',
    ciudad: 'Málaga',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio8.jpg',
    rating: 5,
    texto:
      'Tengo un piso compartido en Teatinos para estudiantes de la UMA. Inmonest preparó tres contratos con entradas y salidas independientes, normas de cocina y limpieza. Por 145€ evité repetir los problemas de fianza que tuve con la inquilina anterior.',
    fecha: 'Junio 2026',
  },
  {
    id: 26,
    nombre: 'Ane López',
    ciudad: 'Bilbao',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio6.jpg',
    rating: 5,
    texto:
      'Comparto piso en Indautxu y alquilaba la tercera habitación sin contrato escrito. El asesor me preparó uno conforme al Código Civil con normas de visitas, cocina y resolución por impago. Tranquilidad total ante la alta demanda de habitaciones en Bilbao.',
    fecha: 'Junio 2026',
  },
  {
    id: 27,
    nombre: 'Laura Martínez',
    ciudad: 'Valencia',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio3.jpg',
    rating: 5,
    texto:
      'Alquilo dos habitaciones en Ruzafa a particulares. Inmonest me preparó contratos independientes con normas de convivencia, fianza y preaviso de salida. El gestor me aclaró la diferencia con un contrato LAU de piso completo. Muy recomendable en Valencia.',
    fecha: 'Junio 2026',
  },
  {
    id: 28,
    nombre: 'Javier Ortega',
    ciudad: 'Zaragoza',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio7.jpg',
    rating: 5,
    texto:
      'Tengo un piso de tres habitaciones cerca de Delicias para estudiantes. Contraté Inmonest para formalizar cada alquiler por separado. Por 145€ tengo contratos claros sobre cocina, visitas e impagos. Profesional y rápido.',
    fecha: 'Junio 2026',
  },
  {
    id: 29,
    nombre: 'María Suárez',
    ciudad: 'Asturias',
    servicio: 'Contrato alquiler habitación',
    foto: '/testimonios/testimonio9.jpg',
    rating: 5,
    texto:
      'Alquilo una habitación en Oviedo en piso compartido. Antes solo tenía mensajes de WhatsApp con el inquilino. El asesor redactó un contrato conforme al Código Civil con normas de limpieza y duración. Tranquilidad total.',
    fecha: 'Junio 2026',
  },
]

function pick(...ids: number[]): Testimonio[] {
  return ids.map((id) => TESTIMONIOS_POOL.find((t) => t.id === id)!).filter(Boolean)
}

/** Conjuntos distintos por landing — cada página muestra testimonios diferentes */
export const TESTIMONIOS_POR_LANDING: Record<string, Testimonio[]> = {
  home: pick(1, 2, 3, 4),
  gestoria: pick(2, 5, 8, 14),
  'vender-casa': pick(1, 13, 15),
  'vender-piso-sin-agencia': pick(4, 10, 12),
  'vender-sin-inmobiliaria': pick(5, 8, 11),
  'venta-completa': pick(1, 13, 12),
  'venta-completa-valencia': pick(12, 13, 1),
  'venta-completa-madrid': pick(13, 1, 10),
  'venta-completa-barcelona': pick(1, 13, 12),
  'venta-completa-sevilla': pick(15, 1, 13),
  'venta-completa-malaga': pick(8, 12, 10),
  'venta-completa-salamanca': pick(10, 13, 1),
  'venta-completa-valladolid': pick(10, 13, 1),
  'asesoramiento-arras': pick(2, 14, 6),
  'due-diligence': pick(5, 16, 17),
  'due-diligence-madrid': pick(17, 5, 18),
  'due-diligence-barcelona': pick(18, 5, 17),
  'due-diligence-valencia': pick(16, 5, 17),
  'due-diligence-sevilla': pick(19, 5, 16),
  'due-diligence-malaga': pick(5, 21, 17),
  'due-diligence-bilbao': pick(20, 6, 17),
  'due-diligence-zaragoza': pick(5, 16, 17),
  'due-diligence-coruna': pick(16, 5, 17),
  'pack-arras-documental-madrid': pick(17, 2, 6),
  'pack-arras-documental-barcelona': pick(18, 2, 17),
  'pack-arras-documental-valencia': pick(16, 2, 27),
  'revision-correccion-arras': pick(2, 6, 14),
  'revision-arras': pick(2, 6, 14),
  'revision-alquiler': pick(3, 7, 9),
  'alquiler-habitacion': pick(24, 25, 26),
  'alquiler-habitacion-madrid': pick(22, 24, 3),
  'alquiler-habitacion-barcelona': pick(23, 25, 3),
  'alquiler-habitacion-sevilla': pick(24, 19, 22),
  'alquiler-habitacion-malaga': pick(25, 21, 8),
  'alquiler-habitacion-bilbao': pick(26, 20, 6),
  'alquiler-habitacion-valencia': pick(27, 16, 12),
  'alquiler-habitacion-zaragoza': pick(28, 7, 11),
  'alquiler-habitacion-asturias': pick(29, 10, 22),
  'prestamo-particulares': pick(2, 14, 6),
  'prestamo-particulares-madrid': pick(13, 2, 6),
  'prestamo-particulares-barcelona': pick(1, 14, 8),
  'prestamo-particulares-valencia': pick(3, 12, 16),
  'prestamo-particulares-sevilla': pick(4, 15, 19),
  'prestamo-particulares-malaga': pick(5, 21, 25),
  'prestamo-particulares-bilbao': pick(6, 20, 26),
  'prestamo-particulares-zaragoza': pick(7, 11, 18),
  'prestamo-particulares-mallorca': pick(8, 22, 24),
  'prestamo-particulares-valladolid': pick(9, 17, 23),
  'contrato-ilegal': pick(7, 2, 6),
  'asesoria-compra': pick(4, 11, 8),
  'asesoria-compra-madrid': pick(4, 11, 8),
  'asesoria-compra-barcelona': pick(18, 5, 17),
  'asesoria-compra-valencia': pick(16, 5, 17),
  'asesoria-compra-sevilla': pick(19, 5, 16),
  'asesoria-compra-malaga': pick(5, 21, 17),
  'asesoria-compra-alicante': pick(8, 5, 3),
  'asesoria-compra-zaragoza': pick(7, 11, 4),
  'asesoria-compra-valladolid': pick(11, 4, 8),
  'asesoria-compra-mallorca': pick(9, 5, 11),
  'asesoria-compra-bilbao': pick(20, 6, 17),
  'asesoria-compra-coruna': pick(16, 5, 17),
  'asesoria-compra-murcia': pick(7, 13, 4),
  'asesoria-compra-pamplona': pick(11, 6, 8),
  'compra-parking-trastero': pick(4, 11, 8),
  'ayuda-propietarios': pick(3, 9, 15),
  'contrato-compraventa': pick(1, 8, 13),
  'contrato-alquiler': pick(3, 7, 9, 26),
  'contrato-arras': pick(2, 6, 14, 20),
  'arras-penitenciales': pick(2, 6, 14, 20),
  'arras-confirmatorias': pick(2, 14, 6),
  'arras-parking-garage': pick(2, 6, 14),
  'acompanamiento-reserva-arras': pick(2, 8, 13),
  'rescision-alquiler': pick(7, 3, 9),
  'alquiler-habitaciones': pick(24, 25, 26),
  'alquiler-local-comercial': pick(3, 7, 9),
  'alquiler-local-comercial-madrid': pick(2, 13, 7),
  'alquiler-local-comercial-barcelona': pick(1, 14, 6),
  'alquiler-local-comercial-valencia': pick(12, 16, 9),
  'alquiler-local-comercial-sevilla': pick(4, 15, 5),
  'alquiler-local-comercial-malaga': pick(5, 8, 12),
  'alquiler-local-comercial-bilbao': pick(6, 2, 14),
  'alquiler-local-comercial-zaragoza': pick(7, 11, 18),
  'alquiler-local-comercial-alicante': pick(8, 5, 3),
  'alquiler-opcion-compra': pick(4, 11, 8),
  'alquiler-garaje-trastero': pick(4, 11, 8),
  'compra-completa-reserva-escritura': pick(4, 11, 8),
  'compra-completa-parking-trastero': pick(4, 11, 8),
  'pack-revision-reserva-alquiler': pick(7, 3, 9),
  'hub-barcelona': pick(1, 14, 6),
  'hub-madrid': pick(2, 13, 7),
  'hub-valencia': pick(12, 16, 9),
  'hub-sevilla': pick(4, 15, 5),
  'hub-malaga': pick(5, 8, 12),
  'hub-bilbao': pick(6, 2, 14),
  'hub-palma': pick(9, 3, 12),
  'hub-zaragoza': pick(7, 11, 4),
  'hub-alicante': pick(8, 5, 3),
}

export const TESTIMONIOS_DEFAULT = TESTIMONIOS_POR_LANDING.home

/** @deprecated Usar getTestimonios() — se mantiene por compatibilidad */
export const TESTIMONIOS = TESTIMONIOS_DEFAULT

export type TestimoniosOptions = {
  landing?: string
  ciudad?: string
}

export function getTestimonios({ landing, ciudad }: TestimoniosOptions = {}): Testimonio[] {
  if (landing && TESTIMONIOS_POR_LANDING[landing]?.length) {
    return TESTIMONIOS_POR_LANDING[landing]
  }

  if (ciudad) {
    const locales = TESTIMONIOS_POOL.filter(
      (t) => t.ciudad.toLowerCase() === ciudad.toLowerCase(),
    )
    if (locales.length >= 2) return locales.slice(0, 4)
    if (locales.length === 1) {
      const extras = TESTIMONIOS_DEFAULT.filter((t) => t.id !== locales[0].id).slice(0, 2)
      return [locales[0], ...extras]
    }
  }

  return TESTIMONIOS_DEFAULT
}

export function hubTestimoniosLanding(slug: string): string {
  return `hub-${slug}`
}
