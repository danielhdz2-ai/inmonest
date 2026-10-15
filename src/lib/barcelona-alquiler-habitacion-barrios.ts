/**
 * Landings SEO: contrato de alquiler de habitación (Código Civil) por barrio en Barcelona.
 */

import {
  BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA,
  BARCELONA_HABITACION_BARRIOS_EXTRA,
} from '@/lib/barcelona-alquiler-habitacion-barrios-ampliacion'
import {
  BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_2,
  BARCELONA_HABITACION_BARRIOS_EXTRA_2,
} from '@/lib/barcelona-alquiler-habitacion-barrios-ampliacion-2'
import {
  BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_3,
  BARCELONA_HABITACION_BARRIOS_EXTRA_3,
} from '@/lib/barcelona-alquiler-habitacion-barrios-ampliacion-3'

export type BarcelonaHabitacionBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }
  hero: {
    badge: string
    h1: string
    subtitulo: string
    anguloPropietario: string
    anguloInquilino: string
  }
  mercado: {
    titulo: string
    intro: string
    rentaOrientativa: string
    perfilDemanda: string
    particularidad: string
  }
  normativa: {
    titulo: string
    intro: string
    bloques: { titulo: string; contenido: string; bullets?: string[] }[]
  }
  blindaje: {
    titulo: string
    intro: string
    puntos: { titulo: string; texto: string }[]
  }
  paraPropietario: {
    titulo: string
    intro: string
    bullets: string[]
  }
  paraInquilino: {
    titulo: string
    intro: string
    bullets: string[]
  }
  faqs: { q: string; a: string }[]
  /** Si alquilas habitación pero compras vivienda en el mismo barrio */
  bloqueCompradores?: {
    titulo: string
    intro: string
    bullets: string[]
  }
  /** Si alquilas habitaciones y luego vendes el piso o compradores compiten en la zona */
  bloqueVendedores?: {
    titulo: string
    intro: string
    bullets: string[]
  }
}

const NORMA_HABITACION_BASE: BarcelonaHabitacionBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Código Civil, no LAU de vivienda completa',
    contenido:
      'El alquiler de una habitación dentro de una vivienda compartida se rige por el Código Civil (art. 1542 y ss.), no como arrendamiento LAU del piso íntegro. El contrato debe identificar habitación, zonas comunes y reglas de convivencia.',
    bullets: ['Contrato por inquilino', 'Uso de cocina, baño y salón', 'Duración y preaviso pactados'],
  },
  {
    titulo: 'Fianza, renta y actualización',
    contenido:
      'La fianza de habitación no sigue el depósito LAU de un mes en INCASÒL. Hay que pactar importe, devolución y retenciones por daños o impago con precisión.',
    bullets: ['Renta mensual y forma de pago', 'Gastos de suministros repartidos', 'Causas de resolución'],
  },
  {
    titulo: 'Convivencia con validez jurídica',
    contenido:
      'Horarios, visitas, limpieza o mascotas pueden incluirse si no son abusivas. En pisos compartidos de Barcelona, esto evita el 80 % de los conflictos que acaban en WhatsApp sin prueba.',
    bullets: ['Normas de ruido y visitas', 'Turnos de limpieza opcionales', 'Prohibición de subarriendo no autorizado'],
  },
]

const BARCELONA_HABITACION_BARRIO_SLUGS_BASE = [
  'gracia',
  'el-raval',
  'poblenou',
  'eixample',
  'sant-antoni',
] as const

export const BARCELONA_HABITACION_BARRIO_SLUGS = [
  ...BARCELONA_HABITACION_BARRIO_SLUGS_BASE,
  ...BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA,
  ...BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_2,
  ...BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_3,
] as const

export type BarcelonaHabitacionBarrioSlug = (typeof BARCELONA_HABITACION_BARRIO_SLUGS)[number]

const BARCELONA_HABITACION_BARRIOS_BASE: Record<
  (typeof BARCELONA_HABITACION_BARRIO_SLUGS_BASE)[number],
  BarcelonaHabitacionBarrioConfig
> = {
  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    meta: {
      title: 'Contrato habitación Gràcia Barcelona — piso compartido · 120€',
      description:
        'Alquiler de habitación en Gràcia: contrato Código Civil, normas de convivencia y un contrato por inquilino. Plazas, terrazas y pisos de 4-5 habitaciones. 120 € · 48 h.',
      keywords: [
        'contrato alquiler habitacion gracia',
        'alquilar habitacion gracia barcelona',
        'piso compartido gracia contrato',
        'coliving gracia',
      ],
      ogTitle: 'Gràcia: contrato por habitación (no LAU de piso entero)',
      ogDescription: 'Pisos compartidos en plazas y calles tranquilas — convivencia pactada por escrito.',
    },
    hero: {
      badge: 'Gràcia · plazas y vida de barrio',
      h1: 'Gràcia: contrato de habitación cuando el piso tiene terraza, cuatro dormitorios y rotación de inquilinos',
      subtitulo:
        'En Gràcia es habitual alquilar habitaciones sueltas en pisos señoriales reformados: estudiantes del CREI, creativos y profesionales que buscan ambiente de barrio sin pagar un LAU de piso completo.',
      anguloPropietario:
        'Si alquilas varias habitaciones, cada inquilino necesita su contrato: renta, fianza, uso de la terraza común y salida sin bloquear el resto del piso.',
      anguloInquilino:
        'Exige inventario de la habitación, reparto de suministros y normas de convivencia antes de entrar en un piso compartido en Gràcia.',
    },
    mercado: {
      titulo: 'Habitaciones en Gràcia',
      intro:
        'Alta demanda en Fontana, Vila de Gràcia y Sol; pisos amplios con varias habitaciones frente a estudios LAU caros. Muchos anuncios son verbales o copian plantillas de otras ciudades.',
      rentaOrientativa: 'Habitación individual orientativa 450–750 € según tamaño, terraza y planta (2026).',
      perfilDemanda: 'Estudiantes, teletrabajo creativo, parejas en habitación doble puntual.',
      particularidad: 'Patios interiores y terrazas comunes: el contrato debe definir uso, tendedero y horarios.',
    },
    normativa: {
      titulo: 'Marco legal habitación en Gràcia',
      intro: 'Mismo Código Civil que en toda Cataluña; el riesgo está en no separar habitación de alquiler LAU del piso entero.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Vecindad y ruido en plazas',
          contenido:
            'Gràcia concentra quejas por terrazas y fiestas locales. Cláusulas de ruido y visitas reducen conflictos con vecinos y entre inquilinos.',
          bullets: ['Horario de silencio', 'Terraza compartida', 'Prohibición de fiestas sin acuerdo'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje contrato habitación Gràcia',
      intro: 'Enfoque piso compartido en finca antigua:',
      puntos: [
        { titulo: 'Habitación delimitada', texto: 'Metros, ventana y mobiliario en anexo.' },
        { titulo: 'Gastos claros', texto: 'Internet, agua y comunidad repartidos sin ambigüedad.' },
        { titulo: 'Entrega 48 h', texto: 'PDF firmable con gestor asignado.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Gràcia',
      intro: 'Incluye en tu encargo:',
      bullets: [
        'Un contrato por cada habitación alquilada',
        'Normas de terraza y zonas comunes',
        'Resolución por impago sin depender de chats',
        'Enlace al LAU si más adelante alquilas el piso entero',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en Gràcia',
      intro: 'Revisa antes de firmar:',
      bullets: [
        'Qué incluye la renta (limpieza, internet)',
        'Preaviso de salida y devolución de fianza',
        'Convivencia con otras habitaciones',
        'No confundir con contrato LAU de vivienda completa',
      ],
    },
    faqs: [
      {
        q: '¿Puedo alquilar solo una habitación en Gràcia con contrato LAU?',
        a: 'No. LAU es para vivienda íntegra. Habitación = Código Civil. Si alquilas el piso completo, usa /barcelona/contrato-alquiler/gracia.',
      },
      {
        q: '¿Un contrato sirve para las cuatro habitaciones?',
        a: 'No es recomendable. Cada inquilino debe tener su contrato para gestionar entradas, impagos y salidas de forma independiente.',
      },
    ],
  },

  'el-raval': {
    slug: 'el-raval',
    nombre: 'El Raval',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Contrato habitación El Raval — convivencia y rotación · 120€',
      description:
        'Habitación en El Raval: contrato profesional para pisos compartidos multiculturales, fianza clara e impagos. Distinto del LAU de piso entero. 120 € IVA incl.',
      keywords: ['contrato habitacion el raval', 'alquiler habitacion raval', 'piso compartido raval barcelona'],
      ogTitle: 'El Raval: habitación con contrato (no plantilla genérica)',
      ogDescription: 'Rotación alta, perfiles internacionales — convivencia por escrito.',
    },
    hero: {
      badge: 'El Raval · Ciutat Vella',
      h1: 'El Raval: contrato de habitación cuando conviven idiomas, turnos de trabajo y pisos señoriales reconvertidos',
      subtitulo:
        'En el Raval mezclan estudiantes del MACBA, trabajadores nocturnos y familias en plantas altas. Sin contrato, los conflictos por limpieza, visitas o fianza son difíciles de probar.',
      anguloPropietario:
        'Protege la convivencia en pisos de 80–100 m² con tres o cuatro habitaciones: identifica la habitación arrendada y prohibe subarriendo turístico.',
      anguloInquilino:
        'Comprueba estado real de la habitación, compañeros y reparto de gastos antes de pagar fianza en efectivo.',
    },
    mercado: {
      titulo: 'Pisos compartidos en El Raval',
      intro:
        'Renta por habitación más accesible que Eixample; rotación alta en plantas bajas y más estabilidad en fincas rehabilitadas cerca de Sant Antoni.',
      rentaOrientativa: 'Habitación orientativa 380–650 € según estado y calle (2026).',
      perfilDemanda: 'Estudiantes, artistas, trabajadores temporales, perfiles internacionales.',
      particularidad: 'Edificios antiguos con humedades ocultas: inventario fotográfico en anexo.',
    },
    normativa: {
      titulo: 'Habitación vs turismo en El Raval',
      intro: 'El Raval sufrió abusos de alquiler turístico encubierto; el contrato de habitación debe dejar claro uso residencial de la habitación.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Uso residencial de la habitación',
          contenido:
            'Prohibición de alquiler por días o actividad incompatible con convivencia en piso compartido.',
          bullets: ['Sin subarriendo', 'Empadronamiento si se pacta', 'Visitas reguladas'],
        },
      ],
    },
    blindaje: {
      titulo: 'Contrato habitación El Raval',
      intro: 'Prioridad convivencia y prueba documental:',
      puntos: [
        { titulo: 'Inventario con fotos', texto: 'Estado de habitación y electrodomésticos comunes.' },
        { titulo: 'Impago', texto: 'Procedimiento y preaviso antes de desalojo.' },
        { titulo: '120 € cerrados', texto: 'Redacción + asesor Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en El Raval',
      intro: 'Evita:',
      bullets: ['Un solo contrato “para todos”', 'Fianzas en efectivo sin recibo', 'Normas de limpieza solo verbales'],
    },
    paraInquilino: {
      titulo: 'Inquilino en El Raval',
      intro: 'Pide:',
      bullets: ['Contrato en castellano o catalán claro', 'Datos del propietario o representante', 'Condiciones de salida con preaviso'],
    },
    faqs: [
      {
        q: '¿Aplica IRAV o zona tensionada a la habitación?',
        a: 'No igual que en LAU de vivienda completa. Tu gestor explica cómo fijar renta de habitación sin confundir regímenes.',
      },
    ],
  },

  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato habitación Poblenou — coliving 22@ · 120€',
      description:
        'Habitación en Poblenou y 22@: contrato para pisos compartidos de tech, playa y Rambla del Poblenou. Normas de convivencia y fianza. 120 € · gestor 48 h.',
      keywords: ['contrato habitacion poblenou', 'coliving 22 barcelona', 'alquiler habitacion poblenou'],
      ogTitle: 'Poblenou: habitación para perfiles tech (no LAU genérico)',
      ogDescription: 'Pisos compartidos cerca de 22@ y la playa — un contrato por inquilino.',
    },
    hero: {
      badge: 'Poblenou · 22@ · playa',
      h1: 'Poblenou: contrato de habitación para pisos compartidos entre tech, creativos y teletrabajo con vistas al mar',
      subtitulo:
        'En Poblenou proliferan pisos de 4 habitaciones para perfiles internacionales. El contrato debe regular coworking en salón, horarios y sustitución de inquilinos.',
      anguloPropietario:
        'Ideal si alquilas habitaciones sueltas en fincas industriales reconvertidas: delimita habitación, trastero y uso de salón-comedor.',
      anguloInquilino:
        'Verifica si la renta incluye limpieza de zonas comunes y qué pasa si un compañero deja de pagar (no es solidario salvo que lo pactes mal).',
    },
    mercado: {
      titulo: 'Coliving en Poblenou',
      intro:
        'Demanda estable de habitaciones amuebladas cerca de 22@, Rambla del Poblenou y la playa; competencia con residencias de estudiantes y apartamentos turísticos mal tipificados.',
      rentaOrientativa: 'Habitación orientativa 550–850 € amueblada (2026).',
      perfilDemanda: 'Profesionales tech, nómadas digitales, estudiantes de máster.',
      particularidad: 'Pisos diáfanos: el contrato debe señalar qué m² son habitación vs zonas comunes.',
    },
    normativa: {
      titulo: 'Habitación en Poblenou',
      intro: 'Régimen Código Civil; ojo con pisos que mezclan habitación legal y uso turístico ilegal.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Teletrabajo y salón compartido',
          contenido: 'Pactar horas de reuniones en salón evita conflictos en pisos coliving de Poblenou.',
          bullets: ['Uso profesional en habitación', 'Salón compartido', 'Sustitución de inquilino con preaviso'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Poblenou',
      intro: 'Coliving profesional:',
      puntos: [
        { titulo: 'Habitación numerada', texto: 'Plano o descripción en anexo.' },
        { titulo: 'Internet y suministros', texto: 'Cuota fija o reparto por consumo.' },
        { titulo: 'Gestor asignado', texto: 'Dudas antes de firmar.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Poblenou',
      intro: 'Recomendado:',
      bullets: ['Contrato independiente por habitación', 'Cláusula de sustitución con aprobación', 'Prohibición de Airbnb encubierto'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Poblenou',
      intro: 'Comprueba:',
      bullets: ['Mobiliario incluido en anexo', 'Duración mínima y preaviso', 'Compañeros actuales y reglas de visitas'],
    },
    faqs: [
      {
        q: '¿Es lo mismo que alquiler LAU en Poblenou?',
        a: 'No. Vivienda entera: /barcelona/contrato-alquiler/poblenou. Habitación suelta: esta landing.',
      },
    ],
  },

  eixample: {
    slug: 'eixample',
    nombre: "L'Eixample",
    distrito: 'Eixample',
    meta: {
      title: "Contrato habitación Eixample — renta por dormitorio · 120€",
      description:
        "Alquiler de habitación en l'Eixample (Esquerra/Dreta): contrato Código Civil, fianza y convivencia en pisos modernistas compartidos. 120 € IVA incluido.",
      keywords: ['contrato habitacion eixample', 'alquiler habitacion eixample barcelona', 'piso compartido eixample'],
      ogTitle: "Eixample: habitación en piso modernista (título SEO distinto de LAU)",
      ogDescription: 'Renta alta por habitación — documentación clara para propietario e inquilino.',
    },
    hero: {
      badge: "Eixample · Ensanche",
      h1: "L'Eixample: contrato de habitación cuando alquilas un dormitorio en un piso modernista de 180 m²",
      subtitulo:
        'En Esquerra y Dreta conviven ejecutivos, estudiantes de posgrado y familias que retienen una habitación. La renta por habitación es alta; la fianza mal redactada genera disputas costosas.',
      anguloPropietario:
        'En pisos señoriales con varios baños, especifica qué baño corresponde a cada habitación y quién paga la comunidad.',
      anguloInquilino:
        'Confirma que no estás firmando un LAU de piso entero por error y que la habitación tiene ventana y metros reales.',
    },
    mercado: {
      titulo: 'Habitaciones en el Ensanche',
      intro:
        'Una de las rentas por habitación más altas de Barcelona; mucha oferta en pisos de 5 habitaciones para profesionales.',
      rentaOrientativa: 'Habitación orientativa 650–950 € según zona Dreta/Esquerra y amueblado (2026).',
      perfilDemanda: 'Profesionales, estudiantes de posgrado, expatriados.',
      particularidad: 'Fincas con ascensor antiguo y servicio: reparto de gastos de comunidad en contrato.',
    },
    normativa: {
      titulo: 'Habitación en Eixample',
      intro: 'No confundir con LAU tensionado de vivienda completa; la habitación sigue Código Civil.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Comunidad y ascensor',
          contenido: 'En fincas regias, detalla cuota de comunidad incluida o prorrateada por habitación.',
          bullets: ['Comunidad', 'Ascensor y portería', 'Bajada de suministros'],
        },
      ],
    },
    blindaje: {
      titulo: 'Contrato habitación Eixample',
      intro: 'Ticket alto por habitación = contrato preciso:',
      puntos: [
        { titulo: 'Baño asignado', texto: 'Compartido o en suite en anexo.' },
        { titulo: 'Fianza', texto: 'Importe, plazo de devolución y retenciones.' },
        { titulo: '48 h', texto: 'Entrega PDF con asesor.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Eixample',
      intro: 'Incluye:',
      bullets: ['Cláusulas de comunidad y IBI si repartes', 'Prohibición de cambio a turístico', 'Resolución por impago ágil'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Eixample',
      intro: 'Exige:',
      bullets: ['Desglose renta + gastos', 'Inventario firmado', 'Contacto del propietario para incidencias'],
    },
    faqs: [
      {
        q: '¿La Ley de Vivienda limita la renta de mi habitación en Eixample?',
        a: 'No igual que en arrendamiento LAU integral. Consultamos tu caso antes de fijar cláusulas de actualización.',
      },
    ],
  },

  'sant-antoni': {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample / frontera Raval',
    meta: {
      title: 'Contrato habitación Sant Antoni — mercado y convivencia · 120€',
      description:
        'Habitación en Sant Antoni (mercado, Comte Borrell): contrato para pisos compartidos entre jóvenes profesionales. Código Civil, 120 €, entrega 48 h.',
      keywords: ['contrato habitacion sant antoni', 'alquiler habitacion comte borrell', 'piso compartido sant antoni'],
      ogTitle: 'Sant Antoni: habitación cerca del mercado (SEO barrio)',
      ogDescription: 'Pisos compartidos en zona en transformación — convivencia escrita.',
    },
    hero: {
      badge: 'Sant Antoni · mercado · Comte Borrell',
      h1: 'Sant Antoni: contrato de habitación en pisos compartidos entre el mercado, UPF y la frontera con el Raval',
      subtitulo:
        'Sant Antoni concentra pisos de 3–4 habitaciones para jóvenes profesionales: buena conexión metro, vida de barrio y rentas más contenidas que la Dreta del Eixample.',
      anguloPropietario:
        'Regula convivencia en pisos estrechos del Ensanche: horarios, cocina compartida y salida de inquilinos sin bloquear el resto.',
      anguloInquilino:
        'Pregunta por obras del barrio, ruido del mercado los domingos y reparto de gastos antes de entregar la fianza.',
    },
    mercado: {
      titulo: 'Habitaciones en Sant Antoni',
      intro:
        'Demanda creciente por gentrificación suave y proximidad a Universitat y Eixample; competencia con habitaciones en Raval y Eixample Esquerra.',
      rentaOrientativa: 'Habitación orientativa 480–720 € (2026).',
      perfilDemanda: 'Jóvenes profesionales, parejas en habitación doble temporal, estudiantes de posgrado.',
      particularidad: 'Pisos alargados del Ensanche: delimitar habitación interior sin ventana vs exterior.',
    },
    normativa: {
      titulo: 'Habitación Sant Antoni',
      intro: 'Contrato Código Civil adaptado a convivencia en piso compartido urbano.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Habitación interior vs exterior',
          contenido:
            'En Sant Antoni hay habitaciones sin ventana a patio de manzana; debe constar en contrato para evale reclamaciones.',
          bullets: ['Ventilación y luz natural', 'Mobiliario incluido', 'Limpieza de zonas comunes'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sant Antoni',
      intro: 'Piso compartido en Ensanche:',
      puntos: [
        { titulo: 'Tipo de habitación', texto: 'Interior/exterior descrita en anexo.' },
        { titulo: 'Mercado y ruido', texto: 'Horarios domingo opcionales.' },
        { titulo: '120 €', texto: 'Tarifa plana Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sant Antoni',
      intro: 'Documenta:',
      bullets: ['Estado de habitación interior', 'Reglas de cocina compartida', 'Preaviso mínimo de salida'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sant Antoni',
      intro: 'Revisa:',
      bullets: ['Si la habitación tiene ventana exterior', 'Gastos fijos mensuales', 'Enlace a LAU si alquilas piso entero después'],
    },
    faqs: [
      {
        q: '¿Enlace al contrato LAU de Sant Antoni?',
        a: 'Piso completo: /barcelona/contrato-alquiler/sant-antoni. Habitación: esta página.',
      },
    ],
  },
}

export const BARCELONA_HABITACION_BARRIOS = {
  ...BARCELONA_HABITACION_BARRIOS_BASE,
  ...BARCELONA_HABITACION_BARRIOS_EXTRA,
  ...BARCELONA_HABITACION_BARRIOS_EXTRA_2,
  ...BARCELONA_HABITACION_BARRIOS_EXTRA_3,
}

export function getBarcelonaHabitacionBarrio(slug: string): BarcelonaHabitacionBarrioConfig | undefined {
  if (!(BARCELONA_HABITACION_BARRIO_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARCELONA_HABITACION_BARRIOS[slug as BarcelonaHabitacionBarrioSlug]
}

export function getBarcelonaHabitacionBarrioPaths(): string[] {
  return BARCELONA_HABITACION_BARRIO_SLUGS.map((b) => `/barcelona/contrato-alquiler-habitacion/${b}`)
}

export function listBarcelonaHabitacionBarrios(): BarcelonaHabitacionBarrioConfig[] {
  return BARCELONA_HABITACION_BARRIO_SLUGS.map((s) => BARCELONA_HABITACION_BARRIOS[s])
}
