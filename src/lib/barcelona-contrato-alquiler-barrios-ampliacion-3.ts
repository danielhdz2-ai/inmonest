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

export const BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA_3 = [
  'el-raval',
  'sant-antoni',
  'la-barceloneta',
  'hostafrancs',
  'pedralbes',
] as const

export type BarcelonaAlquilerBarrioSlugExtra3 = (typeof BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA_3)[number]

export const BARCELONA_ALQUILER_BARRIOS_EXTRA_3: Record<
  BarcelonaAlquilerBarrioSlugExtra3,
  BarcelonaAlquilerBarrioConfig
> = {
  'el-raval': {
    slug: 'el-raval',
    nombre: 'El Raval',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'LAU El Raval: contrato en fincas centenarias y convivencia multicultural',
      description:
        'Alquiler larga duración en El Raval: edificios protegidos, IRAV en zona tensionada y coliving mal tipificado. Contrato LAU 145 € · 48 h.',
      keywords: ['contrato alquiler el raval', 'LAU raval barcelona', 'alquiler piso raval contrato'],
      ogTitle: 'El Raval: LAU que distingue vivienda habitual de habitación encubierta',
      ogDescription: 'Arrendamiento estable en uno de los barrios más densos de Barcelona.',
    },
    hero: {
      badge: 'El Raval · Ciutat Vella',
      h1: 'El Raval: contrato LAU cuando el piso parece “compartido” pero debe ser vivienda completa',
      subtitulo:
        'Mezcla de familias de larga tradición, estudiantes y pisos señoriales con patios interiores. Un modelo genérico no aclara si alquilas vivienda LAU o habitaciones sin protección.',
      anguloPropietario:
        'Si alquilas piso completo, el LAU debe prohibir subarriendo turístico y fijar uso exclusivo de vivienda habitual.',
      anguloInquilino:
        'Comprueba renta inicial frente a índice de referencia: El Raval suele estar en mercado tensionado.',
    },
    mercado: {
      titulo: 'Alquiler residencial en el Raval',
      intro: 'Alta rotación en plantas bajas; más estabilidad en fincas rehabilitadas del MACBA o Sant Antoni frontera.',
      rentaOrientativa: 'Media en zona tensionada; IRAV frecuente en operaciones nuevas.',
      perfilDemanda: 'Familias, creativos, estudiantes de larga estancia que buscan centro a pie.',
      particularidad: 'Edificios con protección patrimonial: obras y ascensor en cláusula de conocimiento.',
    },
    normativa: {
      titulo: 'LAU El Raval: tensión y finca antigua',
      intro: 'Verificar gran tenedor y referencia de renta antes de fijar importe en contrato.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Convivencia y uso del inmueble',
          contenido:
            'Prohibición de cambio a alquiler por habitaciones o uso turístico sin autorización; inventario detallado en patios y trasteros comunes.',
          bullets: ['Uso vivienda habitual', 'Subarrendamiento acotado a LAU'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU El Raval',
      intro: 'Enfoque uso + referencia de renta:',
      puntos: [
        { titulo: 'IRAV documentado', texto: 'Renta inicial trazable si aplica área tensionada.' },
        { titulo: 'Inventario exhaustivo', texto: 'Humedades y estado en anexo firmado.' },
        { titulo: 'PDF 48 h', texto: 'Gestoría Inmonest online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en El Raval',
      intro: 'Incluye:',
      bullets: ['Prohibición alquiler turístico', 'Fianza INCASÒL', 'Actualización renta legal', 'Cláusulas de obras en finca antigua'],
    },
    paraInquilino: {
      titulo: 'Inquilino en El Raval',
      intro: 'Exige:',
      bullets: ['Duración mínima 5/7 años', 'Desglose de gastos de comunidad', 'Estado real de instalaciones', 'Devolución fianza con criterios claros'],
    },
    faqs: [
      { q: '¿El Raval es solo alquiler temporal?', a: 'No: esta landing es vivienda habitual completa bajo LAU; temporada es otro servicio.' },
      { q: '¿Precio contrato?', a: '145 € IVA incluido en Inmonest, igual en todos los barrios.' },
    ],
  },

  'sant-antoni': {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample',
    meta: {
      title: 'LAU Sant Antoni: contrato tras la supermanzana y mercado de barrio',
      description:
        'Alquiler larga duración en Sant Antoni: pisos reformados, terrazas pequeñas e IRAV. LAU personalizado 145 € · 48 h.',
      keywords: ['contrato alquiler sant antoni', 'LAU eixample sant antoni', 'alquiler mercat sant antoni'],
      ogTitle: 'Sant Antoni: LAU en barrio de moda con fincas del Eixample',
      ogDescription: 'Arrendamiento estable entre Ronda y Comte Borrell.',
    },
    hero: {
      badge: 'Sant Antoni · Eixample',
      h1: 'Sant Antoni: contrato LAU para pisos reformados cuando el mercado sube más rápido que el contrato modelo',
      subtitulo:
        'Demanda de parejas y familias que salen del alquiler compartido; muchos edificios con ascensor estrecho y terrazas interiores. El LAU debe reflejar calidades y no copiar cláusulas de otro distrito.',
      anguloPropietario:
        'Tras reforma integral, incluye inventario de electrodomésticos y límites de obras del inquilino.',
      anguloInquilino:
        'Revisa si la renta respeta referencia en zona tensionada y qué pasa con la terraza comunitaria.',
    },
    mercado: {
      titulo: 'Alquiler en Sant Antoni',
      intro: 'Perfil joven profesional y familias; menos turismo que Gòtic pero presión de precios alta.',
      rentaOrientativa: 'Media-alta; operaciones con IRAV habituales.',
      perfilDemanda: 'Quien busca Eixample a precio algo menor que Dreta o Esquerra.',
      particularidad: 'Reformas recientes: conviene anexo de calidades y fotos en inventario.',
    },
    normativa: {
      titulo: 'LAU Sant Antoni: Eixample y referencia',
      intro: 'Misma normativa catalana que el resto de Barcelona; cambia el perfil del inmueble.',
      bloques: NORMA_REF(),
    },
    blindaje: {
      titulo: 'Blindaje LAU Sant Antoni',
      intro: 'Reforma + renta:',
      puntos: [
        { titulo: 'Inventario con calidades', texto: 'Cocina y climatización listadas.' },
        { titulo: 'Actualización legal', texto: 'Topes Ley de Vivienda 2026.' },
        { titulo: 'Entrega 48 h', texto: 'PDF firmable.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sant Antoni',
      intro: 'Protege:',
      bullets: ['Renta inicial conforme a IRAV si aplica', 'Fianza depositada', 'Resolución por impago clara', 'Mascotas y obras pactadas'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sant Antoni',
      intro: 'Verifica:',
      bullets: ['Prórroga LAU', 'Subidas de renta válidas', 'Estado post-reforma', 'Comunidad y terrazas comunes'],
    },
    faqs: [
      { q: '¿Sant Antoni es zona tensionada?', a: 'Gran parte del Eixample lo está: el contrato debe reflejar referencia de renta cuando proceda.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido.' },
    ],
  },

  'la-barceloneta': {
    slug: 'la-barceloneta',
    nombre: 'La Barceloneta',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'LAU La Barceloneta: contrato junto al mar sin confundir con temporada',
      description:
        'Alquiler vivienda habitual en La Barceloneta: humedad marina, normas comunitarias anti-turismo e IRAV. LAU 145 € · 48 h.',
      keywords: ['contrato alquiler barceloneta', 'LAU barceloneta barcelona', 'alquiler piso playa barcelona contrato'],
      ogTitle: 'Barceloneta: LAU de larga duración lejos del alquiler vacacional',
      ogDescription: 'Arrendamiento estable en fincas marineras y bloques reformados.',
    },
    hero: {
      badge: 'La Barceloneta · Mar',
      h1: 'La Barceloneta: contrato LAU que deja claro que alquilas hogar, no apartamento turístico',
      subtitulo:
        'Comunidades estrictas con el uso turístico, pisos pequeños con salitre y demanda de quien quiere vivir cerca del mar todo el año. El contrato debe alinear estatutos, LAU y realidad del piso.',
      anguloPropietario:
        'Cláusula reforzada de vivienda habitual y sanciones por cambio de uso protegen la finca.',
      anguloInquilino:
        'Pide inventario con humedades y ventilación; el entorno marino acelera desgaste.',
    },
    mercado: {
      titulo: 'Alquiler residencial en Barceloneta',
      intro: 'Menos oferta de larga duración que temporal; quien encuentra LAU estable suele quedarse años.',
      rentaOrientativa: 'Alta para m²; IRAV en operaciones nuevas.',
      perfilDemanda: 'Profesionales, familias pequeñas, gente del barrio que regresa.',
      particularidad: 'Estatutos comunitarios restrictivos: mención en contrato.',
    },
    normativa: {
      titulo: 'LAU Barceloneta: uso y comunidad',
      intro: 'Distinción LAU vs temporada es crítica en este entorno.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Normas de comunidad',
          contenido:
            'Referencia a prohibiciones estatutarias de alquiler turístico y uso de trasteros/playa comunitaria.',
          bullets: ['Vivienda habitual exclusiva', 'Consecuencias por incumplimiento estatutos'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Barceloneta',
      intro: 'Mar + comunidad:',
      puntos: [
        { titulo: 'Anti-turismo contractual', texto: 'Uso LAU explícito.' },
        { titulo: 'Inventario humedades', texto: 'Estado real documentado.' },
        { titulo: 'INCASÒL', texto: 'Fianza en plazo legal.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Barceloneta',
      intro: 'Incluye:',
      bullets: ['Prohibición uso turístico', 'IRAV si aplica', 'Resolución por impago', 'Entrega llaves e inventario'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Barceloneta',
      intro: 'Exige:',
      bullets: ['Duración mínima legal', 'Claridad en subidas', 'Estado ventanas y salitre', 'Normas de la finca adjuntas'],
    },
    faqs: [
      { q: '¿Puedo alquilar por días en Barceloneta con este contrato?', a: 'No: es LAU de larga duración; alquiler vacacional requiere otro marco legal y licencias.' },
      { q: '¿Precio?', a: '145 € IVA incluido.' },
    ],
  },

  hostafrancs: {
    slug: 'hostafrancs',
    nombre: 'Hostafrancs',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'LAU Hostafrancs: contrato entre Sants, la estación y Montjuïc',
      description:
        'Alquiler larga duración en Hostafrancs: familias, pisos en bloques de los 70 e IRAV. Contrato LAU 145 € · 48 h.',
      keywords: ['contrato alquiler hostafrancs', 'LAU hostafrancs barcelona', 'alquiler sants montjuic lau'],
      ogTitle: 'Hostafrancs: LAU estable en barrio obrero bien conectado',
      ogDescription: 'Arrendamiento entre Plaça Espanya y carrer de la Creu Coberta.',
    },
    hero: {
      badge: 'Hostafrancs · Sants-Montjuïc',
      h1: 'Hostafrancs: contrato LAU para familias que priorizan metro y precio sobre “postal” turística',
      subtitulo:
        'Barrio residencial con mezcla de nacionalidades, pisos amplios en fincas horizontales y presión de alquiler estable. El LAU debe cuadrar fianza, duración y actualización sin sorpresas.',
      anguloPropietario:
        'Ideal para propietarios que migran desde alquiler informal: formaliza INCASÒL y topes legales.',
      anguloInquilino:
        'Confirma si hay plaza de parking en anexo y cómo se repercuten derramas en bloques grandes.',
    },
    mercado: {
      titulo: 'Alquiler en Hostafrancs',
      intro: 'Demanda local y familias que vienen de Sants o L’Hospitalet; rotación media.',
      rentaOrientativa: 'Media; algunas calles en área tensionada.',
      perfilDemanda: 'Usuarios de metro L1/L3, plantilla sanitaria, familias con hijos.',
      particularidad: 'Colegios y equipamientos: interés en contratos largos.',
    },
    normativa: {
      titulo: 'LAU Hostafrancs',
      intro: 'Normativa LAU + catalana estándar para Barcelona ciudad.',
      bloques: NORMA_REF(),
    },
    blindaje: {
      titulo: 'Blindaje LAU Hostafrancs',
      intro: 'Familia + finca grande:',
      puntos: [
        { titulo: 'Duración 5/7 años', texto: 'Prórroga clara.' },
        { titulo: 'Derramas', texto: 'Gastos comunidad transparentes.' },
        { titulo: 'PDF 48 h', texto: 'Entrega rápida.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Hostafrancs',
      intro: 'Incluye:',
      bullets: ['Fianza legal', 'Actualización renta válida', 'Inventario', 'Resolución por impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Hostafrancs',
      intro: 'Revisa:',
      bullets: ['Renta vs referencia', 'Estado ascensor', 'Cláusulas de obras', 'Devolución fianza'],
    },
    faqs: [
      { q: '¿Hostafrancs es lo mismo que Sants?', a: 'No: es barrio distinto dentro de Sants-Montjuïc; el LAU se adapta a tu dirección concreta.' },
      { q: '¿Precio contrato?', a: '145 € IVA incluido.' },
    ],
  },

  pedralbes: {
    slug: 'pedralbes',
    nombre: 'Pedralbes',
    distrito: 'Les Corts',
    meta: {
      title: 'LAU Pedralbes: contrato en zona premium con anejos y seguridad',
      description:
        'Alquiler larga duración en Pedralbes: casas y pisos señoriales, parking, portería e IRAV. LAU 145 € · 48 h.',
      keywords: ['contrato alquiler pedralbes', 'LAU pedralbes barcelona', 'alquiler piso pedralbes contrato'],
      ogTitle: 'Pedralbes: LAU que detalla plaza, trastero y servicios de finca',
      ogDescription: 'Arrendamiento de alto standing en Les Corts.',
    },
    hero: {
      badge: 'Pedralbes · Les Corts',
      h1: 'Pedralbes: contrato LAU cuando el alquiler incluye más que “tres habitaciones y cocina”',
      subtitulo:
        'Fincas con conserje, jardín comunitario o plazas dobles. Un LAU estándar no describe anejos ni responsabilidades en zonas comunes premium.',
      anguloPropietario:
        'Describe plaza, trastero y mobiliario de calidad; limita subarrendamiento y uso distinto de vivienda.',
      anguloInquilino:
        'Exige transparencia en cuotas de comunidad elevadas y criterios de devolución de fianza.',
    },
    mercado: {
      titulo: 'Alquiler en Pedralbes',
      intro: 'Perfil expatriado, familia alta renta y profesionales; contratos largos y exigentes.',
      rentaOrientativa: 'Alta; IRAV y gran tenedor a verificar en carteras institucionales.',
      perfilDemanda: 'Diplomáticos, ejecutivos, familias que buscan colegios y zonas verdes.',
      particularidad: 'Anejos múltiples: descripción registral y contractual alineada.',
    },
    normativa: {
      titulo: 'LAU Pedralbes: gran tenedor y anejos',
      intro: 'Muchas fincas en manos de fondos o patrimonios: categoría de arrendador importa en topes.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Anejos y servicios',
          contenido:
            'Parking, trastero, portería y zonas verdes comunes deben figurar en contrato e inventario.',
          bullets: ['Plaza identificada', 'Uso jardín comunitario'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Pedralbes',
      intro: 'Premium + anejos:',
      puntos: [
        { titulo: 'Inventario completo', texto: 'Mobiliario y anejos.' },
        { titulo: 'Gran tenedor', texto: 'Topes de actualización correctos.' },
        { titulo: 'Gestoría 48 h', texto: 'Revisión jurídica incluida.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Pedralbes',
      intro: 'Protege:',
      bullets: ['Anejos listados', 'Fianza INCASÒL', 'Uso exclusivo vivienda', 'Cláusulas de impago'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Pedralbes',
      intro: 'Confirma:',
      bullets: ['Renta y referencia', 'Gastos comunidad', 'Estado instalaciones', 'Duración y prórroga LAU'],
    },
    faqs: [
      { q: '¿Pedralbes comparte LAU con Les Corts “popular”?', a: 'Misma normativa; cambia redacción por anejos, renta y tipo de finca.' },
      { q: '¿Precio?', a: '145 € IVA incluido en Inmonest.' },
    ],
  },
}
