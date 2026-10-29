import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'

export const BARCELONA_COMPRA_COMPLETA_SLUGS = [
  'eixample',
  'gracia',
  'les-corts',
  'sarria',
  'poblenou',
  'sants',
  'sant-andreu',
  'horta-guinardo',
  'ciutat-vella',
  'diagonal-mar',
  'sant-antoni',
  'nou-barris',
  'pedralbes',
  'barceloneta',
  'el-born',
  'hostafrancs',
  'el-carmel',
] as const

export type BarcelonaCompraCompletaSlug = (typeof BARCELONA_COMPRA_COMPLETA_SLUGS)[number]

const BARRIOS: Record<BarcelonaCompraCompletaSlug, BarcelonaCompletaBarrioConfig> = {
  eixample: {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    heroImage: '/olena-kholina-MhqUBTxQ3Hw-unsplash.jpg',
    meta: {
      title: 'Compra completa Eixample — comprar piso particular hasta escritura 687€',
      description:
        'Compra piso en el Eixample entre particulares: due diligence, arras con cláusula hipoteca y notaría. Pack 687 €. Despacho Les Corts.',
      keywords:
        'comprar piso eixample particular, compra completa barcelona, gestoría comprador eixample',
      ogTitle: 'Comprar en el Eixample con gestor hasta escritura',
      ogDescription: '687 € IVA incl. · revisión documental · panel online.',
    },
    hero: {
      h1: 'Compra completa en el Eixample: due diligence, arras blindadas y camino a escritura por 687 €',
      lead:
        'Negociaste en Dreta o Esquerra con un particular y no quieres firmar arras a ciegas. Revisamos cargas, comunidad y condiciones de hipoteca antes de que entregues la señal.',
    },
    mercado: {
      titulo: 'Comprar en el Eixample sin sorpresas registrales',
      intro:
        'Fincas con usufructos, locales anexos y derramas de fachada. El pack comprador prioriza documentación antes de arras.',
      puntos: [
        'Nota simple y coherencia catastral',
        'Cláusula suspensiva de financiación',
        'Plazo para cédula e ITE si el edificio la exige',
      ],
    },
    faqs: [
      {
        q: '¿Incluye due diligence completa?',
        a: 'Incluye revisión documental integrada en el pack compra; si necesitas informe ampliado, combinamos con pack due diligence.',
      },
      {
        q: '¿Atención presencial?',
        a: 'Despacho en Mejía Lequerica 44, Les Corts, con cita previa.',
      },
    ],
  },
  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    heroImage: '/contratodearras.jpg',
    meta: {
      title: 'Compra completa Gràcia Barcelona — pack comprador 687€',
      description:
        'Compra piso en Gràcia de particular a particular con gestor hasta escritura. Arras, revisión legal, notaría.',
      keywords: 'comprar piso gracia particular, compra completa gracia, gestor comprador barcelona',
      ogTitle: 'Comprar en Gràcia: pack reserva a escritura',
      ogDescription: 'Gestoría inmobiliaria online + despacho Barcelona.',
    },
    hero: {
      h1: 'Compra completa en Gràcia: revisa arras y comunidad antes de pagar señal en una finca de vecindario',
      lead:
        'Compradores entre particulares en Gràcia suelen competir por precio; nosotros competimos por que no heredes deudas ni cláusulas abusivas en el contrato.',
    },
    mercado: {
      titulo: 'Gràcia: compras emocionales, riesgo documental real',
      intro:
        'Terrazas ilegalizadas, reformas antiguas y actas de comunidad conflictivas. El gestor te dice qué pedir al vendedor y cuándo.',
      puntos: [
        'Revisión de arras del vendedor o redacción conjunta',
        'Certificado de deudas de comunidad',
        'Orientación ITP Cataluña',
      ],
    },
    faqs: [
      {
        q: '¿Puedo contratar solo si ya tengo borrador de arras?',
        a: 'Sí: el pack compra completa cubre revisión, corrección y seguimiento hasta escritura.',
      },
      {
        q: '¿687 € incluye impuesto ITP?',
        a: 'No; incluye gestoría Inmonest. Te orientamos en autoliquidación.',
      },
    ],
  },
  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    heroImage: '/gestor-experto-oficina.jpg',
    meta: {
      title: 'Compra completa Les Corts — gestor + despacho Mejía Lequerica',
      description:
        'Comprar piso en Les Corts o Zona Universitària con pack 687 €. Panel online y oficina física Carrer de Mejía Lequerica 44.',
      keywords: 'comprar piso les corts, compra completa barcelona despacho, gestoría les corts',
      ogTitle: 'Comprar en Les Corts con despacho Inmonest cerca',
      ogDescription: 'Pack comprador hasta escritura · cita presencial disponible.',
    },
    hero: {
      h1: 'Compra completa en Les Corts: tu gestor online y reunión presencial en nuestro despacho del distrito',
      lead:
        'Pisos de familias, inversores o estudiantes de la zona universitaria. Centralizamos documentación en el panel y, si lo prefieres, revisamos contigo las arras en Mejía Lequerica 44.',
    },
    mercado: {
      titulo: 'Les Corts: comprador con soporte a pie de calle',
      intro:
        'Útil cuando quieres entregar cheques, originales o resolver dudas cara a cara antes de la señal.',
      puntos: [
        'Despacho en el propio distrito',
        'Coordinación con vendedores particulares',
        'Seguimiento hipoteca y tasación',
      ],
    },
    faqs: [
      {
        q: '¿Dirección del despacho?',
        a: 'Carrer de Mejía Lequerica, 44, Les Corts, 08028 Barcelona.',
      },
      {
        q: '¿Es lo mismo que due diligence 350 €?',
        a: 'El pack 687 € es integral hasta escritura; la due diligence suelta es solo auditoría previa.',
      },
    ],
  },
  sarria: {
    slug: 'sarria',
    nombre: 'Sarrià-Sant Gervasi',
    distrito: 'Sarrià-Sant Gervasi',
    heroImage: '/comercial1.jpg',
    meta: {
      title: 'Compra completa Sarrià-Sant Gervasi — piso particular 687€',
      description:
        'Comprar vivienda en Sarrià, Sant Gervasi o Tres Torres entre particulares. Gestoría compra completa hasta escritura.',
      keywords: 'comprar piso sarria particular, compra completa sarrià barcelona, gestor comprador alto standing',
      ogTitle: 'Comprar en Sarrià con pack 687 € hasta notaría',
      ogDescription: 'Revisión registral y arras para operaciones de mayor cuantía.',
    },
    hero: {
      h1: 'Compra completa en Sarrià-Sant Gervasi: operaciones de alto importe con revisión registral exigente',
      lead:
        'Chalets, pisos señorial y parkings anexos. Por 687 € acompañamos desde arras hasta escritura con atención al detalle en cargas, anejos y plazos del vendedor.',
    },
    mercado: {
      titulo: 'Sarrià: más anejos, más complejidad registral',
      intro:
        'Garajes, trasteros y multipropiedad. Verificamos descripción registral y coherencia en contrato.',
      puntos: [
        'Anejos en escritura y arras',
        'Herencias y proindiviso entre copropietarios',
        'Plazos amplios si hay cancelación hipotecaria',
      ],
    },
    faqs: [
      {
        q: '¿Precio fijo aunque el piso cueste más de un millón?',
        a: 'Sí, 687 € IVA incluido sin comisión sobre el precio de compra.',
      },
      {
        q: '¿Presencial en Barcelona?',
        a: 'Sí, despacho Les Corts (Mejía Lequerica 44) con cita.',
      },
    ],
  },
  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    heroImage: '/contrato5.jpg',
    meta: {
      title: 'Compra completa Poblenou — comprar a particular hasta escritura',
      description:
        'Pack comprador 687 € en Poblenou y 22@: arras, documentación, notaría. Gestoría Inmonest Barcelona.',
      keywords: 'comprar piso poblenou particular, compra completa 22@, gestoría comprador sant marti',
      ogTitle: 'Comprar en Poblenou: gestor hasta escritura',
      ogDescription: '687 € · panel online · despacho Les Corts.',
    },
    hero: {
      h1: 'Compra completa en Poblenou: cierra tu piso con particular sin cláusulas copiadas de internet',
      lead:
        'Rehabilitaciones, viviendas de nueva planta y segundas residencias. Revisamos arras penitenciales y estado del edificio antes de que transfieras la señal.',
    },
    mercado: {
      titulo: 'Poblenou: comprador profesional, plazos de obra reciente',
      intro:
        'Licencias de reforma y certificados recientes suelen ser el cuello de botella. Lo integramos en el calendario hasta escritura.',
      puntos: [
        'Licencias de obra en lofts reformados',
        'Arras con resolución si falla documentación',
        'Coordinación con promotor-vendedor particular',
      ],
    },
    faqs: [
      {
        q: '¿Trabajáis con hipoteca?',
        a: 'Sí: cláusula de financiación y plazos alineados con el banco.',
      },
      {
        q: '¿Dónde firmo documentación presencial?',
        a: 'En el despacho Inmonest, Mejía Lequerica 44, o 100 % online.',
      },
    ],
  },
  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    heroImage: '/businessman-checking-documents-table.jpg',
    meta: {
      title: 'Compra completa Sants-Montjuïc — pack 687€ hasta escritura',
      description:
        'Compra piso en Sants o Hostafrancs a particular: due diligence, arras con hipoteca, notaría. Inmonest Barcelona.',
      keywords: 'comprar piso sants particular, compra completa montjuic, gestoría comprador sants',
      ogTitle: 'Comprar en Sants con gestor hasta escritura',
      ogDescription: '687 € IVA incl. · panel online.',
    },
    hero: {
      h1: 'Compra completa en Sants-Montjuïc: due diligence, arras blindadas y camino a notaría por 687 €',
      lead:
        'Fincas con ITE y compradores con financiación. Revisamos cargas y cláusulas antes de entregar la señal.',
    },
    mercado: {
      titulo: 'Sants: ITE y plazos de hipoteca',
      intro: 'Priorizamos cláusula suspensiva y certificado de deudas de comunidad.',
      puntos: ['Nota simple y cargas', 'Cláusula de financiación', 'Coordinación notaría'],
    },
    faqs: [{ q: '¿Incluye revisión de arras del vendedor?', a: 'Sí, redacción o corrección en el pack completo.' }],
  },
  'sant-andreu': {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    heroImage: '/gestoria4.jpg',
    meta: {
      title: 'Compra completa Sant Andreu Barcelona 687€',
      description: 'Comprar piso en Sant Andreu o La Sagrera entre particulares. Pack Inmonest hasta escritura.',
      keywords: 'comprar piso sant andreu particular, compra completa sagrera',
      ogTitle: 'Comprar en Sant Andreu — gestoría premium',
      ogDescription: '687 € · despacho Les Corts.',
    },
    hero: {
      h1: 'Compra completa en Sant Andreu: compra a particular con revisión documental real',
      lead: 'Herencias en venta, reformas recientes y hipoteca en trámite. Un gestor te guía hasta escritura.',
    },
    mercado: {
      titulo: 'Sant Andreu: finca variada y documentación heterogénea',
      intro: 'Verificamos licencias y comunidad antes de arras.',
      puntos: ['Due diligence previa a señal', 'Arras con plazos realistas', 'Seguimiento banco'],
    },
    faqs: [{ q: '¿Precio plano?', a: '687 € IVA incluido sin % sobre el precio del piso.' }],
  },
  'horta-guinardo': {
    slug: 'horta-guinardo',
    nombre: 'Horta-Guinardó',
    distrito: 'Horta-Guinardó',
    heroImage: '/keys.jpg',
    meta: {
      title: 'Compra completa Horta-Guinardó — 687€ hasta escritura',
      description: 'Comprar en Horta, Guinardó o El Carmel a particular. Gestor Inmonest Barcelona.',
      keywords: 'comprar piso horta particular, compra completa guinardo',
      ogTitle: 'Comprar en Horta-Guinardó con gestor',
      ogDescription: '687 € · online o presencial.',
    },
    hero: {
      h1: 'Compra completa en Horta-Guinardó: no firmes arras sin revisar ITE y derramas',
      lead: 'El pack cubre auditoría documental, arras y coordinación con notaría.',
    },
    mercado: {
      titulo: 'Horta-Guinardó: edificios en obras',
      intro: 'Derramas e ITE son frecuentes; las detectamos antes de la señal.',
      puntos: ['Actas de comunidad', 'Cédula y certificado energético', 'Minuta pre-escritura'],
    },
    faqs: [{ q: '¿Online?', a: 'Sí, con panel y videollamada; presencial en Les Corts opcional.' }],
  },
  'ciutat-vella': {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    heroImage: '/gestoria-expertos-calle.jpg',
    meta: {
      title: 'Compra completa Ciutat Vella — Gòtic, Born 687€',
      description: 'Comprar piso en Ciutat Vella entre particulares. Due diligence, arras, notaría.',
      keywords: 'comprar piso gothic barcelona, compra completa born particular',
      ogTitle: 'Comprar en Ciutat Vella — Inmonest',
      ogDescription: '687 € · gestor asignado.',
    },
    hero: {
      h1: 'Compra completa en Ciutat Vella: compra entre particulares con due diligence en finca histórica',
      lead: 'Licencias, protección patrimonial y vendedores internacionales. Revisamos todo antes de comprometerte.',
    },
    mercado: {
      titulo: 'Ciutat Vella: máxima cautela documental',
      intro: 'Coherencia registral y urbanística es crítica.',
      puntos: ['Nota simple exhaustiva', 'Obras y licencias', 'Cláusulas de arras robustas'],
    },
    faqs: [{ q: '¿Compradores extranjeros?', a: 'Sí, adaptamos checklist y plazos con el vendedor.' }],
  },
  'diagonal-mar': {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar i el Front Marítim',
    distrito: 'Sant Martí',
    heroImage: '/gestoria6.jpg',
    meta: {
      title: 'Compra completa Diagonal Mar — pack 687€',
      description: 'Comprar en Diagonal Mar o front marítim a particular. Gestoría Inmonest.',
      keywords: 'comprar piso diagonal mar, compra completa vila olimpica',
      ogTitle: 'Comprar en Diagonal Mar con gestor',
      ogDescription: '687 € IVA incl.',
    },
    hero: {
      h1: 'Compra completa en Diagonal Mar: due diligence rápida y arras listas para hipoteca',
      lead: 'Operaciones con plazos cortos. Revisamos minuta y documentación del edificio.',
    },
    mercado: {
      titulo: 'Diagonal Mar: compradores exigentes',
      intro: 'Documentación impecable acelera la operación.',
      puntos: ['Arras con hipoteca', 'Certificados al día', 'Coordinación notaría'],
    },
    faqs: [{ q: '¿Due diligence incluida?', a: 'Sí, revisión documental integral en el pack 687 €.' }],
  },
  'sant-antoni': {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample',
    heroImage: '/contrato6.jpg',
    meta: {
      title: 'Compra completa Sant Antoni — 687€ hasta escritura',
      description: 'Comprar piso en Sant Antoni entre particulares. Inmonest gestoría Barcelona.',
      keywords: 'comprar piso sant antoni, compra completa eixample izquierdo',
      ogTitle: 'Comprar en Sant Antoni — pack completo',
      ogDescription: '687 € · panel online.',
    },
    hero: {
      h1: 'Compra completa en Sant Antoni: compra en el Eixample izquierdo con gestor hasta notaría',
      lead: 'Reformas recientes y mercado competitivo. Blindamos tu señal con cláusulas revisadas.',
    },
    mercado: {
      titulo: 'Sant Antoni: rotación alta',
      intro: 'Plazos cortos; conviene revisar arras en 48 h.',
      puntos: ['Revisión de borrador de arras', 'Comunidad e IBI', 'ITP orientativo Cataluña'],
    },
    faqs: [{ q: '¿687 € incluye impuestos?', a: 'No; ITP y notaría aparte. Incluye gestoría Inmonest.' }],
  },
  'nou-barris': {
    slug: 'nou-barris',
    nombre: 'Nou Barris',
    distrito: 'Nou Barris',
    heroImage: '/businessman-checking-documents-table.jpg',
    meta: {
      title: 'Compra completa Nou Barris — comprar a particular 687€',
      description: 'Pack comprador en Nou Barris, Verdum o Roquetes. Gestor hasta escritura.',
      keywords: 'comprar piso nou barris particular, compra completa verdum',
      ogTitle: 'Comprar en Nou Barris — Inmonest',
      ogDescription: '687 € fijos.',
    },
    hero: {
      h1: 'Compra completa en Nou Barris: compra segura a particular sin pagar comisión de agencia',
      lead: 'Te acompañamos en arras, hipoteca y escritura con lenguaje claro y panel online.',
    },
    mercado: {
      titulo: 'Nou Barris: operaciones familiares',
      intro: 'Checklist accesible y arras comprensibles.',
      puntos: ['Due diligence básica ampliada', 'Financiación comprador', 'Cierre notarial'],
    },
    faqs: [{ q: '¿Primera compra?', a: 'Te explicamos cada fase; el gestor responde por WhatsApp.' }],
  },
  pedralbes: {
    slug: 'pedralbes',
    nombre: 'Pedralbes',
    distrito: 'Les Corts / Sarrià-Sant Gervasi',
    heroImage: '/inmobiliaria8.jpg',
    meta: {
      title: 'Comprar piso en Pedralbes a particular — compra completa 687€ hasta escritura',
      description:
        'Compra completa Pedralbes: due diligence, arras con cláusula hipoteca, ITP Cataluña y notaría. Gestor Inmonest sin comisión de agencia.',
      keywords: 'comprar piso pedralbes particular, compra completa pedralbes, gestoría comprador zona alta barcelona',
      ogTitle: 'Comprar en Pedralbes con gestor hasta notaría',
      ogDescription: '687 € IVA incl. · revisión documental premium.',
    },
    hero: {
      h1: 'Compra completa en Pedralbes: due diligence exigente, arras blindadas y camino a escritura por 687 €',
      lead:
        'Operaciones de precio elevado exigen revisión registral fina antes de señal. No pagas comisión de captación: pagas gestoría plana con panel y despacho en Les Corts.',
    },
    mercado: {
      titulo: 'Pedralbes: comprador profesional y vendedor con asesor',
      intro:
        'Suelen existir dos gestorías en la mesa. Alineamos plazos, condiciones suspensivas y documentación para notaría de alto valor.',
      puntos: [
        'Nota simple, usufructos y cargas ocultas',
        'Cláusula de financiación con plazo realista',
        'Revisión de minuta pre-escritura',
      ],
    },
    faqs: [
      {
        q: '¿687 € cubre tasación hipotecaria?',
        a: 'No; el banco gestiona tasación. Incluye gestoría Inmonest documental y contractual.',
      },
      {
        q: '¿Due diligence antes de arras?',
        a: 'Sí, es el núcleo del paso 2 del pack compra completa.',
      },
      {
        q: '¿Despacho cerca de Pedralbes?',
        a: 'Mejía Lequerica 44 (Les Corts), cita previa sin suplemento.',
      },
    ],
  },
  barceloneta: {
    slug: 'barceloneta',
    nombre: 'La Barceloneta',
    distrito: 'Ciutat Vella',
    heroImage: '/gestoria6.jpg',
    meta: {
      title: 'Comprar piso La Barceloneta entre particulares — pack 687€ compra completa',
      description:
        'Compra en La Barceloneta: revisión arras, licencias, ITE y notaría. Gestor comprador Inmonest Barcelona.',
      keywords: 'comprar piso barceloneta particular, compra completa playa barcelona, due diligence barceloneta',
      ogTitle: 'Comprar en La Barceloneta con gestor Inmonest',
      ogDescription: '687 € fijos · sin comisión inmobiliaria.',
    },
    hero: {
      h1: 'Compra completa en La Barceloneta: no firmes arras en un piso de playa sin revisar licencias y comunidad',
      lead:
        'Fincas con historial turístico, humedades ocultas o derramas de fachada. El pack 687 € incluye auditoría documental y arras a tu favor antes de transferir la señal.',
    },
    mercado: {
      titulo: 'Barceloneta: máxima cautela antes de señal alta',
      intro:
        'Compradores internacionales y locales compiten por stock limitado. Revisamos lo urgente en 48–72 h cuando la operación va rápido.',
      puntos: [
        'ITE y certificado energético vigentes',
        'Actas de comunidad y obras de fachada',
        'Coherencia descripción registral vs. realidad',
      ],
    },
    faqs: [
      {
        q: '¿Compráis con hipoteca extranjera?',
        a: 'Adaptamos cláusulas y plazos; el gestor coordina con vendedor y notaría.',
      },
      {
        q: '¿ITP en Cataluña?',
        a: 'Te orientamos; el impuesto lo liquida el comprador aparte del precio.',
      },
    ],
  },
  'el-born': {
    slug: 'el-born',
    nombre: 'El Born',
    distrito: 'Ciutat Vella',
    heroImage: '/contrato9.jpg',
    meta: {
      title: 'Compra completa El Born (La Ribera) — comprar a particular 687€ Barcelona',
      description:
        'Pack comprador El Born: due diligence en finca histórica, arras, hipoteca y escritura. Inmonest gestoría.',
      keywords: 'comprar piso el born particular, compra completa la ribera, gestor comprador ciutat vella',
      ogTitle: 'Comprar en El Born — pack integral 687 €',
      ogDescription: 'Panel online · Les Corts presencial.',
    },
    hero: {
      h1: 'Compra completa en El Born: due diligence en edificio protegido y arras con cláusula hipoteca por 687 €',
      lead:
        'La Ribera atrae compradores exigentes. Revisamos obras, licencias y cargas del vendedor antes de que entregues una señal difícil de recuperar.',
    },
    mercado: {
      titulo: 'El Born: patrimonio y plazos de operación rápida',
      intro:
        'Operaciones competitivas requieren gestor que responda el mismo día. Panel + WhatsApp directo con tu gestor asignado.',
      puntos: [
        'Revisión registral y urbanística orientativa',
        'Arras penitenciales con condiciones suspensivas',
        'Seguimiento banco hasta pre-escritura',
      ],
    },
    faqs: [
      {
        q: '¿Piso con inquilino?',
        a: 'Analizamos contrato de alquiler vigente y plazo a vacío si aplica.',
      },
      {
        q: '¿Mismo precio que otras zonas?',
        a: '687 € IVA incluido en todo Barcelona; sin % sobre el precio de compra.',
      },
    ],
  },
  hostafrancs: {
    slug: 'hostafrancs',
    nombre: 'Hostafrancs',
    distrito: 'Sants-Montjuïc',
    heroImage: '/gestoria4.jpg',
    meta: {
      title: 'Compra completa Hostafrancs — comprar piso particular Sants-Montjuïc 687€',
      description:
        'Compra piso Hostafrancs o Plaça Espanya a particular. Due diligence, arras, notaría. Gestor Inmonest.',
      keywords: 'comprar piso hostafrancs particular, compra completa sants, gestoría comprador montjuic',
      ogTitle: 'Comprar en Hostafrancs con gestor hasta escritura',
      ogDescription: '687 € · online o despacho Les Corts.',
    },
    hero: {
      h1: 'Compra completa en Hostafrancs: compra segura a particular con revisión de arras e ITE del edificio',
      lead:
        'Precios más accesibles que el Eixample pero mismos riesgos documentales. El pack te acompaña desde la primera visita seria hasta escritura.',
    },
    mercado: {
      titulo: 'Hostafrancs: financiación hipotecaria habitual',
      intro:
        'Cláusula suspensiva mal redactada cuesta miles. Redactamos o corregimos arras con plazo alineado a tu banco.',
      puntos: [
        'Due diligence comunidad e IBI',
        'Negociación documental con vendedor',
        'Coordinación fecha notaría',
      ],
    },
    faqs: [
      {
        q: '¿Primera vivienda en Barcelona?',
        a: 'El gestor explica ITP, provisión de fondos y orden de firma hipoteca-escritura.',
      },
      {
        q: '¿687 € incluye notaría?',
        a: 'No; incluye gestoría Inmonest hasta coordinación y revisión de minuta.',
      },
    ],
  },
  'el-carmel': {
    slug: 'el-carmel',
    nombre: 'El Carmel',
    distrito: 'Horta-Guinardó',
    heroImage: '/keys.jpg',
    meta: {
      title: 'Compra completa El Carmel — comprar piso Horta-Guinardó particular 687€',
      description:
        'Comprar en El Carmel o Turó de la Rovira entre particulares. Pack 687 €: arras, derramas, notaría. Inmonest.',
      keywords: 'comprar piso el carmel particular, compra completa turó barcelona, gestor comprador horta',
      ogTitle: 'Comprar en El Carmel — gestoría premium plana',
      ogDescription: 'Sin comisión agencia · gestor 24 h.',
    },
    hero: {
      h1: 'Compra completa en El Carmel: detecta derramas e ITE antes de pagar señal a un particular',
      lead:
        'Edificios en obras y pendiente de inspección. Revisamos actas y nota simple para que no heredes deudas de comunidad en el precio.',
    },
    mercado: {
      titulo: 'El Carmel: riesgo de derrama y estado del edificio',
      intro:
        'Priorizamos certificado de deudas y actas recientes. Si hay obra aprobada, renegociamos antes de arras.',
      puntos: [
        'Informe claro para decidir si comprar o no',
        'Arras con resolución por incumplimiento documental',
        'ITP y minuta entendida antes de firma',
      ],
    },
    faqs: [
      {
        q: '¿Compráis pisos solo por portal?',
        a: 'Sí, cuando ya tienes precio con vendedor particular; no somos agencia de búsqueda.',
      },
      {
        q: '¿Trámite online desde El Carmel?',
        a: 'Sí; presencial en Les Corts opcional para revisar papeles.',
      },
    ],
  },
}

export function getBarcelonaCompraCompletaBarrio(slug: string): BarcelonaCompletaBarrioConfig | undefined {
  if (!(BARCELONA_COMPRA_COMPLETA_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARRIOS[slug as BarcelonaCompraCompletaSlug]
}

export function getBarcelonaCompraCompletaBarrioPaths(): string[] {
  return BARCELONA_COMPRA_COMPLETA_SLUGS.map((b) => `/barcelona/compra-completa/${b}`)
}

export function listBarcelonaCompraCompletaBarrios(): BarcelonaCompletaBarrioConfig[] {
  return BARCELONA_COMPRA_COMPLETA_SLUGS.map((s) => BARRIOS[s])
}
