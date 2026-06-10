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
  'venta-completa': pick(1, 4, 13),
  'venta-completa-valencia': pick(3, 12, 8),
  'venta-completa-madrid': pick(2, 13, 7),
  'venta-completa-barcelona': pick(1, 14, 6),
  'venta-completa-sevilla': pick(4, 15, 3),
  'venta-completa-malaga': pick(5, 8, 12),
  'venta-completa-salamanca': pick(10, 11, 2),
  'venta-completa-valladolid': pick(11, 7, 13),
  'asesoramiento-arras': pick(2, 14, 6),
  'due-diligence': pick(5, 11, 4),
  'due-diligence-madrid': pick(2, 5, 13),
  'due-diligence-barcelona': pick(1, 5, 14),
  'due-diligence-valencia': pick(3, 11, 4),
  'due-diligence-sevilla': pick(4, 15, 5),
  'revision-arras': pick(2, 6, 14),
  'revision-alquiler': pick(3, 7, 9),
  'contrato-ilegal': pick(7, 2, 6),
  'asesoria-compra': pick(4, 11, 8),
  'ayuda-propietarios': pick(3, 9, 15),
  'contrato-compraventa': pick(1, 8, 13),
  'hub-barcelona': pick(1, 14, 6),
  'hub-madrid': pick(2, 13, 7),
  'hub-valencia': pick(3, 12, 9),
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
