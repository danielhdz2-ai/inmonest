import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'

export const BARCELONA_VENTA_COMPLETA_SLUGS = [
  'eixample',
  'gracia',
  'sants',
  'poblenou',
  'les-corts',
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
