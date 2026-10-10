import type { BarcelonaAlquilerBarrioConfig } from '@/lib/barcelona-contrato-alquiler-barrios'

const NORMA_REF = (): BarcelonaAlquilerBarrioConfig['normativa']['bloques'] => [
  {
    titulo: 'LAU y vivienda habitual de larga duración',
    contenido:
      'Alquiler de vivienda completa como hogar principal: duración mínima catalana (5/7 años), fianza, inventario y cláusulas de resolución conforme a LAU.',
    bullets: ['Prórroga y preaviso', 'Impago y entrega de llaves', 'Inventario vinculante'],
  },
  {
    titulo: 'Ley de Vivienda y actualización de renta',
    contenido:
      'Topes según gran tenedor y área tensionada; cláusulas de IPC o índice deben ser válidas en 2026.',
    bullets: ['Pequeño vs gran tenedor', 'Transparencia en subidas', 'Cláusulas nulas fuera de límite'],
  },
  {
    titulo: 'Cataluña: INCASÒL e IRAV',
    contenido:
      'Depósito de fianza ante INCASÒL cuando corresponda y mención de referencia de renta en mercado tensionado.',
    bullets: ['Plazo depósito fianza', 'Área tensionada si aplica', 'Garantías adicionales acotadas'],
  },
]

export const BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA_2 = [
  'diagonal-mar',
  'nou-barris',
  'el-clot',
  'vila-olimpica',
  'la-marina',
] as const

export type BarcelonaAlquilerBarrioSlugExtra2 = (typeof BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA_2)[number]

export const BARCELONA_ALQUILER_BARRIOS_EXTRA_2: Record<
  BarcelonaAlquilerBarrioSlugExtra2,
  BarcelonaAlquilerBarrioConfig
> = {
  'diagonal-mar': {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar',
    distrito: 'Sant Martí',
    meta: {
      title: 'LAU Diagonal Mar: contrato en torres con piscina comunitaria y plaza fija',
      description:
        'Alquiler larga duración en Diagonal Mar y Front Marítim: grandes comunidades, anejos e IRAV. Contrato 145 € · 48 h.',
      keywords: ['contrato alquiler diagonal mar', 'LAU front maritim barcelona', 'alquiler piso diagonal mar contrato'],
      ogTitle: 'Diagonal Mar: LAU con cuotas de comunidad y trastero en anexo',
      ogDescription: 'Arrendamiento en gran bloque junto al mar: inventario, INCASÒL y topes de renta.',
    },
    hero: {
      badge: 'Diagonal Mar · LAU en gran finca',
      h1: 'Diagonal Mar: contrato LAU que lista plaza, trastero y normas de piscina comunitaria',
      subtitulo:
        'En torres de muchas plantas el alquiler no es “un piso más”: hay reglamentos de zonas comunes, portería y anejos en otro nivel. Un LAU genérico no protege a propietario ni inquilino.',
      anguloPropietario:
        'Si alquilas con parking y trastero incluidos, el contrato debe impedir subarrendo turístico y fijar uso de piscina según estatutos.',
      anguloInquilino:
        'Comprueba en el LAU qué gastos de comunidad se repercuten y si la renta inicial respeta referencia en zona tensionada.',
    },
    mercado: {
      titulo: 'Alquiler residencial junto al mar',
      intro: 'Perfil familiar y expatriados en estancia larga; menos rotación que en zonas turísticas del Gòtic.',
      rentaOrientativa: 'Media-alta; amplias calles en mercado tensionado con IRAV.',
      perfilDemanda: 'Familias, ejecutivos internacionales, propietarios que migran desde Eixample.',
      particularidad: 'Comunidades grandes: certificado de deudas y cuotas actualizadas en anexo.',
    },
    normativa: {
      titulo: 'LAU Diagonal Mar: gran tenedor y referencia de renta',
      intro: 'Muchos bloques pertenecen a fondos o carteras amplias; verificar categoría de arrendador al redactar.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Zonas comunes y servicios',
          contenido:
            'Piscina, gimnasio o jardín comunitario: el arrendatario debe conocer normas y sanciones de la comunidad, referenciadas en contrato.',
          bullets: ['Uso piscina y horarios', 'Cuotas ordinarias y extraordinarias'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Diagonal Mar',
      intro: 'Enfoque comunidad + anejos:',
      puntos: [
        { titulo: 'Inventario completo', texto: 'Plaza, trastero y calidades.' },
        { titulo: 'IRAV si aplica', texto: 'Renta inicial trazable.' },
        { titulo: 'PDF 48 h', texto: 'Gestoría Inmonest online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Diagonal Mar',
      intro: 'Incluye:',
      bullets: ['Prohibición alquiler turístico', 'Fianza INCASÒL', 'Actualización renta legal', 'Entrega llaves y inventario firmado'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Diagonal Mar',
      intro: 'Exige:',
      bullets: ['Duración mínima 5/7 años', 'Desglose cuotas comunidad', 'Estado instalaciones y climatización', 'Devolución fianza con criterios claros'],
    },
    faqs: [
      { q: '¿Diagonal Mar es LAU o temporada?', a: 'Esta landing es vivienda habitual completa bajo LAU; temporada es otro producto.' },
      { q: '¿Precio contrato?', a: '145 € IVA incluido en Inmonest, igual en todos los barrios.' },
    ],
  },

  'nou-barris': {
    slug: 'nou-barris',
    nombre: 'Nou Barris',
    distrito: 'Nou Barris',
    meta: {
      title: 'LAU Nou Barris: contrato en bloques altos con ascensor y renta accesible',
      description:
        'Alquiler larga duración en Nou Barris: comunidades numerosas, familias y topes Ley de Vivienda. 145 € IVA incl.',
      keywords: ['contrato alquiler nou barris', 'LAU barcelona nord', 'alquiler vernou contrato'],
      ogTitle: 'Nou Barris: LAU con cláusulas de ascensor y derramas',
      ogDescription: 'Arrendamiento estable en distrito residencial denso.',
    },
    hero: {
      badge: 'Nou Barris · LAU familiar',
      h1: 'Nou Barris: contrato LAU para pisos en bloques altos cuando la comunidad pesa en la renta neta',
      subtitulo:
        'Renta más baja que el centro, pero cuotas de comunidad, ascensor y derramas pueden sorprender. El LAU debe repercutir gastos conforme a ley y describir estado del inmueble en plantas altas.',
      anguloPropietario:
        'Alquilas en un bloque con obras de ascensor aprobadas: informa al inquilino en anexo para evitar conflictos.',
      anguloInquilino:
        'Verifica ascensor operativo, ITE de finca y si hay derramas pendientes antes de firmar el LAU.',
    },
    mercado: {
      titulo: 'Alquiler de larga duración en el norte de la ciudad',
      intro: 'Demanda local fuerte, contratos estables y menos presión turística que el casco antiguo.',
      rentaOrientativa: 'Entre las más contenidas de Barcelona; IRAV en muchas calles tensionadas.',
      perfilDemanda: 'Familias numerosas, parejas jóvenes, arrendatarios que priorizan metros y precio.',
      particularidad: 'Bloques de muchas viviendas: convivencia y normas de comunidad en cláusulas.',
    },
    normativa: {
      titulo: 'LAU Nou Barris: gastos y duración mínima',
      intro: 'Duración catalana y límites de subida son clave en rentas ya ajustadas.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Comunidad y ascensor',
          contenido: 'Reparaciones en elementos comunes vs vivienda: reparto LAU entre arrendador y arrendatario.',
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Nou Barris',
      intro: 'Transparencia en gastos:',
      puntos: [
        { titulo: 'Cuotas desglosadas', texto: 'Ordinarias y extras conocidas.' },
        { titulo: 'Inventario', texto: 'Estado en planta alta.' },
        { titulo: 'Entrega 48 h', texto: 'PDF firmable.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Nou Barris',
      intro: 'Protege con:',
      bullets: ['Fianza INCASÒL', 'Impago y desahucio LAU', 'Obras del inquilino reguladas', 'Mascotas si las permites'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Nou Barris',
      intro: 'Revisa:',
      bullets: ['Subida renta dentro de tope', 'Ascensor y accesibilidad', 'Humo o filtraciones en terraza', 'Preaviso y prórroga'],
    },
    faqs: [
      { q: '¿Nou Barris está tensionado?', a: 'Gran parte del distrito sí; comprobamos según dirección al redactar.' },
      { q: '¿Habitación compartida?', a: 'No cubre esta landing; es LAU de vivienda entera.' },
    ],
  },

  'el-clot': {
    slug: 'el-clot',
    nombre: 'El Clot',
    distrito: 'Sant Martí',
    meta: {
      title: 'LAU El Clot: contrato entre Glòries, Sagrera y fincas rehabilitadas',
      description:
        'Alquiler vivienda habitual en El Clot: mezcla de edificios viejos y reformados, IRAV. 145 € · 48 h.',
      keywords: ['contrato alquiler el clot', 'LAU clot barcelona', 'alquiler parc del clot contrato'],
      ogTitle: 'El Clot: LAU tras reforma integral en finca de los 60',
      ogDescription: 'Arrendamiento larga duración en barrio en transformación.',
    },
    hero: {
      badge: 'El Clot · LAU en transición',
      h1: 'El Clot: contrato LAU cuando reformas en la finca conviven con obra urbana en Glòries',
      subtitulo:
        'El barrio cambia rápido: pisos reformados en bloques antiguos, ruido de obra temporal y excelente conectividad. El LAU debe reflejar estado real post-reforma y no prometer tranquilidad absoluta.',
      anguloPropietario:
        'Tras invertir en reforma para alquilar, documenta calidades y garantías de instalaciones nuevas en anexo.',
      anguloInquilino:
        'Pregunta por obras en la finca y en la calle; el contrato puede registrar el estado conocido a la firma.',
    },
    mercado: {
      titulo: 'Alquiler conectado y en renovación',
      intro: 'Demanda de quienes trabajan en tech, Sagrera o centro con buen transporte.',
      rentaOrientativa: 'Media; tensionada en muchas calles del Clot y La Sagrera cercana.',
      perfilDemanda: 'Parejas profesionales, familias pequeñas, inquilinos que vienen de Poblenou por precio.',
      particularidad: 'Mezcla de fincas sin ascensor y bloques rehabilitados: descripción precisa en LAU.',
    },
    normativa: {
      titulo: 'LAU El Clot: reforma reciente y obras',
      intro: 'Distinción entre reparaciones del arrendador e imperativas del inquilino según LAU.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Obra en finca o entorno',
          contenido: 'Mención de estado de la vivienda a la firma y obras comunitarias aprobadas si las hay.',
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU El Clot',
      intro: 'Reforma + legalidad:',
      puntos: [
        { titulo: 'Inventario post-obra', texto: 'Cocina, ventanas, suelos.' },
        { titulo: 'Renta e IRAV', texto: 'Coherencia en tensionada.' },
        { titulo: '48 h online', texto: 'Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en El Clot',
      intro: 'Claves:',
      bullets: ['Gran tenedor vs particular', 'INCASÒL', 'Subarrendo prohibido salvo pacto', 'Entrega con inventario fotográfico'],
    },
    paraInquilino: {
      titulo: 'Inquilino en El Clot',
      intro: 'Verifica:',
      bullets: ['Duración mínima catalana', 'Ascensor o planta sin ascensor', 'Calefacción y agua caliente', 'Actualización renta legal'],
    },
    faqs: [
      { q: '¿El Clot es lo mismo que La Sagrera?', a: 'Distritos distintos pero conectados; esta guía LAU es El Clot (Sant Martí).' },
      { q: '¿Enlace con Poblenou LAU?', a: 'Sí, en la misma landing hub Barcelona hay guía específica de Poblenou.' },
    ],
  },

  'vila-olimpica': {
    slug: 'vila-olimpica',
    nombre: 'Vila Olímpica',
    distrito: 'Sant Martí',
    meta: {
      title: 'LAU Vila Olímpica: contrato en torres olímpicas sin confundir con turismo',
      description:
        'Alquiler larga duración en Vila Olímpica y Port Olímpic: uso habitual, ruido de ocio e IRAV. 145 € IVA incl.',
      keywords: ['contrato alquiler vila olimpica', 'LAU torres olimpicas barcelona', 'alquiler piso vila olimpica lau'],
      ogTitle: 'Vila Olímpica: LAU de vivienda habitual frente a apartamento turístico',
      ogDescription: 'Contrato blindado en zona de alta presión turística.',
    },
    hero: {
      badge: 'Vila Olímpica · LAU vs turismo',
      h1: 'Vila Olímpica: contrato LAU que deja claro hogar principal en torres junto al puerto',
      subtitulo:
        'La imagen turística del Port Olímpic no debe mezclarse con un alquiler LAU de larga duración. El contrato tipifica uso habitual, prohíbe subarrendo turístico y regula convivencia con locales de ocio.',
      anguloPropietario:
        'Evita que tu piso LAU se use como apartamento turístico: cláusulas de resolución y cooperación con la comunidad.',
      anguloInquilino:
        'Confirma que firmas LAU de vivienda completa, no temporada encubierta, con duración mínima catalana.',
    },
    mercado: {
      titulo: 'Alquiler en las torres de 1992',
      intro: 'Renta media-alta, vistas y terrazas; presión turística en plantas bajas y entorno nocturno.',
      rentaOrientativa: 'Superior a media Barcelona; zona habitualmente tensionada.',
      perfilDemanda: 'Profesionales, parejas sin hijos, algunas familias en torres tranquilas interior.',
      particularidad: 'Confusión turismo/LAU: redacción precisa imprescindible.',
    },
    normativa: {
      titulo: 'LAU Vila Olímpica: uso de vivienda y estatutos',
      intro: 'Alineación con comunidad de propietarios y normativa catalana de alquiler.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Prohibición de uso turístico',
          contenido: 'Vivienda habitual del arrendatario; subarrendo turístico prohibido salvo supuestos legales y estatutos.',
          bullets: ['Resolución por cambio de uso', 'Declaración de ocupación habitual'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Vila Olímpica',
      intro: 'Uso y entorno:',
      puntos: [
        { titulo: 'Uso habitual', texto: 'Declaración expresa.' },
        { titulo: 'Entorno portuario', texto: 'Conocimiento de ocio cercano.' },
        { titulo: 'PDF 48 h', texto: 'Entrega online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Vila Olímpica',
      intro: 'Incluye:',
      bullets: ['Anti-turismo en cláusulas', 'Fianza INCASÒL', 'Inventario terraza y vistas', 'Topes subida renta'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Vila Olímpica',
      intro: 'Asegura:',
      bullets: ['5/7 años mínimos', 'Ruido previsible del entorno', 'Gastos comunidad con piscina si hay', 'Referencia renta si IRAV'],
    },
    faqs: [
      { q: '¿Puedo alquilar LAU con vistas al mar?', a: 'Sí, vivienda habitual; el LAU describe el inmueble, no un régimen turístico.' },
      { q: '¿Relación con Diagonal Mar?', a: 'Mismo distrito Sant Martí; mercado y edificio cambian: guías LAU separadas.' },
    ],
  },

  'la-marina': {
    slug: 'la-marina',
    nombre: 'La Marina del Prat Vermell',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'LAU La Marina: contrato en vivienda nueva junto a Sants-La Sagrera',
      description:
        'Alquiler larga duración en La Marina del Prat Vermell: promociones nuevas, parking y Ley de Vivienda. 145 €.',
      keywords: ['contrato alquiler la marina barcelona', 'LAU prat vermell', 'alquiler sants sagrera nuevo contrato'],
      ogTitle: 'La Marina: LAU en piso a estrenar con certificado energético en anexo',
      ogDescription: 'Arrendamiento en barrio emergente de Barcelona.',
    },
    hero: {
      badge: 'La Marina · LAU en zona nueva',
      h1: 'La Marina del Prat Vermell: contrato LAU en promociones recientes con parking y eficiencia energética',
      subtitulo:
        'Muchos alquileres son primeras ocupaciones en edificios nuevos. El LAU debe reflejar garantías de constructora ya consumidas, domótica, parking subterráneo y cuotas de comunidad en fase de estabilización.',
      anguloPropietario:
        'Alquilas piso recién entregado: no copies LAU de finca antigua; incluye electrodomésticos, aerotermia o gas, y reglas de parking subterráneo.',
      anguloInquilino:
        'Comprueba libro del edificio, certificado energético y si la renta inicial cumple referencia en área tensionada.',
    },
    mercado: {
      titulo: 'Alquiler en barrio en construcción',
      intro: 'Oferta nueva atrae familias e inquilinos que buscan eficiencia y cercanía a Sants y La Sagrera.',
      rentaOrientativa: 'Media, con picos en promociones premium; IRAV según calle.',
      perfilDemanda: 'Familias jóvenes, teletrabajo, relocations vinculadas a infraestructura ferroviaria.',
      particularidad: 'Entorno aún en obra: cláusula de conocimiento del barrio en formación.',
    },
    normativa: {
      titulo: 'LAU La Marina: vivienda nueva y garantías',
      intro: 'Reparaciones por defectos de construcción vs uso del inquilino según LAU y garantía decenal del promotor.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Primera ocupación',
          contenido: 'Inventario exhaustivo y listado de equipamiento incluido en promociones de alquiler.',
          bullets: ['Parking y trastero en anexo', 'Incidencias de garantía del propietario'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU La Marina',
      intro: 'Piso nuevo, marco LAU clásico:',
      puntos: [
        { titulo: 'Inventario a estrenar', texto: 'Mobiliario y domótica.' },
        { titulo: 'INCASÒL', texto: 'Fianza trazable.' },
        { titulo: '48 h', texto: 'Gestor Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en La Marina',
      intro: 'Protege:',
      bullets: ['Uso vivienda habitual', 'Reglas parking comunitario', 'Actualización renta 2026', 'Resolución por impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino en La Marina',
      intro: 'Revisa:',
      bullets: ['Duración mínima', 'Obra en calles adyacentes', 'Gastos comunidad en edificio nuevo', 'Devolución fianza'],
    },
    faqs: [
      { q: '¿La Marina es Poble-sec?', a: 'No: es La Marina del Prat Vermell; Poble-sec tiene su guía LAU (montjuic).' },
      { q: '¿Mismo precio Inmonest?', a: '145 € IVA incluido, personalización por dirección incluida.' },
    ],
  },
}
