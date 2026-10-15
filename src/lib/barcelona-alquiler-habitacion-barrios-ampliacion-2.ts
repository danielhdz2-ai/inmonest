import type { BarcelonaHabitacionBarrioConfig } from '@/lib/barcelona-alquiler-habitacion-barrios'

const NORMA: BarcelonaHabitacionBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Código Civil (habitación, no LAU íntegro)',
    contenido:
      'Arrendamiento de habitación en piso compartido: contrato por inquilino, zonas comunes y convivencia pactada.',
    bullets: ['Habitación delimitada', 'Fianza y renta', 'Preaviso de salida'],
  },
  {
    titulo: 'Suministros repartidos',
    contenido: 'Luz, agua, gas e internet en cuota fija o reparto documentado.',
    bullets: ['Forma de pago', 'Impago', 'Actualización pactada'],
  },
  {
    titulo: 'Convivencia',
    contenido: 'Visitas, ruido y limpieza con validez si no son abusivas.',
    bullets: ['Horarios', 'Mascotas si se acuerdan', 'Sin subarriendo'],
  },
]

export const BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_2 = [
  'hostafrancs',
  'pedralbes',
  'el-clot',
  'horta',
  'sant-andreu',
] as const

export type BarcelonaHabitacionBarrioSlugExtra2 = (typeof BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA_2)[number]

export const BARCELONA_HABITACION_BARRIOS_EXTRA_2: Record<
  BarcelonaHabitacionBarrioSlugExtra2,
  BarcelonaHabitacionBarrioConfig
> = {
  hostafrancs: {
    slug: 'hostafrancs',
    nombre: 'Hostafrancs',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Contrato habitación Hostafrancs — frontera Sants · 120€',
      description:
        'Habitación en Hostafrancs: contrato Código Civil para pisos compartidos entre la estación y Montjuïc. Convivencia, fianza y 120 € · 48 h.',
      keywords: ['contrato habitacion hostafrancs', 'alquiler habitacion hostafrancs barcelona'],
      ogTitle: 'Hostafrancs: habitación (distinto de LAU piso entero)',
      ogDescription: 'Pisos de 3-4 dormitorios cerca de Plaça Espanya — contrato por inquilino.',
    },
    hero: {
      badge: 'Hostafrancs · Plaça Espanya · Sants',
      h1: 'Hostafrancs: contrato de habitación en pisos compartidos entre la frontera con Sants, la Fira y familias del Ensanche bajo',
      subtitulo:
        'Hostafrancs concentra pisos amplios a precio más contenido que el centro: habitaciones para trabajadores, estudiantes del Zona Universitaria y familias que comparten piso. Sin contrato escrito, la fianza y la cocina común generan disputas difíciles de probar.',
      anguloPropietario:
        'Si alquilas dos habitaciones en la misma finca cerca de Carrer de la Creu Coberta, cada inquilino necesita su contrato con renta, fianza y normas de convivencia.',
      anguloInquilino:
        'Comprueba ruido de vías, planta del piso y reparto de gastos antes de entregar la fianza en efectivo.',
    },
    mercado: {
      titulo: 'Habitaciones en Hostafrancs',
      intro:
        'Demanda estable por metro y bus hacia el centro; muchos pisos de 90 m² con tres o cuatro dormitorios para alquiler por habitación.',
      rentaOrientativa: 'Habitación orientativa 400–620 € (2026).',
      perfilDemanda: 'Trabajadores, estudiantes, parejas en habitación temporal.',
      particularidad: 'Fincas mixtas con locales en bajo: clarificar uso residencial de la habitación.',
    },
    normativa: {
      titulo: 'Habitación Hostafrancs',
      intro: 'Código Civil; enlace al LAU si alquilas el piso completo.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Varios inquilinos',
          contenido: 'Contratos separados para gestionar entradas y salidas sin bloquear el piso.',
          bullets: ['Inventario por habitación', 'Llaves', 'Resolución individual'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Hostafrancs',
      intro: 'Piso compartido documentado:',
      puntos: [
        { titulo: 'Habitación', texto: 'Metros y mobiliario en anexo.' },
        { titulo: 'Gastos', texto: 'Cuota mensual clara.' },
        { titulo: '120 €', texto: 'Inmonest · 48 h.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Hostafrancs',
      intro: 'Incluye:',
      bullets: ['Un contrato por habitación', 'Prohibición turismo encubierto', 'Devolución de fianza pactada'],
    },
    paraInquilino: {
      titulo: 'Inquilino Hostafrancs',
      intro: 'Pide:',
      bullets: ['Listado de compañeros', 'Reglas de cocina', 'LAU piso entero: /barcelona/contrato-alquiler/hostafrancs'],
    },
    faqs: [
      { q: '¿LAU en Hostafrancs?', a: 'Vivienda íntegra: /barcelona/contrato-alquiler/hostafrancs.' },
    ],
  },

  pedralbes: {
    slug: 'pedralbes',
    nombre: 'Pedralbes',
    distrito: 'Les Corts',
    meta: {
      title: 'Contrato habitación Pedralbes — campus y fincas amplias · 120€',
      description:
        'Habitación en Pedralbes: contrato por inquilino en pisos compartidos cerca de ESADE, UB y Diagonal. Código Civil · 120 € IVA incl.',
      keywords: ['contrato habitacion pedralbes', 'alquiler habitacion zona universitaria pedralbes'],
      ogTitle: 'Pedralbes: habitación de ticket alto (no plantilla LAU)',
      ogDescription: 'Rentas elevadas por dormitorio — fianza y convivencia por escrito.',
    },
    hero: {
      badge: 'Pedralbes · Diagonal · campus',
      h1: 'Pedralbes: contrato de habitación cuando alquilas un dormitorio en un piso grande junto a ESADE, la Diagonal y el Real Club de Polo',
      subtitulo:
        'Pedralbes mezcla familias residenciales y pisos donde se alquilan habitaciones sueltas a posgraduados y expatriados. La renta por habitación es alta; un modelo genérico no describe parking, trastero ni estándares de convivencia.',
      anguloPropietario:
        'Delimita habitación, baño asignado, uso de parking si procede y prohibición de subarriendo en fincas de pocas unidades.',
      anguloInquilino:
        'Confirma metros reales, comunidad incluida en la renta y que no estás firmando un LAU de piso entero por error.',
    },
    mercado: {
      titulo: 'Habitaciones en Pedralbes',
      intro:
        'Oferta limitada de habitaciones sueltas; demanda de posgraduados internacionales y profesionales del entorno sanitario y universitario.',
      rentaOrientativa: 'Habitación orientativa 650–950 € amueblada (2026).',
      perfilDemanda: 'Posgraduados, investigadores, ejecutivos en estancia media.',
      particularidad: 'Fincas con servicios y jardín común: detalle de zonas exteriores en contrato.',
    },
    normativa: {
      titulo: 'Habitación Pedralbes',
      intro: 'Código Civil con anexos de calidad y zonas comunes amplias.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Parking y zonas exteriores',
          contenido: 'Uso de plaza o terraza común debe constar si el inquilino las utiliza.',
          bullets: ['Parking opcional', 'Jardín común', 'Mobiliario premium en inventario'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Pedralbes',
      intro: 'Contrato preciso en renta alta:',
      puntos: [
        { titulo: 'Inventario', texto: 'Calidades y electrodomésticos.' },
        { titulo: 'Fianza', texto: 'Plazo de devolución fijo.' },
        { titulo: 'Asesor', texto: '120 € tarifa plana.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Pedralbes',
      intro: 'Documenta:',
      bullets: ['Estándares de convivencia', 'Comunidad e IBI si repartes', 'Resolución por impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino Pedralbes',
      intro: 'Revisa:',
      bullets: ['Desglose renta + gastos', 'Preaviso de salida', 'LAU: /barcelona/contrato-alquiler/pedralbes'],
    },
    faqs: [
      { q: '¿IRAV en habitación Pedralbes?', a: 'No igual que LAU vivienda completa; tu gestor aclara cómo fijar renta de habitación.' },
    ],
  },

  'el-clot': {
    slug: 'el-clot',
    nombre: 'El Clot',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato habitación El Clot — Glòries y gran via · 120€',
      description:
        'Alquiler de habitación en El Clot: pisos compartidos cerca de Glòries, Parc del Clot y gran via. Contrato Código Civil · 120 €.',
      keywords: ['contrato habitacion el clot', 'alquiler habitacion clot barcelona', 'piso compartido clot'],
      ogTitle: 'El Clot: habitación para perfiles urbanos (SEO barrio)',
      ogDescription: 'Buen metro y pisos de 4 habitaciones — un contrato por inquilino.',
    },
    hero: {
      badge: 'El Clot · Glòries · Sant Martí',
      h1: 'El Clot: contrato de habitación en pisos compartidos entre el Parc del Clot, la gran via y el eje de Glòries',
      subtitulo:
        'El Clot atrae jóvenes profesionales y familias que alquilan habitaciones sueltas en pisos de finales del XX. La rotación es moderada; los conflictos suelen ser convivencia en cocina y reparto de internet mal explicado.',
      anguloPropietario:
        'Regula sustitución de inquilino, horarios de lavadora y visitas si alquilas varias habitaciones en el mismo piso.',
      anguloInquilino:
        'Verifica línea de metro (Clot, Navas) y si la habitación es interior o exterior antes de firmar.',
    },
    mercado: {
      titulo: 'Habitaciones en El Clot',
      intro:
        'Rentas intermedias entre Poblenou y Eixample; pisos de 3–4 habitaciones bien comunicados con L1 y L2.',
      rentaOrientativa: 'Habitación orientativa 480–720 € (2026).',
      perfilDemanda: 'Profesionales, parejas en habitación doble temporal, estudiantes de máster.',
      particularidad: 'Reformas del entorno Glòries: no prometer silencio absoluto, sí convivencia clara.',
    },
    normativa: {
      titulo: 'Habitación El Clot',
      intro: 'Régimen habitación bajo Código Civil.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Sustitución de inquilino',
          contenido: 'Procedimiento cuando un compañero abandona el piso a mitad de contrato.',
          bullets: ['Preaviso', 'Aprobación del propietario', 'Fianza del entrante'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje El Clot',
      intro: 'Coliving urbano:',
      puntos: [
        { titulo: 'Tipo habitación', texto: 'Interior/exterior en anexo.' },
        { titulo: 'Fibra', texto: 'Cuota fija de internet.' },
        { titulo: '48 h', texto: 'PDF firmable.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario El Clot',
      intro: 'Evita:',
      bullets: ['Un contrato para todos', 'Fianza sin condiciones', 'Normas verbales de limpieza'],
    },
    paraInquilino: {
      titulo: 'Inquilino El Clot',
      intro: 'Exige:',
      bullets: ['Inventario firmado', 'Compañeros actuales', 'LAU: /barcelona/contrato-alquiler/el-clot'],
    },
    faqs: [
      { q: '¿Piso entero LAU El Clot?', a: '/barcelona/contrato-alquiler/el-clot.' },
    ],
  },

  horta: {
    slug: 'horta',
    nombre: 'Horta',
    distrito: 'Horta-Guinardó',
    meta: {
      title: 'Contrato habitación Horta — barrio residencial · 120€',
      description:
        'Habitación en Horta-Guinardó: contrato para pisos compartidos tranquilos, familias y estudiantes del Vall d’Hebron. 120 € · gestoría 48 h.',
      keywords: ['contrato habitacion horta barcelona', 'alquiler habitacion horta guinardo'],
      ogTitle: 'Horta: habitación en piso familiar compartido',
      ogDescription: 'Menos rotación que el centro — convivencia pactada.',
    },
    hero: {
      badge: 'Horta · Guinardó · Vall d’Hebron',
      h1: 'Horta: contrato de habitación en pisos compartidos residenciales lejos del ruido del centro pero bien enlazados en metro',
      subtitulo:
        'En Horta alquilan habitaciones familias que retienen una estancia, estudiantes de ciencias de la salud y trabajadores que buscan piso compartido más económico. El contrato debe equilibrar convivencia con menores en el hogar o compañeros estables.',
      anguloPropietario:
        'Si conviven adultos y habitación para estudiante, fija horarios, visitas y uso de salón sin interferir en la vida familiar del piso.',
      anguloInquilino:
        'Pregunta por tiempo de desplazamiento real al centro y reglas si hay niños en el piso.',
    },
    mercado: {
      titulo: 'Habitaciones en Horta',
      intro:
        'Rentas más bajas que el Eixample; pisos amplios en fincas de los 70–80 con 3–4 habitaciones para compartir.',
      rentaOrientativa: 'Habitación orientativa 380–580 € (2026).',
      perfilDemanda: 'Estudiantes sanitarios, familias en habitación auxiliar, teletrabajo.',
      particularidad: 'Pendiente del terreno: algunas calles con fuerte pendiente y humedad en plantas bajas — inventario fotográfico.',
    },
    normativa: {
      titulo: 'Habitación Horta',
      intro: 'Código Civil adaptado a convivencia familiar o estable.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Convivencia con familia en el piso',
          contenido: 'Pactos de silencio, visitas y cocina cuando el propietario vive en el mismo inmueble o hay menores.',
          bullets: ['Horarios', 'Zonas comunes', 'Duración del arrendamiento'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Horta',
      intro: 'Piso compartido residencial:',
      puntos: [
        { titulo: 'Estado', texto: 'Humedad y ventilación en anexo.' },
        { titulo: 'Gastos', texto: 'Reparto de calefacción.' },
        { titulo: '120 €', texto: 'Redacción profesional.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Horta',
      intro: 'Recomendado:',
      bullets: ['Contrato por habitación', 'Normas si hay menores', 'Prohibición subarriendo'],
    },
    paraInquilino: {
      titulo: 'Inquilino Horta',
      intro: 'Comprueba:',
      bullets: ['Tiempo al metro (L5)', 'Reglas con familia anfitriona', 'LAU: /barcelona/contrato-alquiler/horta'],
    },
    faqs: [
      { q: '¿LAU vivienda completa Horta?', a: '/barcelona/contrato-alquiler/horta.' },
    ],
  },

  'sant-andreu': {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    meta: {
      title: 'Contrato habitación Sant Andreu — barrio en transformación · 120€',
      description:
        'Habitación en Sant Andreu: contrato Código Civil para pisos compartidos cerca de La Sagrera, Fabra i Coats y vida de barrio. 120 € IVA incl.',
      keywords: ['contrato habitacion sant andreu', 'alquiler habitacion sagrera barcelona'],
      ogTitle: 'Sant Andreu: habitación (no confundir con LAU genérico)',
      ogDescription: 'Demanda creciente — contrato por inquilino y fianza clara.',
    },
    hero: {
      badge: 'Sant Andreu · La Sagrera · Fabra i Coats',
      h1: 'Sant Andreu: contrato de habitación en pisos compartidos en un distrito que crece entre La Sagrera, el mercado y antiguas naves reconvertidas',
      subtitulo:
        'Sant Andreu suma jóvenes profesionales que buscan habitación más asequible que el centro, familias en pisos grandes y estudiantes bien conectados por metro L1 y futuros hubs ferroviarios.',
      anguloPropietario:
        'Documenta habitación, reparto de gastos y salida de inquilinos cuando alquilas varias plazas en el mismo piso cerca del mercado de Sant Andreu.',
      anguloInquilino:
        'Revisa obras del entorno, ruido de calle comercial y condiciones de fianza antes de entrar.',
    },
    mercado: {
      titulo: 'Habitaciones en Sant Andreu',
      intro:
        'Rentas en subida por transformación urbana; aún por debajo del Eixample para habitación suelta en piso compartido.',
      rentaOrientativa: 'Habitación orientativa 420–650 € (2026).',
      perfilDemanda: 'Jóvenes profesionales, familias en habitación extra, estudiantes.',
      particularidad: 'Obras y cambio de uso en la zona: contrato sin promesas de entorno futuro, sí uso residencial claro.',
    },
    normativa: {
      titulo: 'Habitación Sant Andreu',
      intro: 'Código Civil; distinto del arrendamiento LAU de vivienda íntegra.',
      bloques: [
        ...NORMA,
        {
          titulo: 'Entorno en obras',
          contenido: 'Cláusula de conocimiento del barrio en transformación sin confundir con defectos del inmueble.',
          bullets: ['Uso habitación', 'Inventario', 'Resolución por impago'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sant Andreu',
      intro: 'Piso compartido en barrio vivo:',
      puntos: [
        { titulo: 'Habitación', texto: 'Descripción y fotos.' },
        { titulo: 'Convivencia', texto: 'Cocina y lavadora.' },
        { titulo: '120 €', texto: 'Inmonest online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Sant Andreu',
      intro: 'Incluye:',
      bullets: ['Contrato independiente por plazo', 'Normas de visitas', 'Turismo encubierto prohibido'],
    },
    paraInquilino: {
      titulo: 'Inquilino Sant Andreu',
      intro: 'Pide:',
      bullets: ['Datos del arrendador', 'Preaviso mínimo', 'LAU: /barcelona/contrato-alquiler/sant-andreu'],
    },
    faqs: [
      { q: '¿Contrato LAU Sant Andreu?', a: '/barcelona/contrato-alquiler/sant-andreu.' },
    ],
  },
}
