import type { BarcelonaHabitacionBarrioConfig } from '@/lib/barcelona-alquiler-habitacion-barrios'

const NORMA_HABITACION_BASE: BarcelonaHabitacionBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Código Civil, no LAU de vivienda completa',
    contenido:
      'El alquiler de una habitación dentro de una vivienda compartida se rige por el Código Civil (art. 1542 y ss.), no como arrendamiento LAU del piso íntegro.',
    bullets: ['Contrato por inquilino', 'Zonas comunes delimitadas', 'Preaviso de salida'],
  },
  {
    titulo: 'Fianza y suministros',
    contenido:
      'Importe de fianza, devolución y reparto de luz, agua, gas e internet deben constar por escrito.',
    bullets: ['Renta mensual', 'Gastos fijos vs variable', 'Resolución por impago'],
  },
  {
    titulo: 'Convivencia',
    contenido: 'Normas de visitas, ruido y limpieza válidas si no son abusivas.',
    bullets: ['Horarios', 'Mascotas si se pactan', 'Sin subarriendo no autorizado'],
  },
]

export const BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA = [
  'sants',
  'montjuic',
  'sarria',
  'la-barceloneta',
  'les-corts',
] as const

export type BarcelonaHabitacionBarrioSlugExtra = (typeof BARCELONA_HABITACION_BARRIO_SLUGS_EXTRA)[number]

export const BARCELONA_HABITACION_BARRIOS_EXTRA: Record<
  BarcelonaHabitacionBarrioSlugExtra,
  BarcelonaHabitacionBarrioConfig
> = {
  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Contrato habitación Sants — estación y pisos compartidos · 120€',
      description:
        'Habitación en Sants (Estació, Badal, Hostafrancs frontera): contrato Código Civil, convivencia y un arrendamiento por inquilino. 120 € · 48 h.',
      keywords: ['contrato habitacion sants', 'alquiler habitacion sants barcelona', 'piso compartido sants'],
      ogTitle: 'Sants: habitación cerca de la estación (no LAU genérico)',
      ogDescription: 'Pisos de 4 habitaciones y rotación de inquilinos — contrato por habitación.',
    },
    hero: {
      badge: 'Sants · Estació · Badal',
      h1: 'Sants: contrato de habitación en pisos compartidos entre la estación, el mercado y familias de larga tradición',
      subtitulo:
        'Sants mezcla pisos grandes para alquiler por habitaciones, estudiantes del Zona Universitaria cercana y trabajadores con horarios irregulares. Sin contrato, la fianza y la limpieza de la cocina común acaban en conflicto.',
      anguloPropietario:
        'Si alquilas dos o tres habitaciones en el mismo piso cerca de Plaça de Sants, cada inquilino lleva su contrato con renta, fianza y normas de convivencia.',
      anguloInquilino:
        'Comprueba distancia real al metro, si la habitación da a patio ruidoso y cómo se reparten los gastos de comunidad.',
    },
    mercado: {
      titulo: 'Habitaciones en Sants',
      intro:
        'Demanda estable por conexión RENFE/metro y rentas más moderadas que el Eixample; muchos pisos de 80–100 m² con tres o cuatro dormitorios para compartir.',
      rentaOrientativa: 'Habitación orientativa 420–680 € (2026).',
      perfilDemanda: 'Estudiantes, familias en habitación auxiliar, trabajadores con turnos.',
      particularidad: 'Proximidad a vías y mercado: cláusulas de ruido y horarios de cocina.',
    },
    normativa: {
      titulo: 'Habitación en Sants',
      intro: 'Régimen Código Civil; no confundir con LAU del piso entero en la misma finca.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Varios inquilinos en el mismo piso',
          contenido: 'Contratos independientes evitan que un impago bloquee la relación con el resto.',
          bullets: ['Entrada y salida individual', 'Inventario por habitación', 'Llaves y acceso'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sants',
      intro: 'Piso compartido bien documentado:',
      puntos: [
        { titulo: 'Habitación identificada', texto: 'Planta, metros y mobiliario.' },
        { titulo: 'Gastos', texto: 'Cuota fija mensual de suministros.' },
        { titulo: '120 €', texto: 'Redacción Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sants',
      intro: 'Incluye:',
      bullets: ['Contrato por habitación', 'Prohibición de turismo encubierto', 'Preaviso y devolución de fianza'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sants',
      intro: 'Pide:',
      bullets: ['Listado de compañeros actuales', 'Reglas de lavadora y cocina', 'Contrato en castellano o catalán claro'],
    },
    faqs: [
      {
        q: '¿LAU de piso completo en Sants?',
        a: 'Vivienda íntegra: /barcelona/contrato-alquiler/sants. Habitación suelta: esta landing.',
      },
    ],
  },

  montjuic: {
    slug: 'montjuic',
    nombre: 'Poble-sec / Montjuïc',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Contrato habitación Poble-sec — Carrer Blai y ocio · 120€',
      description:
        'Alquiler de habitación en Poble-sec y Montjuïc: contrato con normas de ruido, terrazas y convivencia. Distinto del LAU de piso entero. 120 € IVA incl.',
      keywords: ['contrato habitacion poble sec', 'alquiler habitacion montjuic', 'piso compartido carrer blai'],
      ogTitle: 'Poble-sec: habitación con cláusulas de entorno (SEO barrio)',
      ogDescription: 'Pisos compartidos junto a ocio nocturno — convivencia pactada.',
    },
    hero: {
      badge: 'Poble-sec · Montjuïc · Blai',
      h1: 'Poble-sec: contrato de habitación cuando el piso compartido está a dos calles de terrazas y vida nocturna',
      subtitulo:
        'En Poble-sec alquilan habitaciones jóvenes profesionales y estudiantes que aceptan ambiente de barrio. El contrato puede registrar conocimiento del entorno sin prometer silencio absoluto, sí convivencia y fianza clara.',
      anguloPropietario:
        'Protege tu piso de 3–4 habitaciones frente a conflictos por ruido interno (compañeros) y por expectativas irreales del barrio.',
      anguloInquilino:
        'Visita el piso un viernes noche si puedes; exige normas de terraza común y horarios de visitas.',
    },
    mercado: {
      titulo: 'Habitaciones en Poble-sec',
      intro:
        'Rentas más accesibles que el centro turístico; pisos compartidos cerca de teatros, parques de Montjuïc y la frontera con Sants.',
      rentaOrientativa: 'Habitación orientativa 400–620 € (2026).',
      perfilDemanda: 'Creativos, estudiantes, teletrabajo en habitación amueblada.',
      particularidad: 'Entresuelos y humedad: inventario fotográfico obligatorio.',
    },
    normativa: {
      titulo: 'Habitación Poble-sec',
      intro: 'Código Civil + cláusulas de entorno del barrio.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Entorno y ruido del barrio',
          contenido:
            'Puede pactarse que el inquilino conoce la actividad de ocio cercana sin que ello excuse incumplimientos entre convivientes.',
          bullets: ['Ruido entre habitaciones', 'Terraza común', 'Uso residencial de la habitación'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Poble-sec',
      intro: 'Convivencia + entorno:',
      puntos: [
        { titulo: 'Anexo de estado', texto: 'Humedad y ventilación.' },
        { titulo: 'Normas Blai', texto: 'Horarios opcionales de salida/entrada.' },
        { titulo: 'Gestor 48 h', texto: 'PDF firmable.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Poble-sec',
      intro: 'Evita:',
      bullets: ['Mezclar habitación legal con turismo', 'Fianza sin condiciones de devolución', 'Un solo contrato para todos'],
    },
    paraInquilino: {
      titulo: 'Inquilino Poble-sec',
      intro: 'Revisa:',
      bullets: ['Plantas bajas y ruido de calle', 'Reparto de internet', 'LAU piso entero: enlace al final de página'],
    },
    faqs: [
      {
        q: '¿Contrato LAU en Poble-sec?',
        a: 'Piso completo: /barcelona/contrato-alquiler/montjuic.',
      },
    ],
  },

  sarria: {
    slug: 'sarria',
    nombre: 'Sarrià-Sant Gervasi',
    distrito: 'Sarrià-Sant Gervasi',
    meta: {
      title: 'Contrato habitación Sarrià — piso compartido alto standing · 120€',
      description:
        'Habitación en Sarrià-Sant Gervasi: contrato por inquilino, fianza clara y convivencia en pisos amplios. No es LAU de vivienda entera. 120 €.',
      keywords: ['contrato habitacion sarria', 'alquiler habitacion sant gervasi', 'coliving sarria barcelona'],
      ogTitle: 'Sarrià: habitación en finca señorial compartida',
      ogDescription: 'Rentas altas por habitación — documentación precisa.',
    },
    hero: {
      badge: 'Sarrià · Sant Gervasi · Bonanova',
      h1: 'Sarrià: contrato de habitación cuando alquilas un dormitorio en un piso amplio con parking y vecinos exigentes',
      subtitulo:
        'En Sarrià-Sant Gervasi hay pisos de 150 m² donde el propietario retiene una habitación o alquila dos a profesionales. La renta por habitación es alta; un contrato genérico no cubre parking, trastero ni calidades.',
      anguloPropietario:
        'Delimita habitación, baño compartido o en suite, uso de parking si aplica y estándares de convivencia acordes al barrio.',
      anguloInquilino:
        'Confirma qué zonas son comunes, si hay portería y cómo se actualiza la renta (Código Civil, no índice LAU).',
    },
    mercado: {
      titulo: 'Habitaciones en Sarrià',
      intro:
        'Oferta limitada de habitaciones sueltas frente a demanda de profesionales y posgraduados; rentas por dormitorio entre las más altas de Barcelona.',
      rentaOrientativa: 'Habitación orientativa 700–1.050 € amueblada (2026).',
      perfilDemanda: 'Ejecutivos, investigadores, estudiantes de posgrado internacionales.',
      particularidad: 'Fincas con pocos vecinos y servicios: detalle de comunidad y parking en anexo.',
    },
    normativa: {
      titulo: 'Habitación Sarrià',
      intro: 'Código Civil con cláusulas de calidad y zonas comunes amplias.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Parking y trastero compartidos',
          contenido: 'Si el inquilino usa plaza o trastero, debe constar uso y responsabilidad de daños.',
          bullets: ['Plaza opcional', 'Trastero común', 'Mobiliario de calidad en inventario'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sarrià',
      intro: 'Ticket alto = contrato fino:',
      puntos: [
        { titulo: 'Inventario detallado', texto: 'Calidades y electrodomésticos.' },
        { titulo: 'Fianza proporcional', texto: 'Devolución con plazo fijo.' },
        { titulo: '120 €', texto: 'Asesor Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Sarrià',
      intro: 'Documenta:',
      bullets: ['Estándares de convivencia', 'Uso de terraza o jardín común', 'Prohibición de subarriendo'],
    },
    paraInquilino: {
      titulo: 'Inquilino Sarrià',
      intro: 'Exige:',
      bullets: ['Desglose renta y gastos', 'Identidad del arrendador', 'Preaviso de salida'],
    },
    faqs: [
      {
        q: '¿LAU vivienda completa Sarrià?',
        a: '/barcelona/contrato-alquiler/sarria.',
      },
    ],
  },

  'la-barceloneta': {
    slug: 'la-barceloneta',
    nombre: 'La Barceloneta',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Contrato habitación La Barceloneta — playa y pisos estrechos · 120€',
      description:
        'Habitación en La Barceloneta: contrato para pisos compartidos pequeños, humedad y rotación estacional. Código Civil · 120 € · gestoría 48 h.',
      keywords: ['contrato habitacion barceloneta', 'alquiler habitacion playa barcelona', 'piso compartido barceloneta'],
      ogTitle: 'Barceloneta: habitación (no confundir con piso turístico)',
      ogDescription: 'Pisos estrechos compartidos cerca del mar — uso residencial pactado.',
    },
    hero: {
      badge: 'Barceloneta · playa · Ciutat Vella',
      h1: 'La Barceloneta: contrato de habitación en pisos estrechos donde conviven locales, temporeros y perfiles internacionales',
      subtitulo:
        'La Barceloneta tiene pisos de pocos metros con habitaciones para alquilar suelto. El contrato debe dejar claro uso residencial de la habitación, estado de la finca y convivencia en cocinas minúsculas.',
      anguloPropietario:
        'Evita mezclar habitación legal con alquiler turístico encubierto; identifica la habitación y prohibe subarriendo por días.',
      anguloInquilino:
        'Revisa humedad, ventilación y si la “habitación” cumple mínimos de habitabilidad antes de pagar fianza.',
    },
    mercado: {
      titulo: 'Habitaciones en La Barceloneta',
      intro:
        'Alta rotación y demanda estacional; competencia con alojamientos turísticos ilegales que generan ruido en el edificio.',
      rentaOrientativa: 'Habitación orientativa 450–750 € según temporada y estado (2026).',
      perfilDemanda: 'Trabajadores temporada, deportistas, nómadas en estancias medias.',
      particularidad: 'Fincas expuestas a salitre y humedad: anexo fotográfico vinculante.',
    },
    normativa: {
      titulo: 'Habitación Barceloneta',
      intro: 'Uso residencial de habitación vs turismo en el mismo edificio.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Prohibición de uso turístico de la habitación',
          contenido: 'El contrato de habitación es por meses, no por noches; subarriendo turístico sin permiso expone a sanciones.',
          bullets: ['Estancia mínima', 'Empadronamiento si se pacta', 'Convivencia en escalera común'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Barceloneta',
      intro: 'Piso pequeño compartido:',
      puntos: [
        { titulo: 'Estado e humedad', texto: 'Fotos en anexo.' },
        { titulo: 'Cocina común', texto: 'Turnos y limpieza.' },
        { titulo: '120 €', texto: 'Contrato profesional.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Barceloneta',
      intro: 'Prioriza:',
      bullets: ['Uso residencial claro', 'Inventario de electrodomésticos pequeños', 'Resolución por impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino Barceloneta',
      intro: 'Comprueba:',
      bullets: ['Ventilación real', 'Compañeros y reglas de baño', 'Enlace LAU si alquilan piso entero'],
    },
    faqs: [
      {
        q: '¿LAU en La Barceloneta?',
        a: '/barcelona/contrato-alquiler/la-barceloneta.',
      },
    ],
  },

  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    meta: {
      title: 'Contrato habitación Les Corts — Zona Universitària · 120€',
      description:
        'Habitación en Les Corts y Zona Universitària: contrato para pisos compartidos de estudiantes y familias. Código Civil, 120 € IVA incluido.',
      keywords: ['contrato habitacion les corts', 'alquiler habitacion zona universitaria', 'piso compartido les corts'],
      ogTitle: 'Les Corts: habitación para estudiantes y familias (SEO local)',
      ogDescription: 'Pisos de 4-5 habitaciones cerca del campus — un contrato por inquilino.',
    },
    hero: {
      badge: 'Les Corts · Zona Universitària · Pedralbes frontera',
      h1: 'Les Corts: contrato de habitación en pisos compartidos entre el campus, familias del distrito y profesionales del Hospital',
      subtitulo:
        'Les Corts concentra pisos grandes para alquiler por habitaciones cerca de la UB y ESADE. La rotación en septiembre exige contratos claros de entrada, fianza y salida.',
      anguloPropietario:
        'Si alquilas a estudiantes y a un inquilino estable en el mismo piso, cada uno lleva contrato con duración y preaviso adaptados.',
      anguloInquilino:
        'Verifica distancia al campus, si hay examen de septiembre con cambio de compañeros y cómo se reparte la fianza al sustituir inquilino.',
    },
    mercado: {
      titulo: 'Habitaciones en Les Corts',
      intro:
        'Picos de demanda en inicio de curso; pisos de 4–5 habitaciones en fincas de los años 70–90 con buena conexión a metro Les Corts y Zona Universitària.',
      rentaOrientativa: 'Habitación orientativa 480–780 € (2026).',
      perfilDemanda: 'Estudiantes universitarios, opositores, familias en habitación auxiliar.',
      particularidad: 'Sustitución de inquilino en curso académico: cláusula de preaviso y aprobación del propietario.',
    },
    normativa: {
      titulo: 'Habitación Les Corts',
      intro: 'Código Civil con foco en rotación académica.',
      bloques: [
        ...NORMA_HABITACION_BASE,
        {
          titulo: 'Sustitución de inquilino',
          contenido:
            'Puede pactarse procedimiento cuando un estudiante abandona la habitación a mitad de curso.',
          bullets: ['Preaviso mínimo', 'Búsqueda de sustituto', 'Devolución parcial de fianza'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Les Corts',
      intro: 'Piso compartido académico:',
      puntos: [
        { titulo: 'Calendario curso', texto: 'Duración alineada al curso opcional.' },
        { titulo: 'Internet', texto: 'Fibra compartida en cuota fija.' },
        { titulo: '120 €', texto: 'Inmonest online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Les Corts',
      intro: 'Recomendado:',
      bullets: ['Contrato por habitación', 'Normas de estudio y ruido', 'Inventario al inicio de curso'],
    },
    paraInquilino: {
      titulo: 'Inquilino Les Corts',
      intro: 'Pregunta:',
      bullets: ['Compañeros actuales', 'Reglas septiembre–junio', 'LAU piso entero en Pedralbes frontera'],
    },
    faqs: [
      {
        q: '¿Contrato LAU Les Corts?',
        a: '/barcelona/contrato-alquiler/les-corts.',
      },
    ],
  },
}
