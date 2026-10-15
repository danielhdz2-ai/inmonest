import type { BarcelonaHabitacionBarrioConfig } from '@/lib/barcelona-alquiler-habitacion-barrios'

const NORMA: BarcelonaHabitacionBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Código Civil (habitación)',
    contenido: 'Arrendamiento de habitación en piso compartido, no LAU de vivienda íntegra.',
    bullets: ['Contrato por inquilino', 'Zonas comunes', 'Fianza pactada'],
  },
  {
    titulo: 'Suministros',
    contenido: 'Reparto de luz, agua, gas e internet por escrito.',
    bullets: ['Cuota fija', 'Impago', 'Preaviso'],
  },
  {
    titulo: 'Convivencia',
    contenido: 'Normas de visitas y ruido válidas si no son abusivas.',
    bullets: ['Horarios', 'Limpieza', 'Sin subarriendo'],
  },
]

export const BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_3 = [
  'ciutat-vella',
  'diagonal-mar',
  'vila-olimpica',
] as const

export type BarcelonaHabitacionBarrioSlugExtra3 = (typeof BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_3)[number]

export const BARCELONA_HABITACION_BARRIOS_EXTRA_3: Record<
  BarcelonaHabitacionBarrioSlugExtra3,
  BarcelonaHabitacionBarrioConfig
> = {
  'ciutat-vella': {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Contrato habitación Ciutat Vella — Gòtic, Born, Raval · 120€',
      description:
        'Habitación en Ciutat Vella: contrato Código Civil para pisos compartidos en casco antiguo (no turismo). Gòtic, Born y frontera Raval. 120 € · 48 h.',
      keywords: ['contrato habitacion ciutat vella', 'alquiler habitacion gothic quarter', 'piso compartido born'],
      ogTitle: 'Ciutat Vella: habitación residencial (no apartamento turístico)',
      ogDescription: 'Pisos compartidos en fincas estrechas — convivencia y fianza claras.',
    },
    hero: {
      badge: 'Ciutat Vella · Gòtic · Born',
      h1: 'Ciutat Vella: contrato de habitación en pisos compartidos del casco antiguo sin confundirlo con alquiler turístico',
      subtitulo:
        'En el Gòtic y el Born conviven habitaciones para larga estancia y pisos mal tipificados. El contrato debe dejar claro uso residencial de la habitación, ventilación en fincas estrechas y convivencia en cocinas mínimas.',
      anguloPropietario:
        'Protege tu piso de 3–4 habitaciones frente a subarriendo turístico encubierto: identifica la habitación arrendada y causas de resolución expresas.',
      anguloInquilino:
        'Exige inventario con humedades visibles y confirma que no compartes piso con alquiler por días ilegal.',
    },
    mercado: {
      titulo: 'Habitaciones en el casco histórico',
      intro:
        'Alta demanda de habitaciones “de verdad” frente a saturación turística; fincas antiguas con patios interiores y plantas sin ascensor.',
      rentaOrientativa: 'Habitación orientativa 450–780 € según calle y estado (2026).',
      perfilDemanda: 'Profesionales, estudiantes de larga estancia, perfiles internacionales.',
      particularidad: 'Confusión LAU / turismo / habitación: tipificación correcta en contrato.',
    },
    normativa: {
      titulo: 'Habitación en Ciutat Vella',
      intro: 'Código Civil + prohibición de uso turístico de la habitación.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Uso residencial vs turismo',
          contenido:
            'La habitación se arrienda por meses como domicilio, no por noches; subarriendo turístico sin licencia expone a sanciones.',
          bullets: ['Estancia mínima', 'Empadronamiento si se pacta', 'Ruido en escalera común'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Ciutat Vella',
      intro: 'Finca antigua compartida:',
      puntos: [
        { titulo: 'Ventilación', texto: 'Patios y huecos en anexo.' },
        { titulo: 'Fianza', texto: 'Devolución con plazo.' },
        { titulo: '120 €', texto: 'Redacción Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Ciutat Vella',
      intro: 'Prioriza:',
      bullets: ['Contrato por habitación', 'Anti-turismo encubierto', 'Inventario fotográfico'],
    },
    paraInquilino: {
      titulo: 'Inquilino Ciutat Vella',
      intro: 'Revisa:',
      bullets: ['Humedades', 'Compañeros actuales', 'LAU piso entero: /barcelona/contrato-alquiler/ciutat-vella'],
    },
    faqs: [
      { q: '¿LAU en Ciutat Vella?', a: '/barcelona/contrato-alquiler/ciutat-vella.' },
    ],
    bloqueCompradores: {
      titulo: 'Compradores en Ciutat Vella: de la habitación a la vivienda',
      intro:
        'Muchos inquilinos de habitación acaban comprando en el Gòtic o el Born. Antes de entregar arras en finca protegida o con ITE pendiente, conviene revisar documentación: no es lo mismo el contrato de habitación que la compraventa.',
      bullets: [
        'Arras penitenciales con cláusulas anti-turismo y estado real del edificio',
        'Due diligence: comunidad, cargas y licencias en casco histórico',
        'Verificar que el vendedor no mezcla uso turístico ilegal con vivienda habitual',
      ],
    },
    bloqueVendedores: {
      titulo: 'Vendedores en Ciutat Vella: alquilabas habitaciones y ahora vendes',
      intro:
        'Si has alquilado habitaciones sueltas y vas a vender el piso entero, el comprador preguntará por contratos vigentes, deudas de comunidad y posibles sanciones por usos turísticos previos.',
      bullets: [
        'Regularizar o extinguir contratos de habitación antes de la compraventa',
        'Pack vendedor: arras, documentación y coordinación con comprador',
        'Transparencia sobre inquilinos en el piso y fechas de salida',
      ],
    },
  },

  'diagonal-mar': {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato habitación Diagonal Mar — torres y Front Marítim · 120€',
      description:
        'Habitación en Diagonal Mar: contrato en pisos compartidos de gran finca, piscina comunitaria y perfiles expatriados. 120 € IVA incl.',
      keywords: ['contrato habitacion diagonal mar', 'alquiler habitacion front maritim barcelona'],
      ogTitle: 'Diagonal Mar: habitación en gran bloque (no LAU genérico)',
      ogDescription: 'Coliving junto al mar — plaza, trastero y normas de piscina en anexo.',
    },
    hero: {
      badge: 'Diagonal Mar · Front Marítim',
      h1: 'Diagonal Mar: contrato de habitación en pisos compartidos de torres con piscina comunitaria y plaza de parking',
      subtitulo:
        'En Diagonal Mar alquilan habitaciones sueltas expatriados y familias en transición. El contrato debe describir uso de piscina, cuota de comunidad alta y si la plaza de parking va con la habitación.',
      anguloPropietario:
        'Delimita habitación, trastero compartido y normas del reglamento de la comunidad grande; prohibe subarriendo tipo Airbnb.',
      anguloInquilino:
        'Confirma qué incluye la renta (comunidad, parking) y estándares de convivencia en pisos de 150 m² con varios inquilinos.',
    },
    mercado: {
      titulo: 'Habitaciones en Diagonal Mar',
      intro:
        'Rentas medias-altas; pisos amplios con 3–4 habitaciones para perfiles internacionales menos turísticos que el Gòtic.',
      rentaOrientativa: 'Habitación orientativa 550–850 € amueblada (2026).',
      perfilDemanda: 'Expatriados, familias en estancia media, profesionales del 22@ cercano.',
      particularidad: 'Comunidades con servicios: certificado de deudas y reglamento de piscina referenciado.',
    },
    normativa: {
      titulo: 'Habitación Diagonal Mar',
      intro: 'Código Civil + zonas comunes de gran finca.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Piscina y gimnasio comunitarios',
          contenido: 'Uso según estatutos; infracciones del inquilino pueden afectar al propietario.',
          bullets: ['Horarios piscina', 'Cuota comunidad', 'Parking opcional'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Diagonal Mar',
      intro: 'Coliving en torre:',
      puntos: [
        { titulo: 'Anexo parking', texto: 'Plaza fija o no.' },
        { titulo: 'Comunidad', texto: 'Gastos en renta o aparte.' },
        { titulo: '120 €', texto: 'Gestor asignado.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Diagonal Mar',
      intro: 'Documenta:',
      bullets: ['Reglamento comunidad', 'Contrato por habitación', 'Resolución por impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino Diagonal Mar',
      intro: 'Pide:',
      bullets: ['Desglose renta', 'Normas piscina', 'LAU: /barcelona/contrato-alquiler/diagonal-mar'],
    },
    faqs: [
      { q: '¿LAU Diagonal Mar?', a: '/barcelona/contrato-alquiler/diagonal-mar.' },
    ],
    bloqueCompradores: {
      titulo: 'Compradores en Diagonal Mar: torre nueva, comunidad grande',
      intro:
        'Comprar en Diagonal Mar implica revisar cuotas de comunidad, derramas en curso y si el parking/trastero están en escritura. Si vienes de alquilar una habitación, no reutilices el mismo borrador para las arras.',
      bullets: [
        'Arras con anexo de plaza y trastero si forman parte del precio',
        'Due diligence sobre deudas de comunidad y reglamento de zonas comunes',
        'Coherencia entre precio de compra y últimas operaciones en la finca',
      ],
    },
    bloqueVendedores: {
      titulo: 'Vendedores en Diagonal Mar: piso compartido a compraventa',
      intro:
        'Vender un piso donde aún hay inquilinos de habitación requiere calendario de salidas, estado del piso tras desalojos y certificado de deudas de comunidad al día para no frenar al comprador con hipoteca.',
      bullets: [
        'Coordinar salida de inquilinos con preaviso contractual',
        'Arras de venta con plazo para entrega libre de ocupantes si aplica',
        'Pack vendedor con revisión de contratos de habitación vigentes',
      ],
    },
  },

  'vila-olimpica': {
    slug: 'vila-olimpica',
    nombre: 'Vila Olímpica',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato habitación Vila Olímpica — Port Olímpic · 120€',
      description:
        'Habitación en Vila Olímpica: contrato para pisos compartidos cerca del Port Olímpic, playa y zona de ocio. Código Civil · 120 €.',
      keywords: ['contrato habitacion vila olimpica', 'alquiler habitacion port olimpic barcelona'],
      ogTitle: 'Vila Olímpica: habitación residencial junto al puerto',
      ogDescription: 'Pisos de los 90 compartidos — convivencia y entorno de ocio.',
    },
    hero: {
      badge: 'Vila Olímpica · Port Olímpic · playa',
      h1: 'Vila Olímpica: contrato de habitación en pisos compartidos del barrio olímpico entre playa, oficinas y vida nocturna',
      subtitulo:
        'La Vila mezcla propietarios residentes, habitaciones para jóvenes profesionales y presión de ocio en verano. El contrato registra conocimiento del entorno y uso residencial de la habitación, no alquiler por noches.',
      anguloPropietario:
        'En pisos de tres habitaciones frente al mar, fija normas de terraza común, visitas y prohibición de fiestas que generen sanciones de comunidad.',
      anguloInquilino:
        'Visita en horario de ocio si te preocupa el ruido; exige claridad sobre gastos de comunidad en fincas con portería.',
    },
    mercado: {
      titulo: 'Habitaciones en Vila Olímpica',
      intro:
        'Demanda de habitaciones amuebladas para perfiles activos; competencia con alojamiento turístico en edificios vecinos.',
      rentaOrientativa: 'Habitación orientativa 520–820 € (2026).',
      perfilDemanda: 'Deportistas, hostelería, nómadas, parejas en habitación temporal.',
      particularidad: 'Verano con más ruido exterior: cláusula de entorno sin prometer silencio imposible.',
    },
    normativa: {
      titulo: 'Habitación Vila Olímpica',
      intro: 'Código Civil + entorno portuario y ocio.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Entorno y terrazas',
          contenido: 'Conocimiento de ocio cercano; convivencia interna sigue regulada por contrato.',
          bullets: ['Terraza común', 'Uso residencial', 'Subarriendo prohibido'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Vila Olímpica',
      intro: 'Piso compartido junto al puerto:',
      puntos: [
        { titulo: 'Inventario', texto: 'Salitre y ventanas.' },
        { titulo: 'Verano', texto: 'Normas de visitas.' },
        { titulo: '120 €', texto: 'PDF en 48 h.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Vila Olímpica',
      intro: 'Incluye:',
      bullets: ['Anti-turismo en habitación', 'Comunidad y portería', 'Un contrato por inquilino'],
    },
    paraInquilino: {
      titulo: 'Inquilino Vila Olímpica',
      intro: 'Comprueba:',
      bullets: ['Ruido nocturno real', 'Parking comunitario', 'LAU: /barcelona/contrato-alquiler/vila-olimpica'],
    },
    faqs: [
      { q: '¿LAU Vila Olímpica?', a: '/barcelona/contrato-alquiler/vila-olimpica.' },
    ],
    bloqueCompradores: {
      titulo: 'Compradores en Vila Olímpica: ocio, comunidad y precio',
      intro:
        'Comprar en la Vila Olímpica atrae a quien busca playa a pie, pero el comprador debe entender estatutos de comunidad, posibles derramas en edificios de los 90 y el historial de alquileres en la finca.',
      bullets: [
        'Arras que reflejen si el piso es segunda residencia o habitual',
        'Due diligence: deudas, actividades en bajos comerciales y licencias',
        'No confundir rentabilidad turística ilegal con valor de vivienda habitual',
      ],
    },
    bloqueVendedores: {
      titulo: 'Vendedores en Vila Olímpica: de habitaciones sueltas a venta',
      intro:
        'Si has vivido alquilando habitaciones y vendes para traslado o inversión, el comprador pedirá piso vacío o renta regulada LAU, no contratos de habitación indefinidos.',
      bullets: [
        'Plan de salida de inquilinos con preaviso y devolución de fianzas',
        'Arras de venta alineadas con entrega de llaves y estado del piso',
        'Asesoramiento en pack vendedor para no perder comprador por ocupación',
      ],
    },
  },
}
