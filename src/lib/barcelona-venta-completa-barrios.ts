import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'

export const BARCELONA_VENTA_COMPLETA_SLUGS = [
  'eixample',
  'gracia',
  'sants',
  'poblenou',
  'les-corts',
  'sarria',
  'sant-andreu',
  'horta-guinardo',
  'ciutat-vella',
  'diagonal-mar',
  'sant-antoni',
  'nou-barris',
] as const

export type BarcelonaVentaCompletaSlug = (typeof BARCELONA_VENTA_COMPLETA_SLUGS)[number]

const BARRIOS: Record<BarcelonaVentaCompletaSlug, BarcelonaCompletaBarrioConfig> = {
  eixample: {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    heroImage: '/gestoria-expertos-calle.jpg',
    meta: {
      title: 'Venta completa Eixample Barcelona — reserva a escritura 687€',
      description:
        'Vende tu piso en el Eixample (Dreta, Esquerra, Sant Antoni) entre particulares: arras, cédula, comunidad y notaría. Pack 687 € IVA incl. Gestor + despacho Les Corts.',
      keywords:
        'vender piso eixample particular, venta completa barcelona, gestoría venta eixample, arras escritura barcelona',
      ogTitle: 'Vender en el Eixample con gestor hasta escritura — 687 €',
      ogDescription: 'Pack venta completa Inmonest en el Eixample: contratos, documentación y coordinación notarial.',
    },
    hero: {
      h1: 'Venta completa en el Eixample: de la señal en finca regia hasta escritura sin comisión de agencia',
      lead:
        'Has encontrado comprador en Dreta, Esquerra o Sant Antoni y no quieres regalar el 3–5 % a una inmobiliaria. Por 687 € te acompañamos con gestor asignado, panel online y cita presencial en nuestro despacho de Les Corts si lo necesitas.',
    },
    mercado: {
      titulo: 'Vender en el Eixample entre particulares',
      intro:
        'Operaciones rápidas, varios interesados y mucha documentación urbanística (ITE, derramas, certificados). El pack cubre reserva, arras y camino a notaría con normativa catalana.',
      puntos: [
        'Coherencia ITP y precio en arras penitenciales',
        'Cédula de habitabilidad y certificado energético al día',
        'Certificado de deudas de comunidad antes de la señal',
      ],
    },
    faqs: [
      {
        q: '¿Incluye la venta completa redactar las arras?',
        a: 'Sí: reserva y arras personalizadas o revisión de borradores del comprador, más checklist documental hasta escritura.',
      },
      {
        q: '¿Puedo acudir presencialmente?',
        a: 'Sí. Despacho en Carrer de Mejía Lequerica 44 (Les Corts), cita previa.',
      },
    ],
  },
  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    heroImage: '/contratodearras.jpg',
    meta: {
      title: 'Venta completa Gràcia — vender piso particular hasta escritura',
      description:
        'Pack venta 687 € en Gràcia: arras, documentación catalana y coordinación con notaría. Gestoría inmobiliaria online + despacho Barcelona.',
      keywords: 'vender piso gracia particular, venta completa gracia, gestor inmobiliario gracia barcelona',
      ogTitle: 'Vender piso en Gràcia: pack reserva a escritura Inmonest',
      ogDescription: '687 € fijos · gestor dedicado · sin comisión sobre el precio del piso.',
    },
    hero: {
      h1: 'Vender tu piso en Gràcia con comprador ya encontrado: pack integral 687 € hasta notaría',
      lead:
        'En Gràcia muchas ventas son boca a boca o por portal. Te blindamos arras, plusvalía orientativa y documentación de fincas centenarias antes de que el comprador exija plazos imposibles.',
    },
    mercado: {
      titulo: 'Gràcia: ventas ágiles, fincas con historia',
      intro:
        'Terrazas, locales integrados y comunidades activas. Revisamos cargas y obras sin licencia que suelen aparecer en edificios del siglo XIX.',
      puntos: [
        'Arras con plazo realista para cancelar hipoteca del vendedor',
        'Revisión de derramas de fachada o ascensor',
        'Coordinación con compradores con hipoteca',
      ],
    },
    faqs: [
      {
        q: '¿Sustituye a una agencia de Gràcia?',
        a: 'No captamos comprador: tú ya lo tienes. Sustituimos la parte jurídica y de cierre que cobraría la agencia en honorarios altos.',
      },
      {
        q: '¿Precio del servicio?',
        a: '687 € IVA incluido, tarifa plana, sin % sobre el precio de venta.',
      },
    ],
  },
  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    heroImage: '/businessman-checking-documents-table.jpg',
    meta: {
      title: 'Venta completa Sants-Montjuïc Barcelona 687€ — particular a escritura',
      description:
        'Vende en Sants, Hostafrancs o zona Montjuïc con gestor hasta escritura. Arras, ITE si procede, notaría. Despacho Les Corts.',
      keywords: 'vender piso sants particular, venta completa sants barcelona, gestoría venta montjuic',
      ogTitle: 'Venta integral en Sants: 687 € hasta escritura',
      ogDescription: 'Gestor inmobiliario, panel online y soporte presencial en Barcelona.',
    },
    hero: {
      h1: 'Venta completa en Sants-Montjuïc: cierra con tu comprador particular sin perder miles en comisión',
      lead:
        'Operaciones familiares, herencias o venta tras anuncio en portal. El pack 687 € incluye contratos, recopilación documental y acompañamiento notarial adaptado a edificios con ITE.',
    },
    mercado: {
      titulo: 'Sants: mezcla de uso residencial y plazos de hipoteca',
      intro:
        'Compradores con financiación necesitan arras con cláusula suspensiva bien redactada. Evitamos penalizaciones desproporcionadas al vendedor.',
      puntos: [
        'Cláusulas de financiación del comprador',
        'ITE y estado del edificio en fincas antiguas',
        'IBI y comunidad al corriente para notaría',
      ],
    },
    faqs: [
      {
        q: '¿Qué pasa si el comprador tarda la hipoteca?',
        a: 'Las arras deben prever prórroga y causa; lo redactamos o corregimos en el pack.',
      },
      {
        q: '¿Trámite solo online?',
        a: 'Online por defecto; presencial en Mejía Lequerica 44 cuando quieras entregar originales.',
      },
    ],
  },
  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    heroImage: '/contrato9.jpg',
    meta: {
      title: 'Venta completa Poblenou y 22@ — pack 687€ hasta escritura',
      description:
        'Vender piso en Poblenou entre particulares: gestoría reserva-escritura, arras LAU compraventa, documentación. Inmonest Barcelona.',
      keywords: 'vender piso poblenou particular, venta completa 22 barcelona, gestoría venta sant marti',
      ogTitle: 'Vender en Poblenou con gestor hasta notaría',
      ogDescription: '687 € · sin comisión inmobiliaria · despacho Les Corts.',
    },
    hero: {
      h1: 'Venta completa en Poblenou y 22@: cierra la operación con comprador particular y expediente ordenado',
      lead:
        'Lofts, pisos rehabilitados y familias del front marítim. Te ayudamos con arras, certificados y coordinación notarial mientras sigues tu día a día con panel y WhatsApp.',
    },
    mercado: {
      titulo: 'Poblenou: compradores exigentes con due diligence',
      intro:
        'Suelen pedir revisión registral antes de señal alta. Anticipamos documentación para no retrasar la venta.',
      puntos: [
        'Nota simple y cargas antes de arras',
        'Reformas con licencia en pisos industriales convertidos',
        'Entrega de llaves y lecturas de suministros',
      ],
    },
    faqs: [
      {
        q: '¿El comprador pide revisión de arras aparte?',
        a: 'El pack vendedor incluye redacción equilibrada; si el comprador trae gestoría, coordinamos plazos.',
      },
      {
        q: '¿687 € incluye notaría?',
        a: 'No: notaría e impuestos van aparte; incluye gestoría Inmonest hasta coordinación y minuta.',
      },
    ],
  },
  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    heroImage: '/gestoria-expertos-calle.jpg',
    meta: {
      title: 'Venta completa Les Corts — despacho Inmonest en tu barrio',
      description:
        'Vende en Les Corts o Pedralbes con pack 687 €. Gestor, panel online y despacho en Carrer de Mejía Lequerica 44 para trámites presenciales.',
      keywords: 'vender piso les corts, venta completa les corts barcelona, gestoría mejía lequerica',
      ogTitle: 'Venta integral Les Corts + despacho a pie de calle',
      ogDescription: 'Reserva a escritura con gestor y oficina en Les Corts.',
    },
    hero: {
      h1: 'Venta completa en Les Corts: gestor online y despacho en Mejía Lequerica a cinco minutos de tu piso',
      lead:
        'Zona Universitària, Pedralbes frontera y familias del distrito. Somos gestoría (no agencia): 687 € por acompañarte hasta escritura, con cita presencial en nuestra oficina cuando lo prefieras.',
    },
    mercado: {
      titulo: 'Les Corts: operaciones cerca del despacho Inmonest',
      intro:
        'Ideal si quieres combinar panel digital con firma de autorizaciones o entrega de documentación en persona.',
      puntos: [
        'Reuniones presenciales con cita en Les Corts',
        'Arras y reserva en castellano o catalán',
        'Seguimiento de hipoteca del comprador',
      ],
    },
    faqs: [
      {
        q: '¿Dónde está el despacho?',
        a: 'Carrer de Mejía Lequerica, 44, Les Corts, 08028 Barcelona.',
      },
      {
        q: '¿Mismo precio que online?',
        a: 'Sí, 687 € IVA incluido; la atención presencial no lleva suplemento.',
      },
    ],
  },
  sarria: {
    slug: 'sarria',
    nombre: 'Sarrià-Sant Gervasi',
    distrito: 'Sarrià-Sant Gervasi',
    heroImage: '/inmobiliaria8.jpg',
    meta: {
      title: 'Venta completa Sarrià-Sant Gervasi — pack 687€ hasta escritura',
      description:
        'Vende piso en Sarrià, Sant Gervasi o Tres Torres entre particulares: arras, documentación premium y notaría. Gestor + despacho Les Corts.',
      keywords: 'vender piso sarria particular, venta completa sant gervasi barcelona, gestoría venta tres torres',
      ogTitle: 'Vender en Sarrià-Sant Gervasi sin comisión de agencia',
      ogDescription: '687 € IVA incl. · gestor dedicado · panel online.',
    },
    hero: {
      h1: 'Venta completa en Sarrià-Sant Gervasi: cierra con tu comprador por 687 € y expediente impecable',
      lead:
        'Operaciones de alto valor, herencias y segundas residencias. Blindamos arras, plusvalía y documentación exigente antes de que el comprador pida descuentos de última hora.',
    },
    mercado: {
      titulo: 'Sarrià-Sant Gervasi: exigencia documental y plazos de hipoteca',
      intro:
        'Compradores con financiación premium y operaciones entre patrimonios familiares. Revisamos cargas, usufructos y comunidades con cuotas elevadas.',
      puntos: [
        'Arras con plazos realistas para cancelación de hipoteca vendedor',
        'Coordinación con asesores del comprador sin ceder tu posición',
        'Checklist notarial alineado con notarías habituales de zona alta',
      ],
    },
    faqs: [
      {
        q: '¿Tramitáis ventas con usufructo vitalicio?',
        a: 'Analizamos nota simple y te indicamos viabilidad registral y cláusulas necesarias antes de firmar reserva.',
      },
    ],
  },
  'sant-andreu': {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    heroImage: '/gestoria4.jpg',
    meta: {
      title: 'Venta completa Sant Andreu Barcelona 687€ — particular a escritura',
      description:
        'Pack venta reserva-escritura en Sant Andreu, La Sagrera y Navas. Arras, cédula, comunidad. Inmonest gestoría.',
      keywords: 'vender piso sant andreu particular, venta completa sagrera, gestor inmobiliario sant andreu',
      ogTitle: 'Vender en Sant Andreu con gestor hasta notaría',
      ogDescription: '687 € fijos · online o despacho Les Corts.',
    },
    hero: {
      h1: 'Venta completa en Sant Andreu: vende entre particulares con gestor y sin pagar comisión al 3 %',
      lead:
        'Familias que venden tras herencia o por traslado. Te acompañamos en arras, certificados de la Generalitat y cierre con comprador que financia.',
    },
    mercado: {
      titulo: 'Sant Andreu: mezcla de finca antigua y obra nueva',
      intro:
        'Reformas con licencia, derramas de ascensor y compradores jóvenes con hipoteca. Anticipamos documentación para no perder la operación.',
      puntos: [
        'ITE y estado del edificio en bloques de años 60–70',
        'Cláusulas de financiación del comprador',
        'Certificado de deudas de comunidad antes de señal',
      ],
    },
    faqs: [
      {
        q: '¿Puedo vender si hay herencia sin adjudicar?',
        a: 'Depende del Registro. En la primera llamada revisamos titularidad y te damos hoja de ruta antes de contratar.',
      },
    ],
  },
  'horta-guinardo': {
    slug: 'horta-guinardo',
    nombre: 'Horta-Guinardó',
    distrito: 'Horta-Guinardó',
    heroImage: '/keys.jpg',
    meta: {
      title: 'Venta completa Horta-Guinardó — gestoría 687€ hasta escritura',
      description:
        'Vender piso en Horta, Guinardó o El Carmel entre particulares. Reserva, arras, notaría. Panel online + despacho Barcelona.',
      keywords: 'vender piso horta particular, venta completa guinardo, gestoría venta el carmel',
      ogTitle: 'Venta integral Horta-Guinardó — Inmonest',
      ogDescription: 'Gestor asignado · sin comisión sobre el precio.',
    },
    hero: {
      h1: 'Venta completa en Horta-Guinardó: de la señal al acta de notaría con un solo gestor',
      lead:
        'Ventas por portal o recomendación en barrios residenciales con pendiente de ITE. El pack 687 € cubre contratos y camino a escritura.',
    },
    mercado: {
      titulo: 'Horta-Guinardó: edificios en revisión técnica',
      intro:
        'Muchas comunidades negocian obras e inspecciones. Verificamos actas y cargas antes de que el comprador reduzca el precio.',
      puntos: [
        'Revisión de derramas y obras en curso',
        'Arras equilibradas para vendedor con hipoteca',
        'Orientación plusvalía municipal en Barcelona',
      ],
    },
    faqs: [
      {
        q: '¿Qué pasa si la ITE es desfavorable?',
        a: 'Te explicamos impacto en la venta y cómo reflejarlo en arras o negociación con el comprador.',
      },
    ],
  },
  'ciutat-vella': {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    heroImage: '/gestoria-expertos-calle.jpg',
    meta: {
      title: 'Venta completa Ciutat Vella — Gòtic, Born, Raval 687€',
      description:
        'Vende en el Gòtic, Born, Barceloneta o Raval entre particulares. Gestoría arras-escritura, cédula y notaría. Inmonest.',
      keywords: 'vender piso gothic quarter, venta completa born barcelona, gestoría venta ciutat vella',
      ogTitle: 'Vender en Ciutat Vella con gestoría premium',
      ogDescription: '687 € · documentación catalana · panel online.',
    },
    hero: {
      h1: 'Venta completa en Ciutat Vella: fincas históricas, comprador encontrado y cierre legal seguro',
      lead:
        'Locales convertidos, protección patrimonial y compradores internacionales. Te ayudamos con arras, certificados y coordinación notarial sin comisión de captación.',
    },
    mercado: {
      titulo: 'Ciutat Vella: complejidad urbanística y turística',
      intro:
        'Licencias, cambios de uso y comunidades exigentes. Revisamos coherencia registral y requisitos antes de fijar señal alta.',
      puntos: [
        'Obras y licencias en edificios protegidos',
        'Nota simple y cargas ocultas',
        'Plazos realistas para compradores con hipoteca',
      ],
    },
    faqs: [
      {
        q: '¿Vendéis pisos con actividad turística previa?',
        a: 'Revisamos normativa aplicable y te orientamos sobre declaraciones y contratos; cada finca es distinta.',
      },
    ],
  },
  'diagonal-mar': {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar i el Front Marítim',
    distrito: 'Sant Martí',
    heroImage: '/gestoria6.jpg',
    meta: {
      title: 'Venta completa Diagonal Mar y Poblenou — 687€ hasta escritura',
      description:
        'Vender piso en Diagonal Mar, Selva de Mar o front marítim entre particulares. Pack Inmonest: arras, due diligence vendedor, notaría.',
      keywords: 'vender piso diagonal mar, venta completa front maritim barcelona, gestoría sant marti venta',
      ogTitle: 'Venta completa Diagonal Mar — gestor asignado',
      ogDescription: '687 € IVA incl. · trámite online o Les Corts.',
    },
    hero: {
      h1: 'Venta completa en Diagonal Mar: cierra tu operación con vistas al mar y gestoría sin comisión inmobiliaria',
      lead:
        'Compradores exigentes que piden due diligence antes de la señal. Entregamos expediente ordenado: arras, certificados y minuta revisada.',
    },
    mercado: {
      titulo: 'Diagonal Mar: operaciones rápidas y compradores corporativos',
      intro:
        'Plazos cortos y documentación impecable. Coordinamos con gestorías del comprador y notarías de zona.',
      puntos: [
        'Arras con condiciones suspensivas bien calibradas',
        'Certificado energético y cédula al día',
        'Seguimiento hipoteca del comprador',
      ],
    },
    faqs: [
      {
        q: '¿Es distinto del pack en Poblenou?',
        a: 'Mismo precio y alcance; esta landing prioriza copy y SEO para Diagonal Mar y edificios de la Vila Olímpica.',
      },
    ],
  },
  'sant-antoni': {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample',
    heroImage: '/contrato6.jpg',
    meta: {
      title: 'Venta completa Sant Antoni — pack 687€ reserva a escritura',
      description:
        'Vende en Sant Antoni (Eixample izquierdo) entre particulares. Arras, documentación Generalitat, notaría. Despacho Les Corts.',
      keywords: 'vender piso sant antoni barcelona, venta completa mercat sant antoni, gestoría venta eixample',
      ogTitle: 'Vender en Sant Antoni con Inmonest',
      ogDescription: '687 € · gestor inmobiliario · panel online.',
    },
    hero: {
      h1: 'Venta completa en Sant Antoni: mercado dinámico, comprador concreto y gestoría 687 € hasta escritura',
      lead:
        'Reformas recientes, locales en planta baja y familias que venden sin agencia. Redactamos reserva y arras adaptadas al mercado del Eixample izquierdo.',
    },
    mercado: {
      titulo: 'Sant Antoni: alta rotación y fincas reformadas',
      intro:
        'Compradores que comparan varias opciones en el mismo distrito. Blindamos plazos y penalizaciones en arras.',
      puntos: [
        'Coherencia entre precio en arras e ITP del comprador',
        'Licencias de obra en reformas integrales',
        'Comunidad y IBI antes de señal',
      ],
    },
    faqs: [
      {
        q: '¿Cubrís también Esquerra de l’Eixample?',
        a: 'Sí. El servicio es el mismo en todo el Eixample; esta página destaca Sant Antoni y zona Mercat.',
      },
    ],
  },
  'nou-barris': {
    slug: 'nou-barris',
    nombre: 'Nou Barris',
    distrito: 'Nou Barris',
    heroImage: '/businessman-checking-documents-table.jpg',
    meta: {
      title: 'Venta completa Nou Barris — vender piso particular 687€',
      description:
        'Pack venta completa en Nou Barris, Verdum, Roquetes o Ciutat Meridiana. Gestor, arras y notaría. Inmonest Barcelona.',
      keywords: 'vender piso nou barris particular, venta completa verdum, gestoría venta roquetes',
      ogTitle: 'Venta integral Nou Barris — sin comisión agencia',
      ogDescription: '687 € fijos · online + despacho Les Corts.',
    },
    hero: {
      h1: 'Venta completa en Nou Barris: vende a particular con gestor y tarifa plana, no con porcentaje de agencia',
      lead:
        'Operaciones familiares y compradores con hipoteca. Te guiamos en arras, certificados y día de firma con lenguaje claro y panel online.',
    },
    mercado: {
      titulo: 'Nou Barris: plazos de financiación y documentación accesible',
      intro:
        'Priorizamos arras comprensibles y checklist de bajo coste para no retrasar la venta por papeles mal preparados.',
      puntos: [
        'Arras penitenciales con plazo hipoteca comprador',
        'Certificado de deudas de comunidad',
        'Soporte hasta notaría en castellano o catalán',
      ],
    },
    faqs: [
      {
        q: '¿Puedo pagar en varios plazos?',
        a: 'El servicio Inmonest se paga al contratar (687 €). La forma de pago del piso al comprador se pacta en arras y escritura.',
      },
    ],
  },
}

export function getBarcelonaVentaCompletaBarrio(slug: string): BarcelonaCompletaBarrioConfig | undefined {
  if (!(BARCELONA_VENTA_COMPLETA_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARRIOS[slug as BarcelonaVentaCompletaSlug]
}

export function getBarcelonaVentaCompletaBarrioPaths(): string[] {
  return BARCELONA_VENTA_COMPLETA_SLUGS.map((b) => `/barcelona/venta-completa/${b}`)
}

export function listBarcelonaVentaCompletaBarrios(): BarcelonaCompletaBarrioConfig[] {
  return BARCELONA_VENTA_COMPLETA_SLUGS.map((s) => BARRIOS[s])
}
