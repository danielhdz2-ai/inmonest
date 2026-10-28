import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'

export const BARCELONA_COMPRA_COMPLETA_SLUGS = [
  'eixample',
  'gracia',
  'les-corts',
  'sarria',
  'poblenou',
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
